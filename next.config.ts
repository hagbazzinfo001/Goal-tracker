// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
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