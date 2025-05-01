import type { CollectionConfig } from 'payload'
import path from 'path'
import fs from 'fs/promises'

export const HomepageHeroImages: CollectionConfig = {
  slug: 'homepage-hero-images',
  upload: {
    staticDir: path.resolve(process.cwd(), 'homepage-hero-images'),
    mimeTypes: ['image/*'], // Allow only images
    // Disable Payload's default imageSizes
    imageSizes: [],
    disableLocalStorage: false, // Keep images on server
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Media', // Placing it in the Media group
  },
  access: {
    // Define access control as needed
    read: () => true, // Example: Allow public read access
  },
  fields: [

  ],
  hooks: {
    // Process image after upload
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            console.log('Processing homepage hero image...');
            
            // Get the file path on disk
            const uploadDir = path.resolve(process.cwd(), 'homepage-hero-images');
            const filePath = path.join(uploadDir, doc.filename);
            
            // Make sure file exists
            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
            if (!fileExists) {
              console.error(`File not found: ${filePath}`);
              return doc;
            }
            
            // No resizing or constraints, return as is
            return doc;
          } catch (error) {
            console.error('Error processing image:', error);
            return doc;
          }
        }
        return doc;
      }
    ]
  }
} 