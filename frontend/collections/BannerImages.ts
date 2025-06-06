import { CollectionConfig } from 'payload'

export const BannerImages: CollectionConfig = {
  slug: 'banner-images',
  labels: {
    singular: 'Banner Afbeelding',
    plural: 'Banner Afbeeldingen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description: 'Banner afbeeldingen voor weekends en kampen'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticDir: 'banner-images',
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