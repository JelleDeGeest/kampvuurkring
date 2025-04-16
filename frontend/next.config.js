import { withPayload } from '@payloadcms/next/withPayload';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(nextConfig);