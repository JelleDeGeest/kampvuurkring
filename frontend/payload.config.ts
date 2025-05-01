import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

// Import your collections and globals
// If these imports fail, you'll need to create these files
import { Activiteiten } from './collections/activiteiten';
import { MediaLeiding } from './collections/medialeiding';
import { Leiders } from './collections/leiders';
import { Media } from './collections/media';
import { InfoPage } from './globals/infoPage';

export default buildConfig({
  collections: [
    Activiteiten, MediaLeiding, Leiders, Media
    // Add other collections here
  ],
  globals: [
    InfoPage
    // Add globals here
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  editor: lexicalEditor({}),
  admin: {
    // Remove user reference until you have a users collection
  },
  typescript: {
    outputFile: 'types.d.ts',
  },
  sharp,
}); 