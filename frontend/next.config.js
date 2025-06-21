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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SERVER_URL?.replace(/^https?:\/\//, '') || 'localhost',
        pathname: '/media/**',
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
};

export default withPayload(nextConfig);