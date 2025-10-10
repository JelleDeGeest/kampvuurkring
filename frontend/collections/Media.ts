import { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, displayNameField, imageVariantSizes } from '../lib/mediaHooks'

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
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'originalFilename', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: imageVariantSizes,
  },
  hooks: {
    beforeOperation: [prepareUniqueFilename],
    afterChange: [copyCDN],
    afterDelete: [cleanupCDN],
  },
  fields: [
    displayNameField,
    originalFilenameField,
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