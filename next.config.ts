import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The in-app browser reaches the local dev server through 127.0.0.1.
  // Allow that origin to receive development-only HMR resources.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
