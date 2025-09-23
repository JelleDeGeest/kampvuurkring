import { CollectionConfig } from 'payload'

export const LeidersBanners: CollectionConfig = {
  slug: 'leiders-banners',
  labels: {
    singular: 'Takken Banner',
    plural: 'Takken Banner',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description: 'Banner afbeeldingen voor individuele leider pagina\'s. Wijs banners toe aan takken via de "Leiders Tak Banners" global.',
    group: 'Media',
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
        name: 'banner',
        width: 1200,
        height: 400,
        position: 'centre',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 133,
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
        description: 'Geef de banner een duidelijke naam (bv. "Kapoenen Winter 2024", "Wouters Zomer")',
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
      async ({ data, req, operation }) => {
        // Auto-generate alt text if not provided
        if (!data.alt && data.name) {
          data.alt = `Banner afbeelding: ${data.name}`;
        }

        return data;
      },
    ],
  },
}