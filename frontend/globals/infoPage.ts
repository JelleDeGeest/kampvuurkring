// frontend/globals/infoPage.ts
import type { GlobalConfig } from 'payload'

export const InfoPage: GlobalConfig = {
  slug: 'infoPage',

  // ▶ Enable drafts (and autosave) so Live Preview events fire
  versions: {
    drafts: {
      autosave: {
        interval: 400,           // ms between autosaves while typing
      },
    },
  },

  admin: {
    // — Preview in a new tab (paper-airplane icon) —
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/preview/info`,

    // — Live-preview pane inside the admin (eye icon) —
    livePreview: {
      // ← load the /preview/info route so Draft Mode is enabled
      url: () => `/preview/info`,

      // optional device sizes in the toolbar
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667 },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800  },
      ],
    },
  },

  fields: [
    { name: 'title',      type: 'text',     required: true },
    { name: 'intro',      type: 'textarea', required: true },

    {
      name: 'pillars',
      type: 'array',
      minRows: 3,
      fields: [
        { name: 'heading', type: 'text',     required: true },
        { name: 'body',    type: 'textarea', required: true },
      ],
    },

    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'footerText',
      type: 'text',
      defaultValue: `© ${new Date().getFullYear()} Scouts Sint-Johannes. Alle rechten voorbehouden.`,
    },
  ],
}