import { withPayload } from '@payloadcms/next/withPayload';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Skip static generation during build to avoid database connection issues
  experimental: {
    reactCompiler: false,
  },
  // Disable static generation for pages that require database access
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  images: {
    domains: ['payload', 'localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.scoutssintjohannes.be',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scoutssintjohannes.be',
        pathname: '/**',
      },
    ],
  },
  // Your existing Next.js config, including webpack customization
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payload-config': path.join(__dirname, 'payload.config.ts')
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/media-cdn/:path*',
        destination: 'http://minio:9000/media-cdn/:path*',
      },
    ]
  },
};

export default withPayload(nextConfig);