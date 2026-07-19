import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";
const isDevelopment = process.env.NODE_ENV === "development";
const verifiedLocales = ["en", "zh", "ru"] as const;

function createContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${
      isDevelopment ? " 'unsafe-eval'" : ""
    }`,
    `style-src 'self' 'nonce-${nonce}'${isDevelopment ? " 'unsafe-inline'" : ""}`,
    // React uses style attributes for animation timing and positioning. These
    // cannot execute JavaScript, so they are scoped separately from scripts.
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Pick the best supported locale from a cookie or the Accept-Language header. */
function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of preferred) {
      const base = tag.split("-")[0];
      const match = locales.find((locale) => locale === base);
      if (match) return match;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const contentSecurityPolicy = createContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const requestedLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const resolvedLocale = requestedLocale ?? resolveLocale(request);
  const verifiedLocale =
    resolvedLocale === "zh" || resolvedLocale === "ru" ? resolvedLocale : "en";
  const isVerifiedRoute = verifiedLocales.some(
    (locale) => pathname === `/verified/${locale}`,
  );
  const isLinusRoute = verifiedLocales.some(
    (locale) => pathname === `/linus/${locale}`,
  );
  const isLegacyLinusRoute = locales.some(
    (locale) =>
      pathname === `/${locale}/linus` || pathname === `/${locale}/linus/`,
  );
  const isCmsPilotRoute =
    pathname === "/en/cms-preview/lvt" ||
    pathname === "/zh/cms-preview/lvt";

  // The verified holding page and verified contact card are the only public
  // surfaces while other claims are checked. The synthetic CMS pilot remains
  // reachable only through its own environment gate in the page component.
  if (isVerifiedRoute || isLinusRoute || isCmsPilotRoute) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set("Content-Security-Policy", contentSecurityPolicy);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/linus" ||
    pathname.startsWith("/linus/") ||
    isLegacyLinusRoute
      ? `/linus/${verifiedLocale}`
      : `/verified/${verifiedLocale}`;
  url.search = "";

  const response = NextResponse.redirect(url);
  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.cookies.set(LOCALE_COOKIE, verifiedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  // Run on everything except Next internals, API routes and files with an
  // extension (favicon.ico, sitemap.xml, robots.txt, images, etc.). The CMS
  // admin is a standalone static application and must not be redirected.
  matcher: ["/((?!_next|api|admin|.*\\.).*)"],
};
