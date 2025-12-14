import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import sharp from 'sharp';

const buildPublicCDNUrl = (filename: string): string | undefined => {
  if (!filename) return undefined

  const base = process.env.CDN_PUBLIC_URL || process.env.S3_CDN_PUBLIC_URL
  if (base) {
    return `${base.replace(/\/$/, '')}/${filename}`
  }

  const endpoint = process.env.S3_CDN_PUBLIC_ENDPOINT || process.env.S3_ENDPOINT
  const bucket = process.env.S3_CDN_BUCKET || 'media-cdn'
  if (endpoint) {
    return `${endpoint.replace(/\/$/, '')}/${bucket}/${filename}`
  }

  return undefined
}

// Server-side URL for fetching files from S3 (uses internal Docker network)
const buildInternalS3Url = (filename: string, bucket: string): string | undefined => {
  if (!filename) return undefined

  const endpoint = process.env.S3_ENDPOINT
  if (endpoint) {
    return `${endpoint.replace(/\/$/, '')}/${bucket}/${filename}`
  }

  return undefined
}

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
import { InschrijvenPage } from './globals/InschrijvenPage';
import { LeidersFoto } from './collections/LeidersFoto';
import { HomepageHeroImages } from './collections/HomepageHeroImages';
import { HomepageHeros } from './collections/HomepageHeros';
import { Events } from './collections/Events'
import { Weekends } from './collections/Weekends'
import { Camps } from './collections/Camps'
import { Enrollments } from './collections/Enrollments'
import { Media } from './collections/Media'
import { BannerImages } from './collections/BannerImages'
import { LeidersBanners } from './collections/LeidersBanners'
import { LokaalMedia } from './collections/LokaalMedia'
import PhotoAlbums from './collections/PhotoAlbums'
import LokaalFotos from './collections/LokaalFotos'
import { Users } from './collections/Users'
import { FAQCategories } from './collections/FAQCategories'
import { FAQs } from './collections/FAQs'
import { FAQPage } from './globals/FAQPage'
import SearchLogs from './collections/SearchLogs'

const config = {
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Activiteiten,
    Events,
    Weekends,
    Camps,
    Leiders,
    PhotoAlbums,
    Enrollments,
    HomepageHeros,
    LokaalFotos,
    Media,
    BannerImages,
    LeidersBanners,
    HomepageHeroImages,
    LeidersFoto,
    LokaalMedia,
    Users,
    FAQs,
    FAQCategories,
    SearchLogs,
  ],
  globals: [
    InfoPage,
    ContactPage,
    FotosPage,
    LeidersPage,
    VerhuurPage,
    LeidersDivisionBanners,
    InschrijvenPage,
    FAQPage,
  ],
  plugins: ([
    s3Storage({
      bucket: process.env.S3_ORIGINALS_BUCKET || 'media-original',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
      disableLocalStorage: true,
      collections: {
        'media': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
        'banner-images': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
        'leiders-banners': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
        'homepage-hero-images': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
        'leiders-foto': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
        'lokaal-media': {
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          prefix: '',
          generateFileURL: ({ filename }) => buildPublicCDNUrl(filename),
        },
      },
    }),
  ]) as any,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: false,
    migrationDir: 'migrations',
  }),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  editor: lexicalEditor({}) as any,
  admin: {
    user: 'users',
  },
  typescript: {
    outputFile: 'types.d.ts',
  },
  sharp,
} as const;

export default buildConfig(config as any);