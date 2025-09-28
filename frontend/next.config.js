/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ayursutra-backend.onrender.com',
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost', 'ayursutra-backend.onrender.com']
  },
  // Optional: Add base path if your app is not served from the root
  // basePath: '/your-base-path',
  // Optional: Add asset prefix if assets are served from a CDN
  // assetPrefix: '/your-asset-prefix',
}

module.exports = nextConfig
