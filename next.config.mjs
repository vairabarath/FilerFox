/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "whimsical-caiman-303.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
