import { createHash, randomBytes } from "node:crypto";
import config from "@payload-config";
import { NextResponse, type NextRequest } from "next/server";
import { generatePayloadCookie, getPayload } from "payload";
import {
  authenticateDingTalkCode,
  dingTalkOAuthNonceCookie,
  dingTalkPublisherRole,
  verifyDingTalkState,
} from "@/lib/dingtalk-cms";

function errorPage(message: string, status = 401): NextResponse {
  const safeMessage = message
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return new NextResponse(
    `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>CMS 登录失败</title><body><p>CMS 登录失败：${safeMessage}</p><p><a href="/admin/login">返回重新登录</a></p></body></html>`,
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
        "Content-Type": "text/html; charset=utf-8",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function identityEmail(userId: string): string {
  const digest = createHash("sha256").update(userId).digest("hex").slice(0, 20);
  return `dingtalk-${digest}@auth.hailanworld.com`;
}

export async function GET(request: NextRequest) {
  const code =
    request.nextUrl.searchParams.get("authCode") ?? request.nextUrl.searchParams.get("code");
  const stateValue = request.nextUrl.searchParams.get("state");
  if (!code || !stateValue) return errorPage("钉钉没有返回有效的授权结果。");

  try {
    const state = verifyDingTalkState(stateValue);
    if (request.cookies.get(dingTalkOAuthNonceCookie)?.value !== state.nonce) {
      return errorPage("登录请求与当前浏览器不匹配，请重新登录。");
    }

    const identity = await authenticateDingTalkCode(code);
    const payload = await getPayload({ config });
    const administrators = await payload.find({
      collection: "users",
      where: {
        and: [
          { role: { equals: "admin" } },
          { authSource: { equals: "local" } },
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    if (administrators.docs.length === 0) {
      return errorPage("请先创建本地应急管理员，再使用钉钉登录。", 403);
    }
    const email = identityEmail(identity.userId);
    const temporaryPassword = randomBytes(32).toString("base64url");
    const existing = await payload.find({
      collection: "users",
      where: { dingtalkUserId: { equals: identity.userId } },
      limit: 1,
      overrideAccess: true,
    });
    const data = {
      name: identity.name,
      email,
      password: temporaryPassword,
      role: "publisher" as const,
      authSource: "dingtalk" as const,
      dingtalkUserId: identity.userId,
      dingtalkRole: dingTalkPublisherRole,
      contactEmail: identity.email,
      lastDingTalkSyncAt: new Date().toISOString(),
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "users",
        id: existing.docs[0].id,
        data,
        context: { dingtalkProvisioning: true },
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "users",
        data,
        context: { dingtalkProvisioning: true },
        overrideAccess: true,
      });
    }

    const result = await payload.login({
      collection: "users",
      data: { email, password: temporaryPassword },
      overrideAccess: true,
    });
    if (!result.token) throw new Error("无法建立 CMS 登录会话。");

    const authConfig = payload.collections.users.config.auth;
    if (!authConfig) throw new Error("CMS 用户认证配置不可用。");
    const cookie = generatePayloadCookie({
      collectionAuthConfig: authConfig,
      cookiePrefix: payload.config.cookiePrefix,
      token: result.token,
    });
    const origin = process.env.NEXT_PUBLIC_SERVER_URL ?? request.nextUrl.origin;
    const response = NextResponse.redirect(new URL("/admin", origin));
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.append("Set-Cookie", cookie);
    response.cookies.set(dingTalkOAuthNonceCookie, "", {
      maxAge: 0,
      path: "/api/cms/dingtalk",
    });
    return response;
  } catch (error) {
    return errorPage(error instanceof Error ? error.message : "钉钉登录失败。");
  }
}
