import { NextResponse, type NextRequest } from "next/server";
import {
  createDingTalkState,
  dingTalkAuthorizeUrl,
  dingTalkOAuthNonceCookie,
} from "@/lib/dingtalk-cms";

export function GET(request: NextRequest) {
  try {
    const { nonce, state } = createDingTalkState();
    const origin = process.env.NEXT_PUBLIC_SERVER_URL ?? request.nextUrl.origin;
    const callbackUrl = new URL("/api/cms/dingtalk/callback", origin);
    const response = NextResponse.redirect(dingTalkAuthorizeUrl(callbackUrl.toString(), state));
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.cookies.set(dingTalkOAuthNonceCookie, nonce, {
      httpOnly: true,
      maxAge: 10 * 60,
      path: "/api/cms/dingtalk",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "钉钉登录暂不可用。" },
      { status: 503 },
    );
  }
}
