import { GlobalConfig } from 'payload'

export const FAQPage: GlobalConfig = {
    slug: 'faq-page',
    label: 'FAQ Pagina',
    admin: {
        group: 'Pagina\'s',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Titel',
            defaultValue: 'Veelgestelde Vragen',
        },
        {
            name: 'subtitle',
            type: 'text',
            label: 'Subtitel',
            defaultValue: 'Hier vind je antwoorden op de meest gestelde vragen.',
        },
        {
            name: 'bannerImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Banner Afbeelding',
        },
    ],
}
