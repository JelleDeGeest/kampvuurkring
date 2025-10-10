import type { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, displayNameField, imageVariantSizes } from '../lib/mediaHooks'

export const LeidersFoto: CollectionConfig = {
  slug: 'leiders-foto',
  labels: {
    singular: 'Leiding',
    plural: 'Leiding',
  },
  upload: {
    mimeTypes: ['image/*'], // Allow only images
    imageSizes: imageVariantSizes,
  },
  hooks: {
    beforeOperation: [prepareUniqueFilename],
    afterChange: [copyCDN],
    afterDelete: [cleanupCDN],
  },
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'originalFilename', 'updatedAt'],
    group: 'Media', // Leiding photos in Media group
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    // Define access control as needed
    read: () => true, // Example: Allow public read access
  },
  fields: [
    displayNameField,
    originalFilenameField,
  ],
}
 
