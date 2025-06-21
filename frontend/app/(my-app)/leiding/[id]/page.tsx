import Header from "@/components/header"
import Image from "next/image"
import { notFound } from "next/navigation"

interface Leider {
  id: string
  name: string
  totem: string
  totemBeschrijving: string
  description: string
  phoneNumber: string
  email: string
  kapoenenNaam?: string
  wouterNaam?: string
  takken?: string[]
  image?: {
    url: string
  }
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

// Division data with colors and labels
const divisionData: Record<string, { label: string; color: string; icon: string; cssVar: string }> = {
  kapoenen: { label: 'Kapoenenleiding', color: 'hsl(var(--kapoenen))', cssVar: '--kapoenen', icon: '/logos/Kapoenen.svg' },
  wouters: { label: 'Wouterleiding', color: 'hsl(var(--wouters))', cssVar: '--wouters', icon: '/logos/Wouters.svg' },
  jonggivers: { label: 'Jonggiverleiding', color: 'hsl(var(--jonggivers))', cssVar: '--jonggivers', icon: '/logos/Jonggivers.svg' },
  givers: { label: 'Giverleiding', color: 'hsl(var(--givers))', cssVar: '--givers', icon: '/logos/Givers.svg' },
  jin: { label: 'Jinleiding', color: 'hsl(var(--jin))', cssVar: '--jin', icon: '/logos/Jin.svg' },
  groepsleiding: { label: 'Groepsleiding', color: 'hsl(var(--groepsleiding))', cssVar: '--groepsleiding', icon: '/logos/Groeps.svg' },
};

async function fetchLeider(id: string): Promise<Leider | null> {
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/leiders/${id}?depth=1`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function LeiderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const leider = await fetchLeider(resolvedParams.id);

  if (!leider) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container px-4 lg:px-12 pt-8">
          {/* Homepage-style banner with nature background */}
          <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-visible">
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
                    backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), linear-gradient(to bottom, #87CEEB, #5F9EA0, #2E8B57)`,
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
              {/* Nature gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-emerald-400 to-emerald-600"></div>
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/15" />
              
              {/* Optional: Add a pattern overlay for texture */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile section with overlapping card */}
        <section className="container px-4 lg:px-12 -mt-24 relative z-20 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
                {/* Profile Image - inside the card on the left */}
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-muted shadow-xl bg-muted">
                    {leider.image?.url ? (
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-3xl font-bold">
                          {leider.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name, Title and Contact Info - to the right of image */}
                <div className="flex-1">
                  {/* Name with Division badge inline */}
                  <div className="mb-4 text-center md:text-left">
                    {/* Show special name if in Kapoenen or Wouters */}
                    {(leider.takken?.includes('kapoenen') && leider.kapoenenNaam) || 
                     (leider.takken?.includes('wouters') && leider.wouterNaam) ? (
                      <>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            {leider.takken?.includes('kapoenen') && leider.kapoenenNaam 
                              ? leider.kapoenenNaam 
                              : leider.wouterNaam}
                          </h1>
                          {/* Division badges - subtle style */}
                          {leider.takken && leider.takken.length > 0 && (
                            <>
                              {leider.takken.filter(tak => tak !== 'gestopt').map((tak) => {
                                const division = divisionData[tak];
                                if (!division) return null;
                                
                                return (
                                  <div
                                    key={tak}
                                    className="flex items-center text-sm"
                                  >
                                    <div className="ml-3 mr-3 h-6 w-px bg-border" />
                                    <div className="w-8 h-8 relative">
                                      <div 
                                        className="absolute inset-0 rounded"
                                        style={{ 
                                          backgroundColor: division.color,
                                          maskImage: `url(${division.icon})`,
                                          maskSize: 'contain',
                                          maskRepeat: 'no-repeat',
                                          maskPosition: 'center',
                                          WebkitMaskImage: `url(${division.icon})`,
                                          WebkitMaskSize: 'contain',
                                          WebkitMaskRepeat: 'no-repeat',
                                          WebkitMaskPosition: 'center'
                                        }}
                                      />
                                    </div>
                                    <span className="ml-2 text-muted-foreground">{division.label}</span>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                        <p className="text-lg text-foreground/70">{leider.name}</p>
                        <p className="text-md text-muted-foreground">{leider.totem}</p>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            {leider.name}
                          </h1>
                          {/* Division badges - subtle style */}
                          {leider.takken && leider.takken.length > 0 && (
                            <>
                              {leider.takken.filter(tak => tak !== 'gestopt').map((tak) => {
                                const division = divisionData[tak];
                                if (!division) return null;
                                
                                return (
                                  <div
                                    key={tak}
                                    className="flex items-center text-sm"
                                  >
                                    <div className="ml-3 mr-3 h-6 w-px bg-border" />
                                    <div className="w-8 h-8 relative">
                                      <div 
                                        className="absolute inset-0 rounded"
                                        style={{ 
                                          backgroundColor: division.color,
                                          maskImage: `url(${division.icon})`,
                                          maskSize: 'contain',
                                          maskRepeat: 'no-repeat',
                                          maskPosition: 'center',
                                          WebkitMaskImage: `url(${division.icon})`,
                                          WebkitMaskSize: 'contain',
                                          WebkitMaskRepeat: 'no-repeat',
                                          WebkitMaskPosition: 'center'
                                        }}
                                      />
                                    </div>
                                    <span className="ml-2 text-muted-foreground">{division.label}</span>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                        <p className="text-md text-muted-foreground">{leider.totem}</p>
                      </>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 text-sm">
                    {leider.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Telefoon:</span>
                        <a 
                          href={`tel:${leider.phoneNumber}`}
                          className="text-primary hover:underline"
                        >
                          {leider.phoneNumber}
                        </a>
                      </div>
                    )}
                    {leider.email && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Email:</span>
                        <a 
                          href={`mailto:${leider.email}`}
                          className="text-primary hover:underline"
                        >
                          {leider.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {leider.description && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-3">Over {leider.name}</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">{leider.description}</p>
                  </div>
                </div>
              )}

              {/* Totem Description */}
              {leider.totemBeschrijving && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-3">Totem: {leider.totem}</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">{leider.totemBeschrijving}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'