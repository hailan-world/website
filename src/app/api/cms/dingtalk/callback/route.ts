import { NextResponse, type NextRequest } from "next/server";
import { signCmsToken, verifyCmsToken } from "@/lib/cms-auth";

interface DingTalkState {
  kind: "dingtalk_state";
  decapState: string;
  redirectUri: string;
  codeChallenge: string;
  nonce: string;
  iat: number;
  exp: number;
}

export interface CmsAuthorizationCode {
  kind: "cms_authorization_code";
  dingTalkCode: string;
  redirectUri: string;
  codeChallenge: string;
}

function errorPage(message: string, status = 401): NextResponse {
  return new NextResponse(
    `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>CMS 登录失败</title><body><p>CMS 登录失败：${message.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</p><p><a href="/admin/">返回重新登录</a></p></body></html>`,
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("authCode") ?? request.nextUrl.searchParams.get("code");
  const stateToken = request.nextUrl.searchParams.get("state");
  if (!code || !stateToken) {
    return errorPage("钉钉没有返回有效的授权结果。");
  }

  try {
    const state = verifyCmsToken<DingTalkState>(stateToken, "dingtalk_state");
    if (!state.nonce || request.cookies.get("cms_oauth_nonce")?.value !== state.nonce) {
      return errorPage("登录请求与当前浏览器不匹配，请重新登录。");
    }
    const authorizationCode = signCmsToken<CmsAuthorizationCode>(
      {
        kind: "cms_authorization_code",
        dingTalkCode: code,
        redirectUri: state.redirectUri,
        codeChallenge: state.codeChallenge,
      },
      60,
    );
    const redirect = new URL(state.redirectUri);
    redirect.searchParams.set("code", authorizationCode);
    redirect.searchParams.set("state", state.decapState);
    const response = NextResponse.redirect(redirect);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.cookies.set("cms_oauth_nonce", "", { path: "/api/cms/dingtalk", maxAge: 0 });
    return response;
  } catch (error) {
    return errorPage(error instanceof Error ? error.message : "钉钉登录失败。");
  }
}
