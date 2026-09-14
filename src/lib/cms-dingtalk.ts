import { type CmsRole } from "@/lib/cms-auth";
import { cmsCorporation, cmsPermissions } from "@/lib/cms-access";

const tokenEndpoint = "https://api.dingtalk.com/v1.0/oauth2/userAccessToken";
const userEndpoint = "https://api.dingtalk.com/v1.0/contact/users/me";

interface DingTalkTokenResponse {
  accessToken?: string;
  code?: string;
  message?: string;
}

interface DingTalkUserResponse {
  unionId?: string;
  openId?: string;
  nick?: string;
  avatarUrl?: string;
  email?: string;
}

export interface CmsDingTalkUser {
  id: string;
  unionId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: CmsRole;
}

function credentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.CMS_DINGTALK_APP_KEY;
  const clientSecret = process.env.CMS_DINGTALK_APP_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("CMS DingTalk OAuth is not configured.");
  }
  return { clientId, clientSecret };
}

export async function companyUserId(unionId: string): Promise<string> {
  if (process.env.CMS_DINGTALK_CORP_ID !== cmsCorporation) {
    throw new Error("CMS organization is not configured correctly.");
  }
  const { clientId: appKey, clientSecret: appSecret } = credentials();
  const tokenResponse = await fetch("https://api.dingtalk.com/v1.0/oauth2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appKey, appSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || typeof token.accessToken !== "string") {
    throw new Error("公司身份校验暂时不可用。");
  }
  const endpoint = new URL("https://oapi.dingtalk.com/topapi/user/getbyunionid");
  endpoint.searchParams.set("access_token", token.accessToken);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unionid: unionId }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = await response.json();
  if (!response.ok || data.errcode !== 0 || data.result?.contact_type !== 0 ||
      typeof data.result?.userid !== "string") {
    throw new Error("当前账号不是获准访问的公司成员。");
  }
  return data.result.userid;
}

export function dingTalkAuthorizeUrl(callbackUrl: string, state: string): URL {
  const { clientId } = credentials();
  const url = new URL("https://login.dingtalk.com/oauth2/auth");
  url.searchParams.set("redirect_uri", callbackUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", "openid");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("state", state);

  const corpId = process.env.CMS_DINGTALK_CORP_ID;
  if (corpId) {
    // DingTalk requires the corpid scope whenever corpId is supplied.
    url.searchParams.set("scope", "openid corpid");
    url.searchParams.set("corpId", corpId);
  }
  return url;
}

export async function authenticateDingTalkUser(
  code: string,
): Promise<CmsDingTalkUser> {
  const { clientId, clientSecret } = credentials();
  const tokenResponse = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      clientSecret,
      code,
      grantType: "authorization_code",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const token = (await tokenResponse.json()) as DingTalkTokenResponse;
  if (!tokenResponse.ok || !token.accessToken) {
    throw new Error(token.message ?? token.code ?? "钉钉登录失败。");
  }

  const userResponse = await fetch(userEndpoint, {
    headers: { "x-acs-dingtalk-access-token": token.accessToken },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const user = (await userResponse.json()) as DingTalkUserResponse;
  if (!userResponse.ok || !user.unionId || !user.nick) {
    throw new Error("无法读取钉钉用户资料。");
  }

  const id = await companyUserId(user.unionId);
  const permissions = cmsPermissions(id);
  if (!permissions) {
    throw new Error("你的钉钉账号尚未获得 CMS 权限。");
  }

  const role: CmsRole = permissions.publish
    ? "publisher"
    : "editor";
  const email =
    user.email ??
    `dingtalk-${id.slice(0, 16).replaceAll(/[^a-zA-Z0-9-]/g, "")}@hailanworld.com`;

  return {
    id,
    unionId: user.unionId,
    name: user.nick,
    email,
    avatarUrl: user.avatarUrl,
    role,
  };
}
