import Link from 'next/link'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Users from 'lucide-react/dist/esm/icons/users'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Heart from 'lucide-react/dist/esm/icons/heart'
import Star from 'lucide-react/dist/esm/icons/star'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import getPayloadClient from '@/lib/getPayload'
import { draftMode } from 'next/headers'
import PreviewControls from '@/components/PreviewControls'
import TakkenAccordion from '@/components/TakkenAccordion'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

// Division info with colors from the theme
const divisions = [
  {
    name: 'Kapoenen',
    age: '6-8 jaar',
    description: 'Ontdekken, spelen en fantaseren in een wereld vol avontuur!',
    color: 'rgb(255, 205, 92)', // --kapoenen
    bgColor: 'rgba(255, 205, 92, 0.1)',
  },
  {
    name: 'Wouters',
    age: '8-11 jaar',
    description: 'Samen spelen, leren en groeien in de natuur!',
    color: 'rgb(79, 190, 183)', // --wouters
    bgColor: 'rgba(79, 190, 183, 0.1)',
  },
  {
    name: 'Jonggivers',
    age: '11-14 jaar',
    description: 'Uitdagingen aangaan en je grenzen verleggen!',
    color: 'rgb(251, 139, 4)', // --jonggivers
    bgColor: 'rgba(251, 139, 4, 0.1)',
  },
  {
    name: 'Givers',
    age: '14-17 jaar',
    description: 'Verantwoordelijkheid nemen en samen grote avonturen beleven!',
    color: 'rgb(13, 41, 211)', // --givers
    bgColor: 'rgba(13, 41, 211, 0.1)',
  },
  {
    name: 'Jin',
    age: '17-18 jaar',
    description: 'De laatste stap als lid, met maximale vrijheid en eigen projecten!',
    color: 'rgb(164, 57, 93)', // --jin
    bgColor: 'rgba(164, 57, 93, 0.1)',
  },
]

// Icon component mapper
const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'users':
      return <Users className="h-8 w-8 text-primary" />
    case 'star':
      return <Star className="h-8 w-8 text-primary" />
    case 'heart':
      return <Heart className="h-8 w-8 text-primary" />
    case 'mapPin':
      return <MapPin className="h-8 w-8 text-primary" />
    case 'calendar':
      return <Calendar className="h-8 w-8 text-primary" />
    case 'sparkles':
      return <Sparkles className="h-8 w-8 text-primary" />
    default:
      return null
  }
}

// Small icon mapper for practical info
const SmallIconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'calendar':
      return <Calendar className="mr-2 h-5 w-5 text-primary" />
    case 'mapPin':
      return <MapPin className="mr-2 h-5 w-5 text-primary" />
    default:
      return null
  }
}

export default async function InschrijvenPage() {
  const { isEnabled } = await draftMode()
  const payload = await getPayloadClient()

  let pageData: any

  try {
    pageData = await payload.findGlobal({
      slug: 'inschrijvenPage',
      draft: isEnabled,
    })
  } catch (error) {
    console.error('Error fetching page data:', error)
    // Use default values if fetch fails
    pageData = {
      title: 'Inschrijven bij Scouts Sint-Johannes',
      subtitle: 'Word lid of hernieuw je inschrijving voor een nieuw jaar vol avonturen!',
      ctaButtonText: 'Schrijf je nu in!',
      ctaButtonUrl: 'https://scouts-sint-johannes.stamhoofd.be',
      ctaSubtext: 'Via ons online inschrijvingssysteem Stamhoofd',
      whyJoinTitle: 'Waarom lid worden/blijven?',
      whyJoinReasons: [
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
      existingMembersSection: {
        title: 'Lid worden',
        content: 'Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?\n\nIeder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.\nBij het tabblad \'agenda/ratel\' vind je steeds terug waar en wanneer er vergadering plaatsvindt.',
        infoBoxTitle: 'Hoe schrijf ik mijn kind in?',
        infoBoxContent: 'Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij \'inschrijven\' \'nieuw lid toevoegen\'.\n\nNieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad \'afrekeningen\'. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je ons steeds bereiken via groepsleiding@scoutssintjohannes.be.\n\nHoeveel bedraagt het lidgeld?\n\nHet lidgeld bedraagt 45 euro per kind.\nVanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.\nHet lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.\n\nEr is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.',
      },
      divisionsTitle: 'Onze takken',
      divisionsSubtitle: 'Bij de scouts is er voor elke leeftijd een aangepast programma. Ontdek welke tak bij jouw leeftijd past!',
      practicalInfoTitle: 'Praktische informatie',
      practicalInfo: [
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
          title: 'Uniform',
          content: 'Elk lid draagt een scouts uniform bestaande uit een beige hemd en groene broek/rok. Das en kentekens van de groep kan je bij ons aankopen.',
        },
      ],
      finalCtaSection: {
        title: 'Klaar voor een nieuw scoutsjaar?',
        content: 'Nieuwe leden: word deel van onze scouts familie!\nBestaande leden: hernieuw je inschrijving voor het komende jaar!',
        buttonText: 'Start je inschrijving hier!',
      },
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isEnabled && <PreviewControls />}
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary/5 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
          <div className="container relative z-10 text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">{pageData.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {pageData.subtitle}
            </p>
            
            {/* Playful CTA Button */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <a 
                href={pageData.ctaButtonUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative"
              >
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {pageData.ctaButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            
            {pageData.ctaSubtext && (
              <p className="mt-4 text-sm text-muted-foreground">
                {pageData.ctaSubtext}
              </p>
            )}
          </div>
        </section>

        {/* Why Join Section */}
        {pageData.whyJoinReasons && pageData.whyJoinReasons.length > 0 && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">{pageData.whyJoinTitle}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pageData.whyJoinReasons.map((reason: any, index: number) => (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent icon={reason.icon} />
                    </div>
                    <h3 className="font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Info for existing members */}
        {pageData.existingMembersSection && (
          <section className="py-16 bg-secondary/10">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">{pageData.existingMembersSection.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {pageData.existingMembersSection.content}
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{pageData.existingMembersSection.infoBoxTitle}</h3>
                  <p className="text-muted-foreground">
                    {pageData.existingMembersSection.infoBoxContent}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Divisions Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">{pageData.divisionsTitle}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {pageData.divisionsSubtitle}
            </p>
            <TakkenAccordion className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* Practical Info Section */}
        {pageData.practicalInfo && pageData.practicalInfo.length > 0 && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">{pageData.practicalInfoTitle}</h2>
              <div className="max-w-3xl mx-auto space-y-8">
                {pageData.practicalInfo.map((info: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      {info.icon && <SmallIconComponent icon={info.icon} />}
                      {info.title}
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        {pageData.finalCtaSection && (
          <section className="py-20 bg-primary/5">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-6">{pageData.finalCtaSection.title}</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto whitespace-pre-line">
                {pageData.finalCtaSection.content}
              </p>
              
              <a 
                href={pageData.ctaButtonUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {pageData.finalCtaSection.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>Heb je vragen?</span>
                <Link href="/contact" className="text-primary hover:underline font-medium">
                  Contacteer ons
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}