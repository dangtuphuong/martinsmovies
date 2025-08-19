import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SST handles optimization
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,

  // FREE TIER OPTIMIZATIONS
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },

  // Disable image optimization to reduce Lambda memory usage
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize for smaller bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
