import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import sharp from 'sharp';

// Import your collections and globals
// If these imports fail, you'll need to create these files
import { Activiteiten } from './collections/Activiteiten';
import { Leiders } from './collections/Leiders';
import { InfoPage } from './globals/InfoPage';
import { LeidersPage } from './globals/LeidersPage';
import { FotosPage } from './globals/FotosPage';
import { ContactPage } from './globals/ContactPage';
import { VerhuurPage } from './globals/VerhuurPage';
import { LeidersDivisionBanners } from './globals/LeidersDivisionBanners';
import { LeidersFoto } from './collections/LeidersFoto';
import { HomepageHeroImages } from './collections/HomepageHeroImages';
import { HomepageHeros } from './collections/HomepageHeros';
import { Events }   from './collections/Events'
import { Weekends } from './collections/Weekends'
import { Camps }    from './collections/Camps'
import { Enrollments } from './collections/Enrollments'
import { Media } from './collections/Media'
import { BannerImages } from './collections/BannerImages'
import { LeidersBanners } from './collections/LeidersBanners'
import { LokaalMedia } from './collections/LokaalMedia'
import PhotoAlbums from './collections/PhotoAlbums'
import LokaalFotos from './collections/LokaalFotos'
import { Users } from './collections/Users'

export default buildConfig({
  collections: [
    // Ratel group
    Activiteiten,
    Events,
    Weekends,
    Camps,

    // Collecties group
    Leiders,
    PhotoAlbums,
    Enrollments,

    // Collecties group
    HomepageHeros, // Homepage Heros management
    LokaalFotos, // Lokaal

    // Media group
    Media, // Random
    BannerImages, // Andere Banner
    LeidersBanners, // Takken Banner
    HomepageHeroImages, // Homepage Banner
    LeidersFoto, // Leiding
    LokaalMedia, // Lokaal

    // Admin group
    Users,
  ],
  globals: [
    // Pagina's group
    InfoPage,
    ContactPage,
    FotosPage,
    LeidersPage,
    VerhuurPage,

    // Collecties group
    LeidersDivisionBanners, // Takken Banners Setup
  ],
  plugins: [
    // Media (Random) collection
    s3Storage({
      bucket: 'media',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'media': true,
      },
    }),
    // Banner Images (Andere Banner) collection
    s3Storage({
      bucket: 'banner-images',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'banner-images': true,
      },
    }),
    // Leiders Banners (Takken Banner) collection
    s3Storage({
      bucket: 'leiders-banners',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'leiders-banners': true,
      },
    }),
    // Homepage Hero Images (Homepage Banner) collection
    s3Storage({
      bucket: 'homepage-hero-images',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'homepage-hero-images': true,
      },
    }),
    // Leiders Foto (Leiding) collection
    s3Storage({
      bucket: 'leiders-foto',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'leiders-foto': true,
      },
    }),
    // Lokaal Media collection
    s3Storage({
      bucket: 'lokaal-fotos',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Required for MinIO
      },
      collections: {
        'lokaal-media': true,
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  editor: lexicalEditor({}),
  admin: {
    user: 'users',
  },
  typescript: {
    outputFile: 'types.d.ts',
  },
  sharp,
}); 