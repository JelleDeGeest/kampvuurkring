import type { GlobalConfig } from 'payload'

export const LeidersPage: GlobalConfig = {
  slug: 'leidersPage',
  label: 'Leiding',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pagina\'s',
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
    // Add live preview for the leiders page
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/leiding`,
    livePreview: {
      url: () => `/leiding`,
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
      defaultValue: 'Onze Leiding',
      required: true,
      admin: {
        description: 'De hoofdtitel die op de leiders pagina wordt weergegeven',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Ondertitel',
      defaultValue: 'Ontmoet het team van Scouts Sint-Johannes',
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
        description: 'Upload een banner voor de hoofdpagina van leiding. Deze is apart van de banners voor individuele leider pagina\'s.',
      },
    },
  ],
}