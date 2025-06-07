// collections/Weekends.ts
import { CollectionConfig } from 'payload'
export const Weekends: CollectionConfig = {
  slug: 'weekends',
  labels: { singular: 'Weekend', plural: 'Weekends' },
  versions: {
    drafts: {
      autosave: {
        interval: 400, // Autosave every 400ms
      },
    },
    maxPerDoc: 30,
  },
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['title', 'division', 'startDate'],
    preview: (doc) => {
      if (!doc?.enrollmentSettings?.enabled) return null
      return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/preview/inschrijven/weekends/${doc.id}?secret=${process.env.PAYLOAD_SECRET}`
    },
    livePreview: {
      url: ({ data }) => {
        // Always show preview, but default to homepage when enrollments are disabled
        if (!data?.enrollmentSettings?.enabled) {
          return '/preview/home?noEnrollment=true'
        }
        return `/preview/inschrijven/weekends/${data.id}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
      ],
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
      name: 'title', 
      label: 'Titel',
      type: 'text', 
      required: true 
    },
    {
      name: 'division',
      label: 'Tak(ken)',
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
    { 
      name: 'startDate', 
      label: 'Start Datum',
      type: 'date', 
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
          pickerAppearance: 'dayOnly',
        },
      },
    },
    { 
      name: 'endDate', 
      label: 'Eind Datum',
      type: 'date', 
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'bannerImage',
      label: 'Weekend Banner',
      type: 'upload',
      relationTo: 'banner-images',
      required: false,
      admin: {
        description: 'Kies een banner afbeelding voor dit weekend uit de banner collectie',
      },
    },
    {
      name: 'enrollmentSettings',
      label: 'Inschrijvingen',
      type: 'group',
      admin: {
        description: 'Beheer inschrijvingen voor dit weekend'
      },
      fields: [
        {
          name: 'enabled',
          label: 'Inschrijvingen inschakelen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Schakel dit in om inschrijvingen toe te staan voor dit weekend',
            condition: (data, siblingData) => !siblingData?.enabled, // Hide once enabled
          },
        },
        {
          name: 'closed',
          label: 'Inschrijvingen sluiten',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Sluit de inschrijvingen handmatig (toont aangepast bericht)',
          },
        },
        {
          name: 'hideButton',
          label: 'Inschrijfknop deactiveren',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Verberg de inschrijfknop op de website zonder inschrijvingen te sluiten',
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
          name: 'closedMessage',
          label: 'Bericht wanneer gesloten',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Dit bericht wordt getoond wanneer inschrijvingen gesloten zijn',
          },
          defaultValue: 'De inschrijvingen voor dit weekend zijn helaas gesloten.',
        },
        {
          name: 'enrollmentLink',
          type: 'text',
          admin: {
            hidden: true, // Hide this field from the UI
          },
        },
        {
          name: 'infoDocument',
          label: 'Info Document (PDF)',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Upload een PDF document met extra informatie over het weekend',
          },
          filterOptions: {
            mimeType: { contains: 'pdf' },
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
          label: 'Betalend weekend',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
            description: 'Is dit een betalend weekend?',
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
            data.enrollmentSettings.enrollmentLink = `/inschrijven/weekends/${id}`
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
                collection: 'weekends',
                id: doc.id,
                data: {
                  enrollmentSettings: {
                    ...doc.enrollmentSettings,
                    enrollmentLink: `/inschrijven/weekends/${doc.id}`,
                  }
                },
                context: {
                  skipAfterChangeHook: true,
                },
              })
            } catch (error) {
              console.error('Error updating enrollment link for weekend:', error)
            }
          }, 100)
        }
        return doc
      },
    ],
  },
}