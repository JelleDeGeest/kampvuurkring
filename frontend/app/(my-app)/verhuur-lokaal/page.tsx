import { Metadata } from 'next'
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Calendar, MapPin, Users, Euro } from "lucide-react"
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { ContactForm } from './contact-form.client'

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

export default async function VerhuurLokaalPage() {
  const verhuurPageData = await getVerhuurPageData()
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
                  alt={verhuurPageData.banner.alt}
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
        <div className="container px-4 lg:px-12 pt-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground mb-8">
                <p className="text-muted-foreground">
                  Ons scoutslokaal is beschikbaar voor verhuur aan groepen en organisaties. 
                  Het lokaal is perfect voor jeugdkampen, vergaderingen, workshops en andere activiteiten. 
                  Met een ruime binnenruimte en een groot buitenterrein bieden we een veelzijdige locatie 
                  voor diverse evenementen.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Capaciteit</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tot 50 personen binnen
                      <br />
                      Groot buitenterrein
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Locatie</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Centraal gelegen
                      <br />
                      Goede bereikbaarheid
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Beschikbaarheid</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Weekends
                      <br />
                      Schoolvakanties
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Tarieven</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Weekend: €250
                      <br />
                      Dag: €100
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 