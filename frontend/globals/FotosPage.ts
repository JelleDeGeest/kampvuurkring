import type { GlobalConfig } from 'payload'

export const FotosPage: GlobalConfig = {
  slug: 'fotosPage',
  label: 'Fotos',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pagina\'s',
    // Add live preview for the fotos page
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/fotos`,
    livePreview: {
      url: () => `/fotos`,
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
      defaultValue: 'Fotoalbums',
      required: true,
      admin: {
        description: 'De hoofdtitel die op de fotos pagina wordt weergegeven',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Ondertitel',
      defaultValue: 'Herbeleef onze avonturen! Bekijk foto\'s van kampen, weekends en activiteiten.',
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
        description: 'Upload een banner voor de fotos pagina.',
      },
    },
  ],
}