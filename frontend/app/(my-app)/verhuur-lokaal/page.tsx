import { Metadata } from 'next'
import Image from "next/image"
import Home from 'lucide-react/dist/esm/icons/home'
import Phone from 'lucide-react/dist/esm/icons/phone'
import Mail from 'lucide-react/dist/esm/icons/mail'
import UtensilsCrossed from 'lucide-react/dist/esm/icons/utensils-crossed'
import Droplets from 'lucide-react/dist/esm/icons/droplets'
import ChefHat from 'lucide-react/dist/esm/icons/chef-hat'
import Users from 'lucide-react/dist/esm/icons/users'
import Tent from 'lucide-react/dist/esm/icons/tent'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import ScrollButton from './scroll-button.client'
import config from '@payload-config'
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
  description: 'Huur ons scoutslokaal voor jullie activiteiten',
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
      subtitle: 'Huur ons scoutslokaal voor jullie activiteiten'
    }
  }
}

async function getLokaalFotos(): Promise<any[]> {
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.find({
      collection: 'lokaal-fotos',
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
    <>
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
              {verhuurPageData?.subtitle || 'Huur ons scoutslokaal voor jullie activiteiten'}
            </p>
          </div>
        </section>
      )}
      
      <main className="flex-1">
        
        {/* Introduction Section */}
        <section className="pt-4 pb-4">
          <div className="container px-4 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-primary">Verhuur scoutslokaal</h2>
              <div className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ons scoutslokaal is beschikbaar voor verhuur aan andere groepen en is perfect voor jeugdkampen/weekends. 
                Met ruime binnenruimte en een groot buitenterrein bieden we een veelzijdige locatie aan.
              </div>
              {/* CTA Button */}
              <div className="flex justify-center">
                <ScrollButton targetId="reserveren">
                  Reserveren
                </ScrollButton>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Info Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Half - Location & Map */}
              <div className="space-y-6 order-2 lg:order-1">
                {/* Location Header Card */}
                <div className="bg-white rounded-lg p-4 h-[80px] flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-primary">Onze Locatie</h3>
                  <p className="text-base text-muted-foreground mt-1">
                    Scoutslokaal Den Tybaert, Tybaertstraat 1, 9170 Sint-Gillis-Waas
                  </p>
                </div>

                {/* Map Card */}
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="h-[371px] relative w-full">
                    <iframe
                      src="https://maps.google.com/maps?q=Tybaertstraat+1,+9170+Sint-Gillis-Waas,+Belgium&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0, minHeight: '371px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Right Half - Location Information */}
              <div className="bg-white rounded-lg p-6 h-[475px] order-1 lg:order-2">
                <div className="space-y-6">

                {/* Activiteiten in de omgeving Section */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-1">Omgeving</h3>
                  <div className="text-muted-foreground space-y-4">
                    <div>
                      <p className="font-semibold mb-2 text-foreground">Ontspanning:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Gemeentelijke sportvelden (100m): voetbal, basket, speeltuin, bmx</li>
                        <li>• Speelterreinen in Vendelierstraat, Tweehagen, Houtvoortstraat</li>
                        <li>• Skateterrein Houtvoort complex</li>
                        <li>• <a href="http://www.reynaertland.nl" className="text-primary hover:underline">Reynaertland Hulst</a> - zwembad (max 10 km)</li>
                        <li>• <a href="https://oost-vlaanderen.be/ontspannen/recreatiedomeinen/de-ster.html" className="text-primary hover:underline">Provinciaal domein "De Ster"</a> (max 10 km)</li>
                        <li>• <a href="https://www.lago.be/beveren" className="text-primary hover:underline">Zwembad "De meerminnen"</a> (max 11 km)</li>
                        <li>• Stropersbos (5 km via fiets- en wandelpad)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Meer informatie Section */}
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-1">Meer informatie</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="text-sm">Dienst Toerisme/Cultuur (recht tegenover het lokaal): GC De Route, Stationstraat 201 bus 1</p>
                    <p className="text-sm">Kampvuur dient vooraf aangevraagd te worden via de gemeente.</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">Contact:</p>
                      <a href="mailto:deroute@sint-gillis-waas.be" className="text-primary hover:underline flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4" />deroute@sint-gillis-waas.be
                      </a>
                      <a href="tel:03 229 02 00" className="text-primary hover:underline flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4" />03 229 02 00
                      </a>
                    </div>
                  </div>
                </div>

                </div>
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">Faciliteiten</h2>
              <p className="text-center text-muted-foreground mb-8">
                Ontdek alle beschikbare faciliteiten in ons goed uitgeruste scoutslokaal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><Home className="mr-2 h-5 w-5 text-primary" />Slaaplokalen</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Er zijn 3 lokalen die je kan gebruiken om te slapen, je moet wel zelf matjes of veldbedden voorzien.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><ChefHat className="mr-2 h-5 w-5 text-primary" />Keuken</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Kookvuur met 6 grote pitten, oven, dubbele lavabo, werkblad en koelkast. Kookmateriaal en eetgerief voor max. 60 personen voorzien.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><UtensilsCrossed className="mr-2 h-5 w-5 text-primary" />Eetzaal / daglokaal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Grote zaal voor maaltijden en dagactiviteiten.</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><Users className="mr-2 h-5 w-5 text-primary" />Leidingslokaal</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Enkel beschikbaar tijdens de zomervakantie.</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><Droplets className="mr-2 h-5 w-5 text-primary" />Sanitair</h4>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Mannen:</strong> 1 pissoir, 2 toiletten, 1 lavabo</p>
                    <p><strong>Vrouwen:</strong> 3 toiletten, 2 lavabo's</p>
                    <p><strong>Badkamer:</strong> 1 grote lavabo, 3 douches (38°)</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold flex items-center"><Tent className="mr-2 h-5 w-5 text-primary" />Buitenruimte</h4>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2"><strong>Tentengrond:</strong> 5 are</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-center mb-6 text-primary">Prijzen en waarborg</h2>
              
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Tarieven</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Prijs: € 5,50 per nacht per persoon, met een minimum van € 150,00 per nacht.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Vergoeding van water, gas en elektriciteit volgens verbruik.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Waarborg</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>€ 300 voor kort verblijf (tot 2 overnachtingen)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>€ 500 voor lang verblijf (vanaf 3 overnachtingen)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section id="reserveren" className="pt-4 pb-8">
          <div className="container px-4 lg:px-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-center mb-4 text-primary">Reserveren</h2>

              {/* Warning banner */}
              <div className="flex justify-center mb-3">
                <div className="bg-red-100 px-4 py-2 rounded-full inline-block">
                  <div className="flex items-center">
                    <div className="text-red-800">
                      <p className="font-semibold">🚫 Opgelet: we verhuren niet aan leidingsweekends</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact info above map */}
              <div className="text-center space-y-2 mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
                  <a href="mailto:Lokaalverhuur@scoutssintjohannes.be" className="text-primary hover:underline flex items-center justify-center">
                    <Mail className="mr-2 h-5 w-5" />Lokaalverhuur@scoutssintjohannes.be
                  </a>
                  <a href="tel:03/770.74.29" className="text-primary hover:underline flex items-center justify-center">
                    <Phone className="mr-2 h-4 w-4" />03/770.74.29
                  </a>
                </div>
                
                <p className="text-center text-muted-foreground">
                  Controleer hieronder onze beschikbaarheid en mail naar bovenstaand adres om je verhuur aan te vragen.
                </p>
              </div>

              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=vzwscoutssintjohannes%40gmail.com&ctz=Europe%2FBrussels"
                  className="w-full h-96"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>



      </main>
    </>
  )
} 