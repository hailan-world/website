import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cmsPermissions } from "./cms-access";

export type CmsRole = "editor" | "publisher";

export interface CmsSessionClaims {
  kind: "cms_session";
  sub: string;
  unionId: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: CmsRole;
  app_metadata: {
    roles: CmsRole[];
  };
  user_metadata: {
    full_name: string;
    avatar_url?: string;
  };
  iss: "hailan-cms";
  aud: "hailan-cms-gateway";
  iat: number;
  exp: number;
}

interface TimedPayload {
  kind: string;
  iat: number;
  exp: number;
}

function secret(): string {
  const value = process.env.CMS_AUTH_SECRET;
  if (!value || value.length < 32) {
    throw new Error("CMS_AUTH_SECRET must contain at least 32 characters.");
  }
  return value;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function signature(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function signCmsToken<T extends { kind: string }>(
  payload: T,
  lifetimeSeconds: number,
): string {
  const now = Math.floor(Date.now() / 1000);
  const header = encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encode(
    JSON.stringify({ ...payload, iat: now, exp: now + lifetimeSeconds }),
  );
  const unsigned = `${header}.${body}`;
  return `${unsigned}.${signature(unsigned)}`;
}

export function verifyCmsToken<T extends TimedPayload>(
  token: string,
  expectedKind: T["kind"],
): T {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format.");
  }

  const [header, body, suppliedSignature] = parts;
  const unsigned = `${header}.${body}`;
  if (!safeEqual(signature(unsigned), suppliedSignature)) {
    throw new Error("Invalid token signature.");
  }

  const payload = JSON.parse(
    Buffer.from(body, "base64url").toString("utf8"),
  ) as T;
  const now = Math.floor(Date.now() / 1000);
  if (payload.kind !== expectedKind || !Number.isSafeInteger(payload.exp) || !Number.isSafeInteger(payload.iat) || payload.exp <= now || payload.iat > now + 60) {
    throw new Error("Token is invalid or expired.");
  }
  return payload;
}

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function commaSeparatedEnv(name: string): Set<string> {
  return new Set(
    (process.env[name] ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

export function cmsOAuthClientId(): string {
  return process.env.CMS_OAUTH_CLIENT_ID ?? "hailan-cms";
}

export function cmsSessionFromAuthorization(
  authorization: string | null,
): CmsSessionClaims {
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    throw new Error("Missing CMS session.");
  }

  const claims = verifyCmsToken<CmsSessionClaims>(match[1], "cms_session");
  if (
    claims.iss !== "hailan-cms" ||
    claims.aud !== "hailan-cms-gateway" ||
    !["editor", "publisher"].includes(claims.role)
  ) {
    throw new Error("Invalid CMS session.");
  }
  const permissions = cmsPermissions(claims.sub);
  if (!permissions || (claims.role === "publisher" && !permissions.publish)) {
    throw new Error("CMS access revoked.");
  }
  return claims;
}
