import type { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, displayNameField, imageVariantSizes } from '../lib/mediaHooks'

export const LokaalMedia: CollectionConfig = {
  slug: 'lokaal-media',
  labels: {
    singular: 'Lokaal',
    plural: 'Lokaal',
  },
  admin: {
    group: 'Media',
    description: 'Media opslag voor lokaal verhuur foto\'s en documenten',
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'originalFilename', 'updatedAt'],
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