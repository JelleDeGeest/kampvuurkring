// collections/activiteiten.ts
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Activiteiten: CollectionConfig = {
  slug: 'activiteiten',
  labels: {
    singular: 'Activiteit',
    plural:   'Activiteiten',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'division', 'startDate'],
  },
  access: {
    read:   () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'division',
      label: 'Tak(ken)',
      type: 'select',
      hasMany: false,
      required: true,
      options: [
        { label: 'Kapoenen',   value: 'kapoenen' },
        { label: 'Wouters',    value: 'wouters' },
        { label: 'Jonggivers', value: 'jonggivers' },
        { label: 'Givers',     value: 'givers' },
        { label: 'Jin',        value: 'jin' },
      ],
    },
    {
      name: 'startDate',
      label: 'Start Datum en Tijd',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm',
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      
      label: 'Eind Datum en Tijd',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm',
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'description',
      label: 'Beschrijving',
      type: 'richText',
      // uses the global editor you passed in payload.config (lexicalEditor)
    },
  ],
}