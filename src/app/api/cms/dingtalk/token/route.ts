import { NextResponse, type NextRequest } from "next/server";
import {
  cmsOAuthClientId,
  pkceChallenge,
  signCmsToken,
  verifyCmsToken,
  type CmsSessionClaims,
} from "@/lib/cms-auth";
import type { CmsAuthorizationCode } from "@/app/api/cms/dingtalk/callback/route";
import { authenticateDingTalkUser } from "@/lib/cms-dingtalk";

async function requestBody(request: NextRequest): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as Record<string, string>;
  }
  return Object.fromEntries((await request.formData()).entries()) as Record<string, string>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await requestBody(request);
    if (
      body.client_id !== cmsOAuthClientId() ||
      body.grant_type !== "authorization_code" ||
      !body.code ||
      !body.code_verifier ||
      !body.redirect_uri
    ) {
      return NextResponse.json(
        { error: "invalid_request", error_description: "Invalid token request." },
        { status: 400 },
      );
    }

    const authorization = verifyCmsToken<
      CmsAuthorizationCode & { iat: number; exp: number }
    >(body.code, "cms_authorization_code");
    if (
      authorization.redirectUri !== body.redirect_uri ||
      authorization.codeChallenge !== pkceChallenge(body.code_verifier)
    ) {
      return NextResponse.json(
        { error: "invalid_grant", error_description: "PKCE validation failed." },
        { status: 400 },
      );
    }

    // DingTalk consumes the upstream authorization code once. Do not exchange
    // it in the callback and mint a replayable local authorization credential.
    const user = await authenticateDingTalkUser(authorization.dingTalkCode);
    const accessToken = signCmsToken<
      Omit<CmsSessionClaims, "iat" | "exp">
    >(
      {
        kind: "cms_session",
        sub: user.id,
        unionId: user.unionId,
        name: user.name,
        email: user.email,
        avatar_url: user.avatarUrl,
        role: user.role,
        app_metadata: { roles: [user.role] },
        user_metadata: {
          full_name: user.name,
          avatar_url: user.avatarUrl,
        },
        iss: "hailan-cms",
        aud: "hailan-cms-gateway",
      },
      30 * 60,
    );

    const response = NextResponse.json({
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: 30 * 60,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description:
          error instanceof Error ? error.message : "Token exchange failed.",
      },
      { status: 400 },
    );
  }
}
