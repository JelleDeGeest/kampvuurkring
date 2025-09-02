import { Metadata } from 'next'
import Header from "@/components/header"
import Image from "next/image"
// Removed lucide-react icons temporarily due to build issues
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { ContactForm } from './contact-form.client'
import Gallery from './gallery.client'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface VerhuurPageGlobal {
  title: string
  subtitle: string
  banner?: {
    id: number | string
    alt: string
    url: string
    filename: string
    width?: number
    height?: number
  }
}

export const metadata: Metadata = {
  title: "Verhuur - Scouts Sint-Johannes",
  description: 'Huur onze lokalen en materiaal voor jullie activiteiten',
}

async function getVerhuurPageData(): Promise<VerhuurPageGlobal | null> {
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.findGlobal({
      slug: 'verhuurPage',
      depth: 1,
    })
    
    return result as VerhuurPageGlobal
  } catch (error) {
    // During build time, database might not be available
    console.warn('Database not available during build, using default verhuur page data')
    return {
      title: 'Verhuur',
      subtitle: 'Huur onze lokalen en materiaal voor jullie activiteiten.'
    }
  }
}

async function getLokaalFotos(): Promise<any[]> {
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.find({
      collection: 'lokaalFotos',
      depth: 2,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 50,
    })
    
    return result.docs || []
  } catch (error) {
    console.warn('Could not fetch lokaal fotos, using empty array')
    return []
  }
}

