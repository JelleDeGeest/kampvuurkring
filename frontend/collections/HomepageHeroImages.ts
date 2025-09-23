import type { CollectionConfig } from 'payload'

export const HomepageHeroImages: CollectionConfig = {
  slug: 'homepage-hero-images',
  labels: {
    singular: 'Homepage Banner',
    plural: 'Homepage Banner',
  },
  upload: {
    mimeTypes: ['image/*'], // Allow only images
    // Disable image sizes for now to fix upload
    imageSizes: [],
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Media', // Homepage Banner images in Media group
  },
  access: {
    // Define access control as needed
    read: () => true, // Example: Allow public read access
  },
  fields: [

  ],
} 