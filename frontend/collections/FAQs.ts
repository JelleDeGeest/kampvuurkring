import { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
    slug: 'faqs',
    admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'category', 'order'],
        group: 'Collecties',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'question',
            type: 'text',
            required: true,
            label: 'Vraag',
        },
        {
            name: 'answer',
            type: 'richText',
            required: true,
            label: 'Antwoord',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'faq-categories',
            required: true,
            label: 'Categorie',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'order',
            type: 'number',
            admin: {
                position: 'sidebar',
                description: 'Volgorde van de vragen (laag naar hoog)',
            },
        },
    ],
}
