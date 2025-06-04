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
      hasMany: true,
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
    {
      name: 'enrollmentSettings',
      label: 'Inschrijvingen',
      type: 'group',
      admin: {
        description: 'Beheer inschrijvingen voor dit kamp'
      },
      fields: [
        {
          name: 'enabled',
          label: 'Inschrijvingen inschakelen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Schakel dit in om inschrijvingen toe te staan voor dit kamp',
          },
        },
        {
          name: 'closed',
          label: 'Inschrijvingen gesloten',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Sluit de inschrijvingen handmatig (toont aangepast bericht)',
          },
        },
        {
          name: 'closedMessage',
          label: 'Bericht wanneer gesloten',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Dit bericht wordt getoond wanneer inschrijvingen gesloten zijn',
          },
          defaultValue: 'De inschrijvingen voor dit kamp zijn helaas gesloten.',
        },
        {
          name: 'enrollmentLink',
          label: 'Inschrijf Link',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            readOnly: true,
            description: 'Deze link wordt automatisch gegenereerd',
          },
        },
        {
          name: 'enrollmentCount',
          label: 'Aantal Inschrijvingen',
          type: 'virtual',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            components: {
              Field: '/components/EnrollmentCount#EnrollmentCountField',
            },
          },
        },
        {
          name: 'enrollmentResponsesLink',
          label: 'Inschrijvingen Bekijken',
          type: 'ui',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            components: {
              Field: '/components/EnrollmentResponsesLink#EnrollmentResponsesLinkField',
            },
          },
        },
        {
          name: 'infoDocument',
          label: 'Info Document (PDF)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Upload een PDF document met extra informatie over het kamp',
          },
          filterOptions: {
            mimeType: { contains: 'pdf' },
          },
        },
        {
          name: 'allowMultipleChildren',
          label: 'Meerdere kinderen toestaan',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Sta toe dat ouders meerdere kinderen tegelijk inschrijven',
          },
        },
        {
          name: 'customQuestions',
          label: 'Extra Vragen',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Voeg extra tekstvragen toe aan het inschrijfformulier',
          },
          fields: [
            {
              name: 'question',
              label: 'Vraag',
              type: 'text',
              required: true,
              admin: {
                description: 'Bijvoorbeeld: "Heeft uw kind allergieën?"',
              },
            },
            {
              name: 'required',
              label: 'Verplicht',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Is deze vraag verplicht om in te vullen?',
              },
            },
          ],
        },
        {
          name: 'enrollmentDeadline',
          label: 'Uiterste inschrijfdatum',
          type: 'date',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd/MM/yyyy HH:mm',
            },
            description: 'Na deze datum zijn geen inschrijvingen meer mogelijk',
          },
        },
        {
          name: 'customMessage',
          label: 'Bericht na inschrijving',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Dit bericht wordt getoond nadat het formulier is verstuurd',
          },
          defaultValue: 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.',
        },
        {
          name: 'isPaid',
          label: 'Betalend kamp',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Is dit een betalend kamp?',
          },
        },
        {
          name: 'pricePerChild',
          label: 'Prijs per kind',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled && siblingData?.isPaid,
            description: 'Prijs in euro per kind',
          },
        },
        {
          name: 'paymentInstructions',
          label: 'Betaalinstructies',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled && siblingData?.isPaid,
            description: 'Instructies voor betaling (bijv. rekeningnummer, mededeling)',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        // Set enrollment link when enrollments are enabled
        if (data.enrollmentSettings?.enabled) {
          const id = originalDoc?.id || data.id
          if (id) {
            data.enrollmentSettings.enrollmentLink = `/inschrijven/kampen/${id}`
          } else {
            // For new documents, we'll set it in afterChange
            data.enrollmentSettings.enrollmentLink = 'Wordt gegenereerd na opslaan...'
          }
        } else if (data.enrollmentSettings && !data.enrollmentSettings.enabled) {
          // Clear link when enrollments are disabled
          data.enrollmentSettings.enrollmentLink = ''
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Update enrollment link with actual ID after creation
        if (doc.enrollmentSettings?.enabled && operation === 'create' && doc.enrollmentSettings.enrollmentLink === 'Wordt gegenereerd na opslaan...') {
          const payload = req.payload
          
          // Add a small delay to ensure document is fully committed
          setTimeout(async () => {
            try {
              await payload.update({
                collection: 'camps',
                id: doc.id,
                data: {
                  enrollmentSettings: {
                    ...doc.enrollmentSettings,
                    enrollmentLink: `/inschrijven/kampen/${doc.id}`,
                  }
                },
                context: {
                  skipAfterChangeHook: true,
                },
              })
            } catch (error) {
              console.error('Error updating enrollment link for camp:', error)
            }
          }, 100)
        }
        return doc
      },
    ],
  },
}