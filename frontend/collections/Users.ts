import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 7200, // 2 hours
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Admin',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      return user?.roles?.includes('admin')
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Rollen',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Gebruiker',
          value: 'user',
        },
      ],
      admin: {
        description: 'Selecteer de rollen voor deze gebruiker',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefoonnummer',
      admin: {
        placeholder: '+32 123 45 67 89',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      label: 'Laatste Login',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeLogin: [
      async ({ user }) => {
        return {
          ...user,
          lastLogin: new Date(),
        }
      },
    ],
  },
}