// collections/leiders.ts
import type { CollectionConfig } from 'payload'

export const Leiders: CollectionConfig = {
  slug: 'leiders',
  admin: { useAsTitle: 'name' },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Naam', type: 'text', required: true },
    {
      name: 'takken',
      label: 'Tak(ken)',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Kapoenen',      value: 'kapoenen' },
        { label: 'Wouters',       value: 'wouters' },
        { label: 'Jonggivers',    value: 'jonggivers' },
        { label: 'Givers',        value: 'givers' },
        { label: 'Jin',           value: 'jin' },
        { label: 'Groepsleiding', value: 'groepsleiding' },
        { label: 'Gestopt',       value: 'gestopt' },
      ],
    },
    {
      name: 'year',
      label: '1e Leidingsjaar',
      type: 'number',
      required: true,
      admin: {
        description:
          'Als het 1e leidingsjaar bvb 2024-2025, vul dan 2024 in',
      },
    },
    {
      name: 'stopYear',
      label: '1e Gestopt Jaar',
      type: 'number',
      admin: {
        description:
          'Vul hier het eerste jaar in waarin de leider stopt (bv. 2024).',
      },
    },
    { name: 'totem', label: 'Totem', type: 'text' },
    {
      name: 'totemBeschrijving',
      label: 'Totem Beschrijving',
      type: 'textarea',
    },
    { name: 'description', label: 'Beschrijving', type: 'textarea' },

    // photo field still points at your Media collection:
    { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media' },

    { name: 'phoneNumber', label: 'Telefoonnummer', type: 'text', required: true },
    { name: 'email',       label: 'E-mailadres',      type: 'email', required: true },
    { name: 'kapoenenNaam', label: 'Kapoenen Naam',   type: 'text' },
    { name: 'wouterNaam',   label: 'Wouter Naam',     type: 'text' },
  ],
}