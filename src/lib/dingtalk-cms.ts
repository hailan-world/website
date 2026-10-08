import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const tokenEndpoint = "https://api.dingtalk.com/v1.0/oauth2/userAccessToken";
const currentUserEndpoint = "https://api.dingtalk.com/v1.0/contact/users/me";
const organizationTokenEndpoint = "https://api.dingtalk.com/v1.0/oauth2/accessToken";
const unionIdEndpoint = "https://oapi.dingtalk.com/topapi/user/getbyunionid";
const userDetailsEndpoint = "https://oapi.dingtalk.com/topapi/v2/user/get";

export const dingTalkOAuthNonceCookie = "hailan_dingtalk_oauth_nonce";
export const dingTalkPublisherRole =
  process.env.CMS_DINGTALK_PUBLISHER_ROLE?.trim() || "官网运营";

type DingTalkRole = { name?: string };

type DingTalkUserDetails = {
  active?: boolean;
  email?: string;
  name?: string;
  role_list?: DingTalkRole[];
  roleList?: DingTalkRole[];
  userid?: string;
};

type SignedState = { exp: number; nonce: string };

export type DingTalkCmsIdentity = {
  email?: string;
  name: string;
  roleNames: string[];
  userId: string;
};

const authorizationCache = new Map<string, { authorized: boolean; expiresAt: number }>();

function credentials(): { appKey: string; appSecret: string; corpId: string } {
  const appKey = process.env.CMS_DINGTALK_APP_KEY;
  const appSecret = process.env.CMS_DINGTALK_APP_SECRET;
  const corpId = process.env.CMS_DINGTALK_CORP_ID;
  if (!appKey || !appSecret || !corpId) throw new Error("钉钉登录尚未完成配置。");
  return { appKey, appSecret, corpId };
}

function stateSecret(): string {
  const value = process.env.PAYLOAD_SECRET;
  if (!value || value.length < 32) throw new Error("Payload 密钥未正确配置。");
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", stateSecret()).update(value).digest("base64url");
}

function signaturesMatch(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createDingTalkState(): { nonce: string; state: string } {
  const nonce = randomBytes(32).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 10 * 60 * 1000, nonce } satisfies SignedState),
  ).toString("base64url");
  return { nonce, state: `${payload}.${sign(payload)}` };
}

export function verifyDingTalkState(value: string): SignedState {
  const [payload, suppliedSignature, extra] = value.split(".");
  if (!payload || !suppliedSignature || extra || !signaturesMatch(sign(payload), suppliedSignature)) {
    throw new Error("登录请求无效，请重新开始。");
  }
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SignedState;
  if (!parsed.nonce || !Number.isFinite(parsed.exp) || parsed.exp <= Date.now()) {
    throw new Error("登录请求已经过期，请重新开始。");
  }
  return parsed;
}

export function dingTalkAuthorizeUrl(callbackUrl: string, state: string): URL {
  const { appKey, corpId } = credentials();
  const url = new URL("https://login.dingtalk.com/oauth2/auth");
  url.searchParams.set("redirect_uri", callbackUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", appKey);
  url.searchParams.set("scope", "openid corpid");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", state);
  url.searchParams.set("corpId", corpId);
  return url;
}

async function organizationAccessToken(): Promise<string> {
  const { appKey, appSecret } = credentials();
  const response = await fetch(organizationTokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appKey, appSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await response.json()) as { accessToken?: string };
  if (!response.ok || !data.accessToken) throw new Error("暂时无法核验海蓝钉钉组织身份。");
  return data.accessToken;
}

async function organizationUserId(unionId: string, accessToken: string): Promise<string> {
  const endpoint = new URL(unionIdEndpoint);
  endpoint.searchParams.set("access_token", accessToken);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unionid: unionId }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await response.json()) as {
    errcode?: number;
    result?: { contact_type?: number; userid?: string };
  };
  if (
    !response.ok ||
    data.errcode !== 0 ||
    data.result?.contact_type !== 0 ||
    !data.result.userid
  ) {
    throw new Error("当前钉钉账号不属于海蓝组织。");
  }
  return data.result.userid;
}

async function organizationUserDetails(
  userId: string,
  accessToken: string,
): Promise<DingTalkUserDetails> {
  const endpoint = new URL(userDetailsEndpoint);
  endpoint.searchParams.set("access_token", accessToken);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid: userId, language: "zh_CN" }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await response.json()) as { errcode?: number; result?: DingTalkUserDetails };
  if (!response.ok || data.errcode !== 0 || !data.result) {
    throw new Error("当前钉钉成员资料不可用。");
  }
  return data.result;
}

function roleNames(details: DingTalkUserDetails): string[] {
  const roles = details.role_list ?? details.roleList ?? [];
  return roles.flatMap((role) => (role.name?.trim() ? [role.name.trim()] : []));
}

function isAuthorized(details: DingTalkUserDetails): boolean {
  return details.active !== false && roleNames(details).includes(dingTalkPublisherRole);
}

export async function authenticateDingTalkCode(code: string): Promise<DingTalkCmsIdentity> {
  const { appKey, appSecret } = credentials();
  const tokenResponse = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: appKey,
      clientSecret: appSecret,
      code,
      grantType: "authorization_code",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const token = (await tokenResponse.json()) as {
    accessToken?: string;
    code?: string;
    message?: string;
  };
  if (!tokenResponse.ok || !token.accessToken) {
    throw new Error(token.message ?? token.code ?? "钉钉登录失败。");
  }

  const currentUserResponse = await fetch(currentUserEndpoint, {
    headers: { "x-acs-dingtalk-access-token": token.accessToken },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const currentUser = (await currentUserResponse.json()) as { unionId?: string };
  if (!currentUserResponse.ok || !currentUser.unionId) {
    throw new Error("无法读取钉钉登录身份。");
  }

  const accessToken = await organizationAccessToken();
  const userId = await organizationUserId(currentUser.unionId, accessToken);
  const details = await organizationUserDetails(userId, accessToken);
  const names = roleNames(details);
  if (!isAuthorized(details)) {
    throw new Error(`你的钉钉账号尚未加入“${dingTalkPublisherRole}”角色。`);
  }
  authorizationCache.set(userId, { authorized: true, expiresAt: Date.now() + 5 * 60 * 1000 });
  return {
    email: details.email,
    name: details.name?.trim() || "海蓝官网运营",
    roleNames: names,
    userId,
  };
}

export async function isAuthorizedDingTalkPublisher(userId: string): Promise<boolean> {
  const cached = authorizationCache.get(userId);
  if (cached && cached.expiresAt > Date.now()) return cached.authorized;

  try {
    const accessToken = await organizationAccessToken();
    const details = await organizationUserDetails(userId, accessToken);
    const authorized = isAuthorized(details);
    authorizationCache.set(userId, { authorized, expiresAt: Date.now() + 5 * 60 * 1000 });
    return authorized;
  } catch {
    authorizationCache.delete(userId);
    return false;
  }
}
