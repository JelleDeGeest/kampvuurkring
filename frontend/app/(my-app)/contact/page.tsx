import { Metadata } from 'next'
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface ContactPageGlobal {
  title: string
  subtitle: string
  banner?: {
    id: string
    alt: string
    url: string
    filename: string
    width?: number
    height?: number
  }
}

export const metadata: Metadata = {
  title: "Contact - Scouts Sint-Johannes",
  description: 'Neem contact met ons op voor vragen of meer informatie',
}

async function getContactPageData(): Promise<ContactPageGlobal | null> {
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.findGlobal({
      slug: 'contactPage',
      depth: 1,
    })
    
    return result as ContactPageGlobal
  } catch (error) {
    // During build time, database might not be available
    console.warn('Database not available during build, using default contact page data')
    return {
      title: 'Contact',
      subtitle: 'Neem contact met ons op voor vragen of meer informatie.'
    }
  }
}

export default async function ContactPage() {
  const contactPageData = await getContactPageData()
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      {/* Banner Section */}
      {contactPageData?.banner ? (
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
                    backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${PAYLOAD_URL}${contactPageData.banner.url})`,
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
                  src={`${PAYLOAD_URL}${contactPageData.banner.url}`}
                  alt={contactPageData.banner.alt}
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
                    {contactPageData.title}
                  </h1>
                  <p className="text-lg md:text-xl drop-shadow-lg">
                    {contactPageData.subtitle}
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
              {contactPageData?.title || 'Contact'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {contactPageData?.subtitle || 'Neem contact met ons op voor vragen of meer informatie.'}
            </p>
          </div>
        </section>
      )}
      
      <main className="flex-1">
        <div className="container px-4 lg:px-12 pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-primary">Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Adres</h3>
                    <p className="text-muted-foreground">Straatnaam 123</p>
                    <p className="text-muted-foreground">1234 AB Stad</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@scoutssintjohannes.nl</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefoon</h3>
                    <p className="text-muted-foreground">+31 123 456 789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-primary">Openingstijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Scoutsavonden</h3>
                    <p className="text-muted-foreground">Zaterdag: 14:00 - 17:00</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Bestuur</h3>
                    <p className="text-muted-foreground">Maandag: 19:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 