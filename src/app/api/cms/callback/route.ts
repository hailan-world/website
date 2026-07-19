import { randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/lib/site";

const repository = "hailan-world/website";
const stateCookie = "hailan_cms_oauth_state";
const verifierCookie = "hailan_cms_oauth_verifier";
const oauthCookiePath = "/api/cms";

interface GitHubTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GitHubRepositoryResponse {
  permissions?: {
    push?: boolean;
  };
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function callbackPage(
  origin: string,
  result: "success" | "error",
  payload: Record<string, string>,
): NextResponse {
  const nonce = randomBytes(18).toString("base64");
  const message = `authorization:github:${result}:${JSON.stringify(payload)}`;
  const title = result === "success" ? "登录成功" : "登录失败";
  const body = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <p>${title}，此窗口将自动关闭。</p>
    <script nonce="${nonce}">
      (() => {
        const targetOrigin = ${jsonForScript(origin)};
        const message = ${jsonForScript(message)};
        if (!window.opener) return;

        const finish = (event) => {
          if (event.origin !== targetOrigin) return;
          window.opener.postMessage(message, targetOrigin);
          window.removeEventListener("message", finish);
          window.setTimeout(() => window.close(), 300);
        };

        window.addEventListener("message", finish);
        window.opener.postMessage("authorizing:github", targetOrigin);
      })();
    </script>
  </body>
</html>`;

  const response = new NextResponse(body, {
    status: result === "success" ? 200 : 401,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'none'; base-uri 'none'; frame-ancestors 'none'`,
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });

  response.cookies.set(stateCookie, "", {
    httpOnly: true,
    maxAge: 0,
    path: oauthCookiePath,
  });
  response.cookies.set(verifierCookie, "", {
    httpOnly: true,
    maxAge: 0,
    path: oauthCookiePath,
  });
  return response;
}

function failure(request: NextRequest, message: string): NextResponse {
  const cmsOrigin =
    process.env.NODE_ENV === "production" ? site.url : request.nextUrl.origin;
  return callbackPage(cmsOrigin, "error", { message });
}

export async function GET(request: NextRequest) {
  const clientId = process.env.CMS_GITHUB_CLIENT_ID;
  const clientSecret = process.env.CMS_GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(stateCookie)?.value;
  const verifier = request.cookies.get(verifierCookie)?.value;

  if (!clientId || !clientSecret) {
    return failure(request, "CMS GitHub OAuth is not configured.");
  }
  if (
    !code ||
    !state ||
    !expectedState ||
    !verifier ||
    !safeEqual(state, expectedState)
  ) {
    return failure(request, "OAuth state validation failed. Please try again.");
  }

  const cmsOrigin =
    process.env.NODE_ENV === "production" ? site.url : request.nextUrl.origin;
  const redirectUri = new URL("/api/cms/callback", cmsOrigin);

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri.toString(),
          code_verifier: verifier,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );

    const tokenData = (await tokenResponse.json()) as GitHubTokenResponse;
    if (!tokenResponse.ok || !tokenData.access_token) {
      return failure(
        request,
        tokenData.error_description ??
          tokenData.error ??
          "GitHub login failed.",
      );
    }

    const githubHeaders = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${tokenData.access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const [userResponse, repositoryResponse] = await Promise.all([
      fetch("https://api.github.com/user", {
        headers: githubHeaders,
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }),
      fetch(`https://api.github.com/repos/${repository}`, {
        headers: githubHeaders,
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      }),
    ]);
    const repositoryData =
      (await repositoryResponse.json()) as GitHubRepositoryResponse;

    if (
      !userResponse.ok ||
      !repositoryResponse.ok ||
      repositoryData.permissions?.push !== true
    ) {
      return failure(
        request,
        "Your GitHub account does not have write access to the website repository.",
      );
    }

    return callbackPage(cmsOrigin, "success", {
      token: tokenData.access_token,
      provider: "github",
    });
  } catch {
    return failure(
      request,
      "GitHub could not be reached. Please try again.",
    );
  }
}
