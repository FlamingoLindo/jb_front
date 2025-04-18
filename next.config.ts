import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow both localhost and your LAN IP in dev
  allowedDevOrigins: [
    'localhost',
    '192.168.0.17',
  ],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/Images/Brands/**",
      },
    ],
  },
};

export default nextConfig;
