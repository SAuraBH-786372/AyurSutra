/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false, // Disable StrictMode to avoid double rendering in development
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ayursutra-backend.onrender.com',
  },
  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost', 'ayursutra-backend.onrender.com'],
  },
  // Uncomment and update these if needed:
  // basePath: '/your-base-path', // If your app is not served from the root
  // assetPrefix: '/your-asset-prefix', // If assets are served from a CDN
}

module.exports = nextConfig
