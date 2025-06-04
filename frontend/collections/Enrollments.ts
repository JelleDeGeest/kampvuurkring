import type { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  labels: {
    singular: 'Inschrijving',
    plural: 'Inschrijvingen',
  },
  admin: {
    useAsTitle: 'participantEmail',
    defaultColumns: ['participantEmail', 'targetTitle', 'targetType', 'numberOfChildren', 'createdAt'],
    description: 'Inschrijvingen voor activiteiten, weekends en kampen',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // Email at root level for admin display
    {
      name: 'participantEmail',
      label: 'E-mail Deelnemer',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Automatisch ingevuld uit contact informatie',
      },
    },
    // Target type and ID
    {
      name: 'targetType',
      label: 'Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Activiteit', value: 'activiteiten' },
        { label: 'Weekend', value: 'weekends' },
        { label: 'Kamp', value: 'camps' },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'targetId',
      label: 'Target ID',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'targetTitle',
      label: 'Titel',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Titel van de activiteit/weekend/kamp',
      },
    },
    // Number of children enrolled
    {
      name: 'numberOfChildren',
      label: 'Aantal kinderen',
      type: 'number',
      defaultValue: 1,
      admin: {
        readOnly: true,
        description: 'Automatisch berekend',
      },
    },
    // Simplified children array - only names
    {
      name: 'children',
      label: 'Kinderen',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'participantInfo',
          label: 'Deelnemer Informatie',
          type: 'group',
          fields: [
            {
              name: 'firstName',
              label: 'Voornaam',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Achternaam',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // Simplified contact Information - only email
    {
      name: 'contactInfo',
      label: 'Contact Informatie',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'E-mail',
          type: 'email',
          required: true,
        },
      ],
    },
    // Additional Options - only comments and custom answers
    {
      name: 'additionalOptions',
      label: 'Extra Opties',
      type: 'group',
      fields: [
        {
          name: 'comments',
          label: 'Opmerkingen',
          type: 'textarea',
          admin: {
            description: 'Extra opmerkingen of vragen',
          },
        },
        {
          name: 'customAnswers',
          label: 'Antwoorden op extra vragen',
          type: 'json',
          admin: {
            description: 'Antwoorden op extra vragen',
          },
        },
      ],
    },
    // Payment information
    {
      name: 'totalPrice',
      label: 'Totaal bedrag',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Totaal te betalen bedrag',
      },
    },
    // Submission metadata
    {
      name: 'submittedAt',
      label: 'Ingediend op',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create') {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'In afwachting', value: 'pending' },
        { label: 'Bevestigd', value: 'confirmed' },
        { label: 'Geannuleerd', value: 'cancelled' },
        { label: 'Betaald', value: 'paid' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Set email at root level for admin display
          data.participantEmail = data.contactInfo?.email
          // Calculate number of children
          data.numberOfChildren = data.children?.length || 1
        }
        return data
      },
    ],
  },
}