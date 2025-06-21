// collections/Events.ts
import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Evenement', plural: 'Evenementen' },
  admin: { defaultColumns: ['title', 'startDate', 'endDate'] },
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
      name: 'buttonText',
      label: 'Button tekst',
      type: 'text',
      admin: {
        description: 'Bijvoorbeeld: "Inschrijven", "Meer info", "Aanmelden"',
      },
    },
  ],
}
