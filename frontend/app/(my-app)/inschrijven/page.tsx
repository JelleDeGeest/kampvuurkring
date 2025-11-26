import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ResponsiveImage, type PayloadImage } from '@/components/ResponsiveImage'
import { selectMediaVariantUrl, resolveMediaUrl } from '@/lib/mediaHelpers'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Users from 'lucide-react/dist/esm/icons/users'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Heart from 'lucide-react/dist/esm/icons/heart'
import Star from 'lucide-react/dist/esm/icons/star'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Euro from 'lucide-react/dist/esm/icons/euro'
import Shirt from 'lucide-react/dist/esm/icons/shirt'
import getPayloadClient from '@/lib/getPayload'
import { draftMode } from 'next/headers'
import PreviewControls from '@/components/PreviewControls'
import TakkenAccordion from '@/components/TakkenAccordion'
import PageBanner from '@/components/PageBanner'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Inschrijven - Scouts Sint-Johannes",
  description: 'Schrijf je in voor onze activiteiten, kampen en weekends',
}

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
    case 'euro':
      return <Euro className="mr-2 h-5 w-5 text-primary" />
    case 'shirt':
      return <Shirt className="mr-2 h-5 w-5 text-primary" />
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
      depth: 1,
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
      decorativeImage: null, // Can be set to an image object with url and alt properties
      decorativeImage2: null, // Can be set to an image object with url and alt properties
      decorativeImage3: null, // Can be set to an image object with url and alt properties
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

  const resolveMediaUrlWithFallback = (media?: PayloadImage | null) =>
    selectMediaVariantUrl(media, {
      sizePreference: ['lg', 'md', 'sm'],
      formatPreference: ['avif', 'webp', 'jpeg', 'jpg'],
      baseUrl: PAYLOAD_URL,
    }) ?? resolveMediaUrl(media?.url, PAYLOAD_URL)

  const bannerImageUrl = resolveMediaUrlWithFallback(pageData?.banner as PayloadImage | null)
  const resolvedBannerImageUrl = bannerImageUrl ?? resolveMediaUrl(pageData?.banner?.url, PAYLOAD_URL)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isEnabled && <PreviewControls />}

      <PageBanner
        banner={pageData.banner}
        title={pageData.title}
        subtitle={pageData.subtitle}
        resolvedBannerImageUrl={resolvedBannerImageUrl}
      />
      
      <main className="flex-1">

        {/* Lid worden Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-primary">Lid worden</h2>
              <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
                Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?

Ieder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.
Bij het tabblad 'agenda/ratel' vind je steeds terug waar en wanneer er vergadering plaatsvindt.
              </div>
              
              {/* CTA Button */}
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
          </div>
        </section>

        {/* Why Join Section */}
        {pageData.whyJoinReasons && pageData.whyJoinReasons.length > 0 && (
          <section className="pt-4 pb-8">
            <div className="container px-4 lg:px-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-primary">{pageData.whyJoinTitle}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pageData.whyJoinReasons.map((reason: any, index: number) => (
                  <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
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

        {/* Decorative Image Section */}
        <section className="container px-4 lg:px-12 pb-8">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="absolute inset-0">
              {pageData.decorativeImage ? (
                <ResponsiveImage
                  media={pageData.decorativeImage}
                  alt={pageData.decorativeImage.alt || 'Scouts activities'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : pageData.banner ? (
                <ResponsiveImage
                  media={pageData.banner}
                  alt={pageData.banner.alt || 'Scouts activities'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
              )}
            </div>
            
            {/* Light overlay for better visual flow */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </section>


        {/* Divisions Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">{pageData.divisionsTitle}</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {pageData.divisionsSubtitle}
            </p>
            <TakkenAccordion className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* Second Decorative Image Section */}
        <section className="container px-4 lg:px-12 pb-8">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="absolute inset-0">
              {pageData.decorativeImage2 ? (
                <ResponsiveImage
                  media={pageData.decorativeImage2}
                  alt={pageData.decorativeImage2.alt || 'Scouts activities'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : pageData.decorativeImage ? (
                <ResponsiveImage
                  media={pageData.decorativeImage}
                  alt={pageData.decorativeImage.alt || 'Scouts activities'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : pageData.banner ? (
                <ResponsiveImage
                  media={pageData.banner}
                  alt={pageData.banner.alt || 'Scouts activities'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
              )}
            </div>
            
            {/* Light overlay for better visual flow */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </section>

        {/* Practical Info Section */}
        {pageData.practicalInfo && pageData.practicalInfo.length > 0 && (
          <section className="pt-4 pb-8">
            <div className="container px-4 lg:px-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-primary">{pageData.practicalInfoTitle}</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {pageData.practicalInfo.map((info: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-primary">
                      {info.icon && <SmallIconComponent icon={info.icon} />}
                      {info.title}
                    </h3>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {info.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section with Background Image */}
        {pageData.finalCtaSection && (
          <section className="pt-4 pb-20">
            <div className="container px-4 lg:px-12">
              <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  {pageData.decorativeImage3 ? (
                    <ResponsiveImage
                      media={pageData.decorativeImage3}
                      alt={pageData.decorativeImage3.alt || 'Scouts final CTA background'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  ) : pageData.banner ? (
                    <ResponsiveImage
                      media={pageData.banner}
                      alt={pageData.banner.alt || 'Scouts final CTA background'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
                  )}
                </div>
                
                
                {/* Content overlay positioned on the right side */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:pr-12 lg:pr-16">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 text-center md:text-right text-white max-w-sm md:max-w-lg w-full md:w-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                      {pageData.finalCtaSection.title}
                    </h2>
                    <p className="text-base md:text-lg mb-6 whitespace-pre-line">
                      {pageData.finalCtaSection.content}
                    </p>
                    
                    <a 
                      href={pageData.ctaButtonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mb-4"
                    >
                      <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-xl">
                        <Sparkles className="mr-2 h-5 w-5" />
                        {pageData.finalCtaSection.buttonText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    
                    <div className="flex items-center justify-center md:justify-end gap-4 text-sm">
                      <span>Heb je vragen?</span>
                      <Link href="/contact" className="text-white hover:text-primary-foreground underline font-medium">
                        Contacteer ons
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
