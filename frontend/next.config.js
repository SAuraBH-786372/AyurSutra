/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ayursutra-backend.onrender.com',
  },
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['localhost', 'ayursutra-backend.onrender.com'],
  },
  // Add base path if your app is not served from the root
  // basePath: '/your-base-path',
  // Add asset prefix if assets are served from a CDN
  // assetPrefix: '/your-asset-prefix',
  // Disable server-side rendering
  target: 'serverless',
  // Disable React's StrictMode for build
  reactStrictMode: false,
}

module.exports = nextConfig
