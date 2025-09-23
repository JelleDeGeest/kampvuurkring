import { CollectionConfig } from 'payload'

const LokaalFotos: CollectionConfig = {
  slug: 'lokaal-fotos',
  labels: {
    singular: 'Lokaal',
    plural: 'Lokaal',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'image'],
    group: 'Collecties',
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
      type: 'text',
      label: 'Titel',
      required: true,
      admin: {
        placeholder: 'bijv. Keuken overzicht, Slaaplokaal 1, ...',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Afbeelding',
      relationTo: 'lokaal-media',
      required: true,
      admin: {
        description: 'Upload een foto van het lokaal of faciliteit',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      required: true,
      options: [
        {
          label: 'Lokaal Exterieur',
          value: 'exterieur',
        },
        {
          label: 'Slaaplokalen',
          value: 'slaaplokalen',
        },
        {
          label: 'Keuken',
          value: 'keuken',
        },
        {
          label: 'Eetzaal / Daglokaal',
          value: 'eetzaal',
        },
        {
          label: 'Vergaderlokaal',
          value: 'vergaderlokaal',
        },
        {
          label: 'Sanitair',
          value: 'sanitair',
        },
        {
          label: 'Buitenruimte',
          value: 'buitenruimte',
        },
        {
          label: 'Tentengrond',
          value: 'tentengrond',
        },
        {
          label: 'Speelterrein',
          value: 'speelterrein',
        },
        {
          label: 'Parking',
          value: 'parking',
        },
        {
          label: 'Overige',
          value: 'overige',
        },
      ],
      admin: {
        description: 'Kies de categorie waar deze foto bij hoort',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
      required: false,
      admin: {
        placeholder: 'Optionele beschrijving van wat er te zien is op de foto',
        rows: 3,
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Volgorde',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Lagere nummers komen eerst in de gallery (0, 1, 2, ...)',
        placeholder: '0',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Actief',
      defaultValue: true,
      admin: {
        description: 'Uitgevinkt = foto wordt niet getoond in de gallery',
      },
    },
  ],
}

export default LokaalFotos