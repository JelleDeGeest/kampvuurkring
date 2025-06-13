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
      label: 'Lid worden sectie',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          defaultValue: 'Lid worden',
        },
        {
          name: 'content',
          label: 'Inhoud',
          type: 'textarea',
          defaultValue: 'Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?\n\nIeder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.\nBij het tabblad \'agenda/ratel\' vind je steeds terug waar en wanneer er vergadering plaatsvindt.',
        },
        {
          name: 'infoBoxTitle',
          label: 'Info Box Titel',
          type: 'text',
          defaultValue: 'Hoe schrijf ik mijn kind in?',
        },
        {
          name: 'infoBoxContent',
          label: 'Info Box Inhoud',
          type: 'textarea',
          defaultValue: 'Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij \'inschrijven\' \'nieuw lid toevoegen\'.\n\nNieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad \'afrekeningen\'. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je oms steeds bereiken via groepsleiding@scoutssintjohannes.be.\n\nHoeveel bedraagt het lidgeld?\n\nHet lidgeld bedraagt 45 euro per kind.\nVanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.\nHet lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.\n\nEr is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.',
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