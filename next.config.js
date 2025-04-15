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
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.netlify.app; connect-src 'self' https://api.emailjs.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.netlify.app; style-src 'self' 'unsafe-inline' *.netlify.app; img-src 'self' data: https:; font-src 'self' https: data:;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
