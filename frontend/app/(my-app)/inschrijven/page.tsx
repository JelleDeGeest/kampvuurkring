import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/app/(my-app)/components/Footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Calendar, MapPin, Heart, Star, Sparkles } from 'lucide-react'
import getPayloadClient from '@/lib/getPayload'
import { draftMode } from 'next/headers'
import PreviewControls from '@/components/PreviewControls'

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
        title: 'Ben je al lid?',
        content: 'Vergeet niet om je inschrijving te hernieuwen voor het nieuwe scoutsjaar! Dit kan je eenvoudig doen via dezelfde knop hierboven. Log in met je bestaande account en volg de stappen om je inschrijving te verlengen.',
        infoBoxTitle: 'Belangrijke data',
        infoBoxContent: 'Het nieuwe scoutsjaar start in september. Zorg dat je inschrijving in orde is voor de start van het nieuwe jaar om van bij het begin mee te kunnen doen!',
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
          title: 'Lidgeld',
          content: 'Het jaarlijkse lidgeld bedraagt €50. Dit omvat verzekering, activiteiten en het lidmaatschap bij Scouts en Gidsen Vlaanderen. Voor bestaande leden: vergeet niet je lidgeld te vernieuwen voor het nieuwe scoutsjaar!',
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisions.map((division) => (
                <div 
                  key={division.name}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-2"
                  style={{ borderColor: division.color, backgroundColor: division.bgColor }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: division.color }}
                  >
                    {division.name}
                  </h3>
                  <p className="font-medium text-gray-700 mb-3">{division.age}</p>
                  <p className="text-sm text-gray-600">{division.description}</p>
                </div>
              ))}
            </div>
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
              
              {/* Another playful button with animation */}
              <div className="relative inline-block group">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-200 animate-pulse"></div>
                <a 
                  href={pageData.ctaButtonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative"
                >
                  <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-xl">
                    <Star className="mr-2 h-6 w-6 animate-spin-slow" />
                    {pageData.finalCtaSection.buttonText}
                    <Sparkles className="ml-2 h-6 w-6" />
                  </Button>
                </a>
              </div>
              
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
      
      <Footer />
    </div>
  )
}