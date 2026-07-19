import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The in-app browser reaches the local dev server through 127.0.0.1.
  // Allow that origin to receive development-only HMR resources.
  allowedDevOrigins: ["127.0.0.1"],
  // Pin the workspace root to this project so Turbopack doesn't infer a parent
  // directory (a stray lockfile in $HOME made it scan the whole home folder,
  // slowing dev startup, file watching, and HMR).
  turbopack: {
    root: __dirname,
  },
  // Locale layouts render per request to receive a CSP nonce. Ensure the
  // Git-backed CMS content is present in server traces as well as at build.
  outputFileTracingIncludes: {
    "/*": ["./content/news/**/*.json", "./content/pilot/**/*.json"],
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' https://unpkg.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.github.com https://github.com https://raw.githubusercontent.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://github.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
