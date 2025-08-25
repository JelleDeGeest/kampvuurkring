import type { GlobalConfig } from 'payload'

export const VerhuurPage: GlobalConfig = {
  slug: 'verhuurPage',
  access: {
    read: () => true,
  },
  admin: {
    // Add live preview for the verhuur page
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/verhuur`,
    livePreview: {
      url: () => `/verhuur`,
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667 },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800  },
      ],
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Pagina Titel',
      defaultValue: 'Verhuur',
      required: true,
      admin: {
        description: 'De hoofdtitel die op de verhuur pagina wordt weergegeven',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Ondertitel',
      defaultValue: 'Huur onze lokalen en materiaal voor jullie activiteiten.',
      admin: {
        description: 'De ondertitel onder de hoofdtitel',
      },
    },
    {
      name: 'banner',
      type: 'upload',
      label: 'Banner Afbeelding',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload een banner voor de verhuur pagina.',
      },
    },
  ],
}