import { CollectionConfig } from 'payload'

export const BannerImages: CollectionConfig = {
  slug: 'banner-images',
  labels: {
    singular: 'Andere Banner',
    plural: 'Andere Banner',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description: 'Banner afbeeldingen voor weekends en kampen',
    group: 'Media',
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'card',
        width: 1200,
        height: 300,
        position: 'centre',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 100,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Banner Naam',
      required: true,
      admin: {
        description: 'Geef de banner een duidelijke naam (bv. "Zomerkamp Bos", "Winterkamp Bergen")',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      admin: {
        description: 'Beschrijving van de afbeelding voor toegankelijkheid (automatisch ingevuld indien leeg)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto-generate alt text if not provided
        if (!data.alt && data.name) {
          data.alt = `Banner afbeelding: ${data.name}`;
        }
        return data;
      },
    ],
  },
}