export default async function VerhuurLokaalPage() {
  const verhuurPageData = await getVerhuurPageData()
  const lokaalFotos = await getLokaalFotos()
  
  // Transform CMS data to gallery format
  const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';
  
  const galleryImages = lokaalFotos.map((foto: any) => ({
    id: foto.id,
    src: `${PAYLOAD_URL}${foto.image.url}`,
    alt: foto.image.alt || foto.title,
    title: foto.title,
    description: foto.description,
    category: foto.category,
  }))
  
  // Fallback images if no CMS data
  const fallbackImages = [
    {
      id: 1,
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlZW4gZm90b3MgZ2V1cGxvYWQ8L3RleHQ+PC9zdmc+',
      alt: 'Placeholder - geen foto\'s geüpload',
      title: 'Geen foto\'s beschikbaar',
      category: 'overige',
      description: 'Upload foto\'s via de admin panel om ze hier te zien',
    }
  ]
  
  const finalImages = galleryImages.length > 0 ? galleryImages : fallbackImages
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      {/* Banner Section */}
      {verhuurPageData?.banner ? (
        <section className="container px-4 lg:px-12 pt-8">
          <div className="relative w-full h-[150px] md:h-[180px] lg:h-[220px] rounded-2xl overflow-visible">
            {/* Container for outer glow effect */}
            <div className="absolute inset-y-[-30px] inset-x-[-100vw] left-0 right-0 pointer-events-none z-0">
              <div className="absolute inset-0">
                {/* Glow effect */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${PAYLOAD_URL}${verhuurPageData.banner.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(50px) saturate(350%) opacity(35%)',
                    transform: 'scale(1.5, 0.9) translateY(-12%)',
                    transformOrigin: 'center',
                  }}
                />
              </div>
            </div>

            {/* Banner content */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden z-10">
              {/* Banner image */}
              <div className="absolute inset-0">
                <Image
                  src={`${PAYLOAD_URL}${verhuurPageData.banner.url}`}
                  alt={verhuurPageData.banner.alt || 'Banner afbeelding verhuur lokaal'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Banner title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                    {verhuurPageData.title}
                  </h1>
                  <p className="text-lg md:text-xl drop-shadow-lg">
                    {verhuurPageData.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Fallback header when no banner is active */
        <section className="container px-4 lg:px-12 pt-8">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              {verhuurPageData?.title || 'Verhuur'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {verhuurPageData?.subtitle || 'Huur onze lokalen en materiaal voor jullie activiteiten.'}
            </p>
          </div>
        </section>
      )}
      
      <main className="flex-1">
        
        {/* Introduction Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-primary">Verhuur scoutslokaal</h2>
              <div className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ons scoutslokaal is beschikbaar voor verhuur aan groepen en organisaties. 
                Het lokaal is perfect voor jeugdkampen, vergaderingen, workshops en andere activiteiten. 
                Met een ruime binnenruimte en een groot buitenterrein bieden we een veelzijdige locatie 
                voor diverse evenementen.
              </div>
            </div>
          </div>
        </section>



        {/* Gallery Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Rondleiding</h2>
            <p className="text-center text-muted-foreground mb-8">
              Bekijk onze faciliteiten en krijg een goede indruk van ons lokaal.
            </p>
            <Gallery images={finalImages} />
          </div>
        </section>

        {/* Facilities Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Faciliteiten</h2>
            <p className="text-center text-muted-foreground mb-8">
              Ontdek alle beschikbare faciliteiten in ons goed uitgeruste scoutslokaal.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">🏠 Slaaplokalen</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Er zijn 3 lokalen die je kan gebruiken om te slapen, je moet wel zelf matjes of veldbedden voorzien.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">🍴 Keuken</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Kookvuur met 6 grote pitten, oven, dubbele lavabo, werkblad en koelkast. Kookmateriaal en eetgerief voor max. 60 personen voorzien.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">🍽️ Eetzaal / daglokaal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Grote zaal voor maaltijden en dagactiviteiten.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">👥 Vergaderlokaal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Enkel beschikbaar tijdens de zomervakantie.</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">🚿 Sanitair</h4>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Mannen:</strong> 1 pissoir, 2 toiletten, 1 lavabo</p>
                    <p><strong>Vrouwen:</strong> 3 toiletten, 2 lavabo's</p>
                    <p><strong>Badkamer:</strong> 1 grote lavabo, 3 douches (38°)</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">⛺ Buitenruimte</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2"><strong>Tentengrond:</strong> 5 are</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Gemeentelijke sportvelden (100m): voetbal, basket, speeltuin, bmx</li>
                      <li>Speelterreinen in Vendelierstraat, Tweehagen, Houtvoortstraat</li>
                      <li>Speelbos achter Sint-Helena</li>
                      <li>Skateterrein Houtvoort complex</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Image Section 2 */}
        <section className="container px-4 lg:px-12 pb-8">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20" />
            </div>
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </section>

        {/* Location & Surroundings Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-primary">Locatie & omgeving</h2>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Location Info */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center text-primary">
                      📍 Ligging & adres
                    </h3>
                    <div className="text-muted-foreground space-y-4">
                      <p>Landelijk gelegen aan de rand van St-Gillis-Waas op 1 kilometer van het centrum.</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-foreground mb-2">Scoutslokaal "Den Tybaert"</p>
                        <p>Tybaertstraat 1<br/>9170 Sint-Gillis-Waas</p>
                      </div>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Voldoende parking in de omgeving</li>
                        <li>Open terrein met zandweg (vrij te houden voor hulpdiensten)</li>
                        <li>Openbaar vervoer (De Lijn) op minder dan 1 km</li>
                        <li>Fietsknooppunten: <a href="https://www.fietsnet.be" className="text-primary hover:underline">www.fietsnet.be</a></li>
                      </ul>
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">
                      Activiteiten in de omgeving
                    </h3>
                    <div className="text-muted-foreground space-y-4">
                      <div>
                        <p className="font-medium text-foreground mb-2">Winkels:</p>
                        <p className="text-sm">Centrum: plaatselijke winkeliers + Carrefour<br/>
                        Colruyt en Aldi op 1,3-1,8 km afstand</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-foreground mb-2">Ontspanning:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Speelbos (2 km via fiets- en wandelpad)</li>
                          <li><a href="http://www.reynaertland.nl" className="text-primary hover:underline">Reynaertland Hulst</a> - zwembad (max 10 km)</li>
                          <li><a href="https://oost-vlaanderen.be/ontspannen/recreatiedomeinen/de-ster.html" className="text-primary hover:underline">Provinciaal domein "De Ster"</a> (max 10 km)</li>
                          <li><a href="https://www.lago.be/beveren" className="text-primary hover:underline">Zwembad "De meerminnen"</a> (max 11 km)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-foreground mb-3">Meer informatie:</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Dienst Toerisme/Cultuur (recht tegenover het lokaal): GC De Route, Stationstraat 201 bus 1</p>
                    <p>Kampvuur dient vooraf aangevraagd te worden via de gemeente.</p>
                    <p><strong>Contact:</strong> <a href="mailto:deroute@sint-gillis-waas.be" className="text-primary hover:underline">deroute@sint-gillis-waas.be</a> | 03 229 02 00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Calendar Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">Beschikbaarheid</h2>
              <p className="text-center text-muted-foreground mb-8">
                Controleer hier onze beschikbaarheid en plan je verhuur.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-primary">📅 Google Calendar</h3>
                </div>
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center text-muted-foreground">
                  Google Calendar embed will be placed here
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section with Contact */}
        <section className="pt-4 pb-20">
          <div className="container px-4 lg:px-12">
            <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-r from-primary/30 to-secondary/30" />
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:pr-12 lg:pr-16">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 text-center md:text-right text-white max-w-sm md:max-w-lg w-full md:w-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    Klaar om te reserveren?
                  </h2>
                  <div className="text-base md:text-lg mb-6 space-y-3">
                    <div>
                      <p className="font-semibold">Marlene Stuer</p>
                      <p className="text-sm">Reepstraat 164, 9170 Sint-Gillis-Waas</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center md:justify-end gap-2">
                        <a href="tel:03/770.74.29" className="hover:underline">📞 03/770.74.29</a>
                      </div>
                      <div className="flex items-center justify-center md:justify-end gap-2">
                        <a href="mailto:Lokaalverhuur@scoutssintjohannes.be" className="hover:underline text-sm">
                          ✉️ Lokaalverhuur@scoutssintjohannes.be
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded p-3">
                      <p className="text-sm font-medium">Lokaaladres:</p>
                      <p className="text-sm">Tybaertstraat 1, 9170 Sint-Gillis-Waas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Vragen? Neem contact op!</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stuur ons een bericht voor meer informatie of om je verhuur aan te vragen.
            </p>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

      </main>
    </div>
  )
} 