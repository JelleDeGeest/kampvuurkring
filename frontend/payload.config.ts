// payload.config.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

// pull in your modular collections:
import { Media }   from './collections/media'
import { Leiders } from './collections/leiders'
import { Activiteiten } from './collections/activiteiten'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Media,
    Leiders,
    Activiteiten,
    // …add more modules here as you grow…
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
})