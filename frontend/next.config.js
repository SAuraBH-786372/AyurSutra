/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://ayursutra-backend.onrender.com',
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost', 'ayursutra-backend.onrender.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
