import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/jewelry", destination: "/collections/jewelry", permanent: true },
      { source: "/wedding-jewelry", destination: "/collections/wedding", permanent: true },
    ];
  },
};

export default nextConfig;
