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
  ],
}
