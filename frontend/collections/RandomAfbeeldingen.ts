import type { CollectionConfig } from 'payload'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs/promises'

export const RandomAfbeeldingen: CollectionConfig = {
  slug: 'random-afbeeldingen',
  upload: {
    staticDir: path.resolve(process.cwd(), 'random-afbeeldingen'),
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
            console.log('Processing random image...');
            
            // Get the file path on disk
            const uploadDir = path.resolve(process.cwd(), 'random-afbeeldingen');
            const filePath = path.join(uploadDir, doc.filename);
            
            // Make sure file exists
            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
            if (!fileExists) {
              console.error(`File not found: ${filePath}`);
              return doc;
            }
            
            // In this case, we're not resizing the images to a fixed size
            // Return doc as is
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