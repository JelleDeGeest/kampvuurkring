// collections/Camps.ts
import { CollectionConfig } from 'payload'
import { Weekends } from './Weekends'
export const Camps: CollectionConfig = {
  slug: 'camps',
  labels: { singular: 'Kamp', plural: 'Kampen' },
  admin: { defaultColumns: ['title', 'division', 'startDate'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'division',
      type: 'select',
      required: true,
      options: [
        { label: 'Kapoenen', value: 'kapoenen' },
        { label: 'Wouters',  value: 'wouters'  },
        { label: 'Jonggivers', value: 'jonggivers' },
        { label: 'Givers', value: 'givers' },
        { label: 'Jin', value: 'jin' },
      ],
    },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date', required: true },
  ],
}