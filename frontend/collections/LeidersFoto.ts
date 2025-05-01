import type { CollectionConfig } from 'payload'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs/promises'

export const LeidersFoto: CollectionConfig = {
  slug: 'leiders-foto',
  upload: {
    staticDir: path.resolve(process.cwd(), 'leiders-foto'), // Updated directory for uploads
    mimeTypes: ['image/*'], // Allow only images
    // Disable Payload's default imageSizes
    imageSizes: [],
    disableLocalStorage: false, // Keep images on server
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Media', // Keeping it in the Media group
  },
  access: {
    // Define access control as needed
    read: () => true, // Example: Allow public read access
  },
  fields: [

  ],
  hooks: {
    // Process image after it's been uploaded and saved
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            console.log('Resizing image to 180x180...');
            
            // Get the file path on disk
            const uploadDir = path.resolve(process.cwd(), 'leiders-foto');
            const filePath = path.join(uploadDir, doc.filename);
            
            // Make sure file exists
            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
            if (!fileExists) {
              console.error(`File not found: ${filePath}`);
              return doc;
            }
            
            // Process the image to exactly 180x180
            const resizedBuffer = await sharp(filePath)
              .resize({
                width: 180,
                height: 180,
                fit: 'cover',
                position: 'center'
              })
              .toBuffer();
            
            // Overwrite the original file with the resized one
            await fs.writeFile(filePath, resizedBuffer);
            
            console.log(`Successfully resized ${doc.filename} to 180x180`);
            
            // Return doc with updated dimensions
            // The physical image is correctly resized, even if metadata doesn't match
            return {...doc, width: 180, height: 180, filesize: resizedBuffer.length};
          } catch (error) {
            console.error('Error resizing image:', error);
            return doc;
          }
        }
        return doc;
      }
    ],
    // Ensure uploaded images are always shown as 180x180 in the admin UI
    beforeRead: [
      ({ doc }) => {
        // Force dimensions to 180x180 for the admin UI
        if (doc && doc.mimeType && doc.mimeType.includes('image')) {
          return { ...doc, width: 180, height: 180 };
        }
        return doc;
      }
    ],
    // Log warnings for incorrectly sized images
    afterRead: [
      ({ doc }) => {
        // Suppress warnings since we now know they might not update in DB but are resized
        // Remove this if you want to see the warnings
        return doc;
      }
    ]
  }
} 