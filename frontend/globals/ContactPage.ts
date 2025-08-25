import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  access: {
    read: () => true,
  },
  admin: {
    // Add live preview for the contact page
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    livePreview: {
      url: () => `/contact`,
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
      defaultValue: 'Contact',
      required: true,
      admin: {
        description: 'De hoofdtitel die op de contact pagina wordt weergegeven',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Ondertitel',
      defaultValue: 'Neem contact met ons op voor vragen of meer informatie.',
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
        description: 'Upload een banner voor de contact pagina.',
      },
    },
  ],
}