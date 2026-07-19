import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/lib/site";

const stateCookie = "hailan_cms_oauth_state";
const verifierCookie = "hailan_cms_oauth_verifier";
const oauthCookiePath = "/api/cms";

function base64Url(value: Buffer): string {
  return value.toString("base64url");
}

export function GET(request: NextRequest) {
  const clientId = process.env.CMS_GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "CMS GitHub OAuth is not configured." },
      { status: 503 },
    );
  }

  const state = base64Url(randomBytes(32));
  const verifier = base64Url(randomBytes(48));
  const challenge = base64Url(createHash("sha256").update(verifier).digest());
  const cmsOrigin =
    process.env.NODE_ENV === "production" ? site.url : request.nextUrl.origin;
  const redirectUri = new URL("/api/cms/callback", cmsOrigin);
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri.toString());
  authorizeUrl.searchParams.set("scope", "public_repo");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", challenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorizeUrl);
  const cookieOptions = {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production" ||
      request.nextUrl.protocol === "https:",
    sameSite: "lax" as const,
    path: oauthCookiePath,
    maxAge: 10 * 60,
  };

  response.cookies.set(stateCookie, state, cookieOptions);
  response.cookies.set(verifierCookie, verifier, cookieOptions);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
