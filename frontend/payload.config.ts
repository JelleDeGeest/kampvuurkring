// payload.config.ts
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

export default buildConfig({
  // Enable Rich Text if needed
  editor: lexicalEditor(),

  // Define your collections here
  collections: [
    // e.g., { slug: 'posts', ... }
  ],

  // The secret used for Payload authentication (make this a strong, unguessable string)
  secret: process.env.PAYLOAD_SECRET || '',

  // Configure your database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

})