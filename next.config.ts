import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost',
    '192.168.0.17',
  ],

  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/Images/**",
      },
    ],
  },
};

export default nextConfig;
