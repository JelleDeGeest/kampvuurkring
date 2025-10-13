import type { CollectionConfig } from 'payload'

import { hasValue } from '../lib/validation'

export const HomepageHeros: CollectionConfig = {
  slug: 'homepage-heros',
  admin: {
    useAsTitle: 'title',
    group: 'Collecties',
    hidden: ({ user }) => {
      // Hide from regular users, show to admins
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', label: 'Naam', type: 'text', required: true },
    {
      name: 'presence',
      type: 'number',
      required: true,
      label: 'Presence',
      admin: {
        description: 'Used for ordering/priority (lower numbers appear first)',
      },
    },
    {
      name: 'homeHeroImage',
      type: 'upload',
      relationTo: 'homepage-hero-images',
      required: false,
      label: 'Home Hero Image',
      validate: (value, { operation, originalDoc }: any) => {
        if (operation === 'create' && !hasValue(value)) {
          return 'Selecteer een afbeelding voor de homepage banner'
        }

        if (operation === 'update') {
          const currentValue = hasValue(value) ? value : originalDoc?.homeHeroImage
          if (!hasValue(currentValue)) {
            return 'Selecteer een afbeelding voor de homepage banner'
          }
        }

        return true
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Title',
      admin: {
        description: 'If one of Title, Description, or Button is filled in, all must be filled in',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
      admin: {
        description: 'If one of Title, Description, or Button is filled in, all must be filled in',
      },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      admin: {
        description: 'If one of Title, Description, or Button is filled in, all must be filled in',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: false,
          label: 'Button Text',
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          label: 'Button Link',
          admin: {
            description: 'URL where the button should link to',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        const title = typeof data.title === 'string' ? data.title.trim() : ''
        const description = typeof data.description === 'string' ? data.description.trim() : ''
        const buttonText = typeof data.button?.text === 'string' ? data.button.text.trim() : ''
        const buttonLink = typeof data.button?.link === 'string' ? data.button.link.trim() : ''

        if (!title) data.title = undefined
        if (!description) data.description = undefined
        if (data.button) {
          if (!buttonText) data.button.text = undefined
          if (!buttonLink) data.button.link = undefined
        }

        if (buttonText && !buttonLink) {
          throw new Error('Button Link is required when Button Text is provided')
        }

        if (buttonLink && !buttonText) {
          throw new Error('Button Text is required when Button Link is provided')
        }

        return data
      },
    ],
  },
}
