import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations de performance
  compress: true,
  poweredByHeader: false,
  
  // Optimisations d'images et médias
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Optimisations de compilation
  swcMinify: true,
  
  // Optimisations expérimentales
  experimental: {
    optimizeCss: true,
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
        ],
      },
    ];
  },
};

export default nextConfig;
