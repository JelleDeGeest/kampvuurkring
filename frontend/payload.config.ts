import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

// Import your collections and globals
// If these imports fail, you'll need to create these files
import { Activiteiten } from './collections/Activiteiten';
import { Leiders } from './collections/Leiders';
import { InfoPage } from './globals/InfoPage';
import { LeidersFoto } from './collections/LeidersFoto';
import { RandomAfbeeldingen } from './collections/RandomAfbeeldingen';
import { HomepageHeroImages } from './collections/HomepageHeroImages';
import { HomepageHeros } from './collections/HomepageHeros';
import { Events }   from './collections/Events'
import { Weekends } from './collections/Weekends'
import { Camps }    from './collections/Camps'

export default buildConfig({
  collections: [
    Activiteiten,
    Leiders,
    LeidersFoto,
    RandomAfbeeldingen,
    HomepageHeroImages,
    HomepageHeros,
    Events,
    Weekends,
    Camps
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