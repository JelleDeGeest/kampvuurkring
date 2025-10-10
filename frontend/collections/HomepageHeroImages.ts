import type { CollectionConfig } from 'payload'
import { prepareUniqueFilename, copyCDN, cleanupCDN, originalFilenameField, displayNameField, imageVariantSizes } from '../lib/mediaHooks'

export const HomepageHeroImages: CollectionConfig = {
  slug: 'homepage-hero-images',
  labels: {
    singular: 'Homepage Banner',
    plural: 'Homepage Banner',
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
    group: 'Media', // Homepage Banner images in Media group
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