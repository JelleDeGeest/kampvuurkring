import type { CollectionConfig } from 'payload'

export const HomepageHeros: CollectionConfig = {
  slug: 'homepage-heros',
  admin: {
    useAsTitle: 'title',
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
      required: true,
      label: 'Home Hero Image',
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
        // Check if any of the title, description, or button fields are filled
        const hasTitle = Boolean(data.title);
        const hasDescription = Boolean(data.description);
        const hasButtonText = data.button && Boolean(data.button.text);
        const hasButtonLink = data.button && Boolean(data.button.link);
        
        // If any of them are filled, all must be filled
        if (hasTitle || hasDescription || hasButtonText || hasButtonLink) {
          if (!hasTitle) {
            throw new Error('Title is required when Description or Button is filled in');
          }
          if (!hasDescription) {
            throw new Error('Description is required when Title or Button is filled in');
          }
          if (!hasButtonText) {
            throw new Error('Button Text is required when Title or Description is filled in');
          }
          if (!hasButtonLink) {
            throw new Error('Button Link is required when Title or Description is filled in');
          }
        }
        
        return data;
      }
    ]
  }
} 