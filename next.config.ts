// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc", // Add this hostname
        pathname: "/**", // Allow all paths under this hostname
      },
      // Add other domains if needed:
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  // Other Next.js config options can go here
};

export default nextConfig;