import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "preview-chat-7c8eca27-bfa3-4436-9b80-bb2a9f33498d.space.z.ai",
    ".space.z.ai",
  ],
};

export default nextConfig;
