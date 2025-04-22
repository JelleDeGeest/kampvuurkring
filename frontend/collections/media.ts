// collections/media.ts
import type { CollectionConfig } from 'payload'
import path from 'path'
import fs from 'fs/promises'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../media'),
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
  },
  fields: [],
}