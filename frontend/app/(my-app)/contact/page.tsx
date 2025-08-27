import { Metadata } from 'next'
import Header from "@/components/header"
import Image from "next/image"
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import KapoenenLogo from "@/public/logos/Kapoenen.svg"
import WoutersLogo from "@/public/logos/Wouters.svg"
import JonggiversLogo from "@/public/logos/Jonggivers.svg"
import GiversLogo from "@/public/logos/Givers.svg"
import JinLogo from "@/public/logos/Jin.svg"
import GroepsLogo from "@/public/logos/Groeps.svg"
import HomeLogo from "@/public/logos/home.svg"

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
  const contactPageData = await getContactPageData();
  
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
        <div className="container px-4 lg:px-12 pt-6 pb-12">
          <div className="grid gap-6 lg:grid-cols-[5fr_2fr]">
            
            {/* Left Half - Location Info and Map */}
            <div className="space-y-6">
              
              {/* Location Header Card */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-2xl font-semibold text-primary">Onze Locatie</h3>
                <p className="text-base text-muted-foreground mt-1">
                  Scoutslokaal Den Tybaert, Tybaertstraat 1, 9170 Sint-Gillis-Waas
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="h-[580px] relative w-full">
                  <iframe
                    src="https://maps.google.com/maps?q=Tybaertstraat+1,+9170+Sint-Gillis-Waas,+Belgium&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0, minHeight: '580px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Scoutslokaal Den Tybaert Location"
                  />
                </div>
              </div>

            </div>

            {/* Right Half - Contact Information */}
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-8">
              
              {/* Groepsleiding Section */}
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6">Groepsleiding</h3>
                <div className="flex items-center gap-4">
                  <GroepsLogo
                    className="h-8 w-8 flex-shrink-0"
                    style={{ color: 'hsl(var(--groepsleiding))' }}
                  />
                  <div>
                    <p className="font-semibold text-foreground">Groepsleiding</p>
                    <a href="mailto:groepsleiding@scoutssintjohannes.be" className="text-primary hover:underline">
                      groepsleiding@scoutssintjohannes.be
                    </a>
                  </div>
                </div>
              </div>

              {/* Rental Contact Section */}
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6">Lokalenverhuur</h3>
                <div className="flex items-center gap-4">
                  <HomeLogo
                    className="h-8 w-8 flex-shrink-0"
                    style={{ color: 'hsl(var(--primary))' }}
                  />
                  <div>
                    <p className="font-semibold text-foreground">Marlene Stuer</p>
                    <p className="text-muted-foreground">03/770.74.29</p>
                    <a href="mailto:lokaalverhuur@scoutssintjohannes.be" className="text-primary hover:underline">
                      lokaalverhuur@scoutssintjohannes.be
                    </a>
                  </div>
                </div>
              </div>

              {/* Division Emails Section */}
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6">Takken</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <KapoenenLogo
                      className="h-8 w-8 flex-shrink-0"
                      style={{ color: 'hsl(var(--kapoenen))' }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">Kapoenen</p>
                      <a href="mailto:kapoenen@scoutssintjohannes.be" className="text-primary hover:underline">
                        kapoenen@scoutssintjohannes.be
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <WoutersLogo
                      className="h-8 w-8 flex-shrink-0"
                      style={{ color: 'hsl(var(--wouters))' }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">Wouters</p>
                      <a href="mailto:wouters@scoutssintjohannes.be" className="text-primary hover:underline">
                        wouters@scoutssintjohannes.be
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <JonggiversLogo
                      className="h-8 w-8 flex-shrink-0"
                      style={{ color: 'hsl(var(--jonggivers))' }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">Jonggivers</p>
                      <a href="mailto:jonggivers@scoutssintjohannes.be" className="text-primary hover:underline">
                        jonggivers@scoutssintjohannes.be
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <GiversLogo
                      className="h-8 w-8 flex-shrink-0"
                      style={{ color: 'hsl(var(--givers))' }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">Givers</p>
                      <a href="mailto:givers@scoutssintjohannes.be" className="text-primary hover:underline">
                        givers@scoutssintjohannes.be
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <JinLogo
                      className="h-8 w-8 flex-shrink-0"
                      style={{ color: 'hsl(var(--jin))' }}
                    />
                    <div>
                      <p className="font-semibold text-foreground">Jin</p>
                      <a href="mailto:jin@scoutssintjohannes.be" className="text-primary hover:underline">
                        jin@scoutssintjohannes.be
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
} 