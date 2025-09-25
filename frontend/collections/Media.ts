import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Random',
    plural: 'Random',
  },
  admin: {
    group: 'Media',
    description: 'Algemene media opslag voor random afbeeldingen en documenten',
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