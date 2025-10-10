import { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, imageVariantSizes } from '../lib/mediaHooks'

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
    imageSizes: imageVariantSizes,
  },
  hooks: {
    beforeOperation: [prepareUniqueFilename],
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-generate alt text if not provided
        if (!data.alt && data.name) {
          data.alt = `Banner afbeelding: ${data.name}`;
        }

        return data;
      },
    ],
    afterChange: [copyCDN],
    afterDelete: [cleanupCDN],
  },
  fields: [
    originalFilenameField,
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
}