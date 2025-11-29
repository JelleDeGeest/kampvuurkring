import { CollectionConfig } from 'payload'

export const FAQCategories: CollectionConfig = {
    slug: 'faq-categories',
    labels: {
        singular: 'FAQ Categorie',
        plural: 'FAQ Categorieën',
    },
    admin: {
        useAsTitle: 'title',
        group: 'Collecties',
        defaultColumns: ['title', 'slug', 'order'],
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
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'order',
            type: 'number',
            admin: {
                position: 'sidebar',
                description: 'Volgorde van de categorieën',
            },
        },
    ],
}
