import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "admin.cnsubscribe.xyz",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "saas.cnsubscribe.xyz",
        pathname: "/assets/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/directus/:path*",
        destination: `${process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus.example.com"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
