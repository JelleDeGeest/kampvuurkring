import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

export default buildConfig({
  // Enable Rich Text if needed
  editor: lexicalEditor(),

  // Define your collections here
  collections: [
    {
      slug: 'media',
      upload: true,
      admin: {
        useAsTitle: 'filename',
      },
      access: {
        read: () => true,
      },
      fields: [],
    },
    {
      slug: 'leiders',
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          label: 'Naam',
          type: 'text',
          required: true,
        },
        {
          name: 'takken',
          label: 'Tak(ken)',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            { label: 'Kapoenen', value: 'kapoenen' },
            { label: 'Wouters', value: 'wouters' },
            { label: 'Jonggivers', value: 'jonggivers' },
            { label: 'Givers', value: 'givers' },
            { label: 'Jin', value: 'jin' },
            { label: 'Groepsleiding', value: 'groepsleiding' },
            { label: 'Gestopt', value: 'gestopt' },
          ],
        },
        {
          name: 'year',
          label: '1e Leidingsjaar',
          type: 'number',
          required: true,
          admin: {
            description: 'Als het 1e leidingsjaar bvb 2024-2025, vul dan 2024 in',
          },
        },
        {
          name: 'stopYear',
          label: '1e Gestopt Jaar',
          type: 'number',
          admin: {
            description: 'Vul het eerste jaar in waarin deze leider niet meer actief is als deze nog wel actief was in 2023-2024 maar niet meer in 2024-2025 dan vul je hier 2024 in',
          },
        },
        {
          name: 'totem',
          label: 'Totem',
          type: 'text',
        },
        {
          name: 'totemBeschrijving',
          label: 'Totem Beschrijving',
          type: 'textarea',
        },
        {
          name: 'description',
          label: 'Beschrijving',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Foto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'phoneNumber',
          label: 'Telefoonnummer',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          label: 'E-mailadres',
          type: 'email',
          required: true,
        },
        {
          name: 'kapoenenNaam',
          label: 'Kapoenen Naam',
          type: 'text',
        },
        {
          name: 'wouterNaam',
          label: 'Wouter Naam',
          type: 'text',
        },
      ],
    },
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