// payload.config.ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

// collections
import { Media }        from './collections/media'
import { Leiders }      from './collections/leiders'
import { Activiteiten } from './collections/activiteiten'

// globals
import { InfoPage }     from './globals/infoPage'

export default buildConfig({
  editor: lexicalEditor(),

  collections: [Media, Leiders, Activiteiten],

  globals: [InfoPage],

  /** 👇 NEW: root-level live-preview settings */
  admin: {
    livePreview: {
      // base iframe URL (relative is fine)
      url: ({ globalConfig }) => globalConfig ? `/${globalConfig.slug}` : '/',

      // enable for these globals
      globals: ['infoPage'],

      // default toolbar breakpoints (can be overridden per-global)
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667 },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
      ],
    },
  },

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
})