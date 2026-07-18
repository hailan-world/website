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
  async headers() {
    return [
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
