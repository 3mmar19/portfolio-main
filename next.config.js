/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Changed from 'standalone' to 'export' for static deployment
  images: {
    unoptimized: true,  // Required for static export
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}

module.exports = nextConfig
