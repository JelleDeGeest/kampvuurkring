import { CollectionConfig } from 'payload'

import { hasValue } from '../lib/validation'

const PhotoAlbums: CollectionConfig = {
  slug: 'photoAlbums',
  labels: {
    singular: 'Fotoalbum',
    plural: 'Fotoalbums',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startYear', 'endYear', 'tak'],
    group: 'Collecties',
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam',
      required: true,
      admin: {
        placeholder: 'bijv. Kamp 2024',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startYear',
          type: 'number',
          label: 'Start jaar',
          required: true,
          min: 2000,
          max: 2100,
          admin: {
            placeholder: '2024',
            width: '50%',
          },
        },
        {
          name: 'endYear',
          type: 'number',
          label: 'Eind jaar',
          required: true,
          min: 2000,
          max: 2100,
          admin: {
            placeholder: '2025',
            width: '50%',
          },
        },
      ]
    },
    {
      name: 'tak',
      type: 'select',
      label: 'Tak',
      required: true,
      options: [
        {
          label: 'Kapoenen',
          value: 'kapoenen',
        },
        {
          label: 'Wouters',
          value: 'wouters',
        },
        {
          label: 'Jonggivers',
          value: 'jonggivers',
        },
        {
          label: 'Givers',
          value: 'givers',
        },
        {
          label: 'Jin',
          value: 'jin',
        },
        {
          label: "Jowo's",
          value: 'jowos',
        },
        {
          label: 'Groepsactiviteit',
          value: 'groepsactiviteit',
        },
      ],
    },
    {
      name: 'link',
      type: 'text',
      label: 'Google Photos Link',
      required: true,
      admin: {
        placeholder: 'https://photos.app.goo.gl/...',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Locatie',
      required: false,
      admin: {
        placeholder: 'bijv. Ardennen, Lokaal Sint-Johannes, ...',
        description: 'Optioneel: waar is dit album genomen?',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Cover Afbeelding',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Beste is een groepsfoto in landscape formaat',
      },
      validate: (value, { operation, originalDoc }: any) => {
        if (operation === 'create' && !hasValue(value)) {
          return 'Selecteer een cover afbeelding voor dit album'
        }

        if (operation === 'update') {
          const currentValue = hasValue(value) ? value : originalDoc?.coverImage
          if (!hasValue(currentValue)) {
            return 'Selecteer een cover afbeelding voor dit album'
          }
        }

        return true
      },
    },
  ],
}

export default PhotoAlbums
