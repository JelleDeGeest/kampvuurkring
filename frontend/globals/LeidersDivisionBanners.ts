import type { GlobalConfig } from 'payload'

export const LeidersDivisionBanners: GlobalConfig = {
  slug: 'leidersDivisionBanners',
  label: 'Leiders Tak Banners',
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    description: 'Upload of selecteer banners voor elke tak op individuele leider pagina\'s',
  },
  fields: [
    {
      name: 'kapoenenBanner',
      type: 'upload',
      label: 'Banner voor Kapoenen',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Kapoenen leider pagina\'s',
      },
    },
    {
      name: 'woutersBanner',
      type: 'upload',
      label: 'Banner voor Wouters',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Wouters leider pagina\'s',
      },
    },
    {
      name: 'jonggiversBanner',
      type: 'upload',
      label: 'Banner voor Jonggivers',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Jonggivers leider pagina\'s',
      },
    },
    {
      name: 'giversBanner',
      type: 'upload',
      label: 'Banner voor Givers',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Givers leider pagina\'s',
      },
    },
    {
      name: 'jinBanner',
      type: 'upload',
      label: 'Banner voor Jin',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Jin leider pagina\'s',
      },
    },
  ],
}