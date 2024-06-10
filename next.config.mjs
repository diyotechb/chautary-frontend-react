/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "chautary-images-dev.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
