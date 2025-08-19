import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
    unoptimized: true,
  },

  // Minimize bundle size
  swcMinify: true,

  // Reduce build output
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Optimize for smaller bundles
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};

export default nextConfig;
