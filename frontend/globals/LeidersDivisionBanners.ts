import type { GlobalConfig } from 'payload'

export const LeidersDivisionBanners: GlobalConfig = {
  slug: 'leidersDivisionBanners',
  label: 'Takken Banners Setup',
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    description: 'Upload of selecteer banners voor elke tak op individuele leider pagina\'s',
    group: 'Collecties',
  },
  fields: [
    {
      name: 'kapoenenBanner',
      type: 'upload',
      label: 'Banner voor Kapoenen',
      relationTo: 'leiders-banners',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Kapoenen leider pagina\'s. Upload naar Takken Banner collectie en selecteer hier.',
      },
    },
    {
      name: 'woutersBanner',
      type: 'upload',
      label: 'Banner voor Wouters',
      relationTo: 'leiders-banners',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Wouters leider pagina\'s. Upload naar Takken Banner collectie en selecteer hier.',
      },
    },
    {
      name: 'jonggiversBanner',
      type: 'upload',
      label: 'Banner voor Jonggivers',
      relationTo: 'leiders-banners',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Jonggivers leider pagina\'s. Upload naar Takken Banner collectie en selecteer hier.',
      },
    },
    {
      name: 'giversBanner',
      type: 'upload',
      label: 'Banner voor Givers',
      relationTo: 'leiders-banners',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Givers leider pagina\'s. Upload naar Takken Banner collectie en selecteer hier.',
      },
    },
    {
      name: 'jinBanner',
      type: 'upload',
      label: 'Banner voor Jin',
      relationTo: 'leiders-banners',
      required: false,
      admin: {
        description: 'Banner die wordt weergegeven op individuele Jin leider pagina\'s. Upload naar Takken Banner collectie en selecteer hier.',
      },
    },
  ],
}