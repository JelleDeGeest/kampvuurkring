import { GlobalConfig } from 'payload/types'

export const InschrijvenPage: GlobalConfig = {
  slug: 'inschrijvenPage',
  label: 'Inschrijven Pagina',
  access: {
    read: () => true,
    update: () => true,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 400, // ms between autosaves while typing
      },
    },
  },
  admin: {
    // Preview in a new tab (paper-airplane icon)
    preview: () => `${process.env.NEXT_PUBLIC_SITE_URL}/preview/inschrijven`,
    
    // Live-preview pane inside the admin (eye icon)
    livePreview: {
      // Load the /preview/inschrijven route so Draft Mode is enabled
      url: () => `/preview/inschrijven`,
      
      // optional device sizes in the toolbar
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667 },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800  },
      ],
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
      defaultValue: 'Inschrijven bij Scouts Sint-Johannes',
    },
    {
      name: 'subtitle',
      label: 'Ondertitel',
      type: 'text',
      required: true,
      defaultValue: 'Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!',
    },
    {
      name: 'ctaButtonText',
      label: 'CTA Knop Tekst',
      type: 'text',
      required: true,
      defaultValue: 'Schrijf je nu in!',
    },
    {
      name: 'ctaButtonUrl',
      label: 'CTA Knop URL',
      type: 'text',
      required: true,
      defaultValue: 'https://scouts-sint-johannes.stamhoofd.be',
    },
    {
      name: 'ctaSubtext',
      label: 'CTA Ondertekst',
      type: 'text',
      defaultValue: 'Via ons online inschrijvingssysteem Stamhoofd',
    },
    {
      name: 'whyJoinTitle',
      label: 'Waarom Lid Worden Titel',
      type: 'text',
      defaultValue: 'Waarom lid worden/blijven?',
    },
    {
      name: 'whyJoinReasons',
      label: 'Redenen om lid te worden',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icoon',
          type: 'select',
          options: [
            { label: 'Vrienden', value: 'users' },
            { label: 'Ster', value: 'star' },
            { label: 'Hart', value: 'heart' },
            { label: 'Locatie', value: 'mapPin' },
            { label: 'Kalender', value: 'calendar' },
            { label: 'Fonkeling', value: 'sparkles' },
          ],
          required: true,
        },
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Beschrijving',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'users',
          title: 'Nieuwe Vrienden',
          description: 'Maak vrienden voor het leven in een hechte groep',
        },
        {
          icon: 'star',
          title: 'Avontuur',
          description: 'Beleef elke week nieuwe avonturen en uitdagingen',
        },
        {
          icon: 'heart',
          title: 'Persoonlijke Groei',
          description: 'Ontwikkel vaardigheden en ontdek je talenten',
        },
        {
          icon: 'mapPin',
          title: 'Natuur',
          description: 'Kom buiten, ontdek de natuur en leer haar respecteren',
        },
      ],
    },
    {
      name: 'existingMembersSection',
      label: 'Sectie voor bestaande leden',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          defaultValue: 'Ben je al lid?',
        },
        {
          name: 'content',
          label: 'Inhoud',
          type: 'textarea',
          defaultValue: 'Vergeet niet om je inschrijving te hernieuwen voor het nieuwe scoutsjaar! Dit kan je eenvoudig doen via dezelfde knop hierboven. Log in met je bestaande account en volg de stappen om je inschrijving te verlengen.',
        },
        {
          name: 'infoBoxTitle',
          label: 'Info Box Titel',
          type: 'text',
          defaultValue: 'Belangrijke data',
        },
        {
          name: 'infoBoxContent',
          label: 'Info Box Inhoud',
          type: 'textarea',
          defaultValue: 'Het nieuwe scoutsjaar start in september. Zorg dat je inschrijving in orde is voor de start van het nieuwe jaar om van bij het begin mee te kunnen doen!',
        },
      ],
    },
    {
      name: 'divisionsTitle',
      label: 'Takken Sectie Titel',
      type: 'text',
      defaultValue: 'Onze takken',
    },
    {
      name: 'divisionsSubtitle',
      label: 'Takken Sectie Ondertitel',
      type: 'textarea',
      defaultValue: 'Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!',
    },
    {
      name: 'practicalInfoTitle',
      label: 'Praktische Info Titel',
      type: 'text',
      defaultValue: 'Praktische informatie',
    },
    {
      name: 'practicalInfo',
      label: 'Praktische Informatie',
      type: 'array',
      fields: [
        {
          name: 'icon',
          label: 'Icoon',
          type: 'select',
          options: [
            { label: 'Kalender', value: 'calendar' },
            { label: 'Locatie', value: 'mapPin' },
            { label: 'Euro', value: 'euro' },
            { label: 'Shirt', value: 'shirt' },
          ],
        },
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Inhoud',
          type: 'textarea',
          required: true,
        },
      ],
      defaultValue: [
        {
          icon: 'calendar',
          title: 'Wanneer?',
          content: 'Elke zaterdag van 14u tot 17u30 (behalve tijdens schoolvakanties). We organiseren ook weekends en kampen doorheen het jaar!',
        },
        {
          icon: 'mapPin',
          title: 'Waar?',
          content: 'Onze lokalen bevinden zich in het hart van onze gemeente. Het exacte adres ontvang je na inschrijving.',
        },
        {
          title: 'Lidgeld',
          content: 'Het jaarlijkse lidgeld bedraagt €50. Dit omvat verzekering, activiteiten en het lidmaatschap bij Scouts en Gidsen Vlaanderen. Voor bestaande leden: vergeet niet je lidgeld te vernieuwen voor het nieuwe scoutsjaar!',
        },
        {
          title: 'Uniform',
          content: 'Elk lid draagt een scouts uniform bestaande uit een beige hemd en groene broek/rok. Das en kentekens van de groep kan je bij ons aankopen.',
        },
      ],
    },
    {
      name: 'finalCtaSection',
      label: 'Laatste CTA Sectie',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          defaultValue: 'Klaar voor een nieuw scoutsjaar?',
        },
        {
          name: 'content',
          label: 'Inhoud',
          type: 'textarea',
          defaultValue: 'Nieuwe leden: word deel van onze scouts familie!\nBestaande leden: hernieuw je inschrijving voor het komende jaar!',
        },
        {
          name: 'buttonText',
          label: 'Knop Tekst',
          type: 'text',
          defaultValue: 'Start je inschrijving hier!',
        },
      ],
    },
  ],
}