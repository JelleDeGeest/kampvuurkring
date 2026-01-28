import { CollectionConfig } from 'payload'

const SearchLogs: CollectionConfig = {
    slug: 'search-logs',
    labels: {
        singular: 'Zoekopdracht Log',
        plural: 'Zoekopdracht Logs',
    },
    admin: {
        useAsTitle: 'query',
        defaultColumns: ['query', 'resultsCount', 'timestamp'],
        group: 'Collecties',
    },
    access: {
        read: ({ req: { user } }) => {
            // Only admins can see logs
            return Boolean(user)
        },
        create: () => true, // Anyone can create a log (from server action)
        update: () => false, // No updates allowed
        delete: ({ req: { user } }) => {
            // Only admins can delete logs
            return Boolean(user)
        },
    },
    fields: [
        {
            name: 'query',
            type: 'text',
            required: true,
            label: 'Zoekterm',
        },
        {
            name: 'timestamp',
            type: 'date',
            required: true,
            defaultValue: () => new Date().toISOString(),
            label: 'Tijdstip',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'resultsCount',
            type: 'number',
            label: 'Aantal Resultaten',
            admin: {
                description: 'Hoeveel resultaten werden er gevonden?',
            },
        },
    ],
}

export default SearchLogs
