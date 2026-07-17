import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "mybuildmetric.com",
          },
        ],
        destination: "https://buildmetriccalc.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mybuildmetric.com",
          },
        ],
        destination: "https://buildmetriccalc.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
