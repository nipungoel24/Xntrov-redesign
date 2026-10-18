/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  // Match the published xntrova.com URL scheme (e.g. /privacy-policy/).
  trailingSlash: true,
};

export default nextConfig;
