import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations de performance
  compress: true,
  poweredByHeader: false,
  
  // Optimisations d'images et médias
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Ajouter ces optimisations Vercel
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers de sécurité et performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.hs-scripts.com https://*.hs-analytics.net https://*.hubspot.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://*.hubspot.com; font-src 'self' data:; connect-src 'self' https://*.hubspot.com https://api.hsforms.com;"
          },
        ],
      },
      // Cache pour les assets statiques uniquement (pas pour les pages HTML)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
