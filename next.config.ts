import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/thankyou.html",
        destination: "/thankyou",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
