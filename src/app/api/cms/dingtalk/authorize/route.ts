import { NextResponse, type NextRequest } from "next/server";
import { cmsOAuthClientId, signCmsToken } from "@/lib/cms-auth";
import { dingTalkAuthorizeUrl } from "@/lib/cms-dingtalk";
import { site } from "@/lib/site";
import { randomBytes } from "node:crypto";

interface DingTalkState {
  kind: "dingtalk_state";
  decapState: string;
  redirectUri: string;
  codeChallenge: string;
  nonce: string;
}

function cmsOrigin(request: NextRequest): string {
  return process.env.NODE_ENV === "production" ? site.url : request.nextUrl.origin;
}

function validAdminRedirect(value: string, origin: string): boolean {
  try {
    const redirect = new URL(value);
    return (
      redirect.origin === origin &&
      ["/admin", "/admin/"].includes(redirect.pathname) &&
      !redirect.hash
    );
  } catch {
    return false;
  }
}

export function GET(request: NextRequest) {
  const clientId = request.nextUrl.searchParams.get("client_id");
  const redirectUri = request.nextUrl.searchParams.get("redirect_uri");
  const responseType = request.nextUrl.searchParams.get("response_type");
  const state = request.nextUrl.searchParams.get("state");
  const challenge = request.nextUrl.searchParams.get("code_challenge");
  const challengeMethod = request.nextUrl.searchParams.get("code_challenge_method");
  const origin = cmsOrigin(request);

  if (
    clientId !== cmsOAuthClientId() ||
    !redirectUri ||
    !validAdminRedirect(redirectUri, origin) ||
    responseType !== "code" ||
    !state || state.length > 1024 ||
    !challenge || !/^[A-Za-z0-9_-]{43}$/.test(challenge) ||
    challengeMethod !== "S256"
  ) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const nonce = randomBytes(32).toString("base64url");
    const signedState = signCmsToken<DingTalkState>(
      {
        kind: "dingtalk_state",
        decapState: state,
        redirectUri,
        codeChallenge: challenge,
        nonce,
      },
      10 * 60,
    );
    const callbackUrl = new URL("/api/cms/dingtalk/callback", origin);
    const response = NextResponse.redirect(
      dingTalkAuthorizeUrl(callbackUrl.toString(), signedState),
    );
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.cookies.set("cms_oauth_nonce", nonce, {
      httpOnly: true, secure: origin.startsWith("https:"), sameSite: "lax",
      path: "/api/cms/dingtalk", maxAge: 600,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "CMS login unavailable." },
      { status: 503 },
    );
  }
}
