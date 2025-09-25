import type { CollectionConfig } from 'payload'

export const LokaalMedia: CollectionConfig = {
  slug: 'lokaal-media',
  labels: {
    singular: 'Lokaal',
    plural: 'Lokaal',
  },
  admin: {
    group: 'Media',
    description: 'Media opslag voor lokaal verhuur foto\'s en documenten',
    useAsTitle: 'filename',
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'gallery',
        width: 1200,
        height: 900,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      admin: {
        description: 'Beschrijving van de afbeelding voor toegankelijkheid',
      },
    },
  ],
}