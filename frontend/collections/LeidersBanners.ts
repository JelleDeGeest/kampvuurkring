import { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, imageVariantSizes, autoAltField, deriveMediaLabel } from '../lib/mediaHooks'

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
    afterChange: [copyCDN],
    afterDelete: [cleanupCDN],
  },
  fields: [
    originalFilenameField,
    autoAltField,
    {
      name: 'name',
      type: 'text',
      label: 'Banner Naam',
      required: false,
      admin: {
        description: 'Geef de banner een duidelijke naam (bv. "Kapoenen Winter 2024", "Wouters Zomer")',
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData, originalDoc }: any) => {
            if (typeof value === 'string' && value.trim().length > 0) {
              return value
            }

            return (
              deriveMediaLabel(siblingData) ||
              deriveMediaLabel(originalDoc) ||
              (typeof value === 'string' ? value : '')
            )
          },
        ],
      },
    },
  ],
}
