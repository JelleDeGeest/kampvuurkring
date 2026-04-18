// collections/Events.ts
import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Evenement', plural: 'Evenementen' },
  admin: {
    defaultColumns: ['title', 'startDate', 'endDate'],
    group: 'Ratel',
  },
  access: { read: () => true },          // publieke read
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'richText',
      // uses the global editor you passed in payload.config (lexicalEditor)
    },
    {
      name: 'button',
      label: 'Button (Optioneel)',
      type: 'group',
      admin: {
        description: '⚠️ Vul beide velden in of laat beide leeg. Button wordt alleen getoond wanneer zowel tekst als URL zijn opgegeven.',
      },
      fields: [
        {
          name: 'text',
          label: 'Button tekst',
          type: 'text',
          defaultValue: 'Info/Inschrijven',
          admin: {
            description: 'Bijvoorbeeld: "Info/Inschrijven", "Meer info", "Aanmelden". ⚠️ Verplicht als URL wordt opgegeven.',
            condition: (data, siblingData) => {
              // Show warning style if URL is filled but text is empty
              return true;
            },
          },
          validate: (value, { siblingData }) => {
            // If URL is provided, text is required
            if (siblingData?.url && !value) {
              return '⚠️ Button tekst is verplicht wanneer een URL wordt opgegeven. Vul beide velden in of laat beide leeg.';
            }
            return true;
          },
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',
          admin: {
            description: 'Volledige URL (bijvoorbeeld: https://example.com/inschrijven). ⚠️ Verplicht als button tekst wordt opgegeven.',
          },
          validate: (value, { siblingData }) => {
            // If text is provided, URL is required
            if (siblingData?.text && !value) {
              return '⚠️ Button URL is verplicht wanneer button tekst wordt opgegeven. Vul beide velden in of laat beide leeg.';
            }
            // Basic URL validation if value exists
            if (value && !value.match(/^https?:\/\/.+/)) {
              return '❌ URL moet beginnen met http:// of https://';
            }
            return true;
          },
        },
      ],
    },
  ],
}
