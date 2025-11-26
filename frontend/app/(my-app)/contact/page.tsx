import { Metadata } from 'next'
import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"
import { selectMediaVariantUrl, resolveMediaUrl } from "@/lib/mediaHelpers"
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import PageBanner from '@/components/PageBanner'
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
  banner?: (PayloadImage & { id: number | string })
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

  const bannerImageUrl = contactPageData?.banner
    ? selectMediaVariantUrl(contactPageData.banner, {
        sizePreference: ['lg', 'md', 'sm'],
        formatPreference: ['avif', 'webp', 'jpeg', 'jpg'],
        baseUrl: PAYLOAD_URL,
      }) ?? resolveMediaUrl(contactPageData.banner.url, PAYLOAD_URL)
    : undefined

  const resolvedBannerImageUrl =
    bannerImageUrl ?? resolveMediaUrl(contactPageData?.banner?.url, PAYLOAD_URL)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageBanner
        banner={contactPageData?.banner}
        title={contactPageData?.title || 'Contact'}
        subtitle={contactPageData?.subtitle || 'Neem contact met ons op voor vragen of meer informatie.'}
        resolvedBannerImageUrl={resolvedBannerImageUrl}
      />
      
      <main className="flex-1">
        <div className="container px-4 lg:px-12 pt-6 pb-12">
          <div className="grid gap-6 lg:grid-cols-[5fr_2fr]">
            
            {/* Left Half - Location Info and Map */}
            <div className="space-y-6 order-2 lg:order-1">
              
              {/* Location Header Card */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-2xl font-semibold text-primary">Onze Locatie</h3>
                <p className="text-base text-muted-foreground mt-1">
                  Scoutslokaal Den Tybaert, Tybaertstraat 1, 9170 Sint-Gillis-Waas
                </p>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="h-[520px] relative w-full">
                  <iframe
                    src="https://maps.google.com/maps?q=Tybaertstraat+1,+9170+Sint-Gillis-Waas,+Belgium&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0, minHeight: '520px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Scoutslokaal Den Tybaert Location"
                  />
                </div>
              </div>

            </div>

            {/* Right Half - Contact Information */}
            <div className="bg-white rounded-lg p-6 h-fit order-1 lg:order-2">
              <div className="space-y-6">
              
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
                <div>
                  <a href="/verhuur-lokaal" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Meer info over verhuur →
                  </a>
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
