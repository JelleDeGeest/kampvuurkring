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

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

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
  params: { id: string }
}) {
  const leider = await fetchLeider(params.id);

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
                        <p className="text-xl text-muted-foreground">{leider.totem}</p>
                      </>
                    )}
                  </div>

                  {/* Contact Info - with visual separation */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start items-center md:items-start">
                    {leider.phoneNumber && (
                      <a
                        href={`tel:${leider.phoneNumber}`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {leider.phoneNumber}
                      </a>
                    )}
                    {leider.email && (
                      <a
                        href={`mailto:${leider.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {leider.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Descriptions - full width below */}
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                {/* General Description */}
                {leider.description && (
                  <div className="p-6 bg-background rounded-2xl border border-border shadow-sm">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Over {leider.name}</h2>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {leider.description}
                    </p>
                  </div>
                )}

                {/* Totem Description */}
                {leider.totemBeschrijving && (
                  <div className="p-6 bg-muted/10 rounded-2xl shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Totem Animal Image Placeholder */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted/50 border border-border shadow-sm">
                          {/* Placeholder for totem animal image */}
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11C12 11 16 13 16 17C16 19.2091 14.2091 21 12 21C9.79086 21 8 19.2091 8 17C8 13 12 11 12 11Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 20C5 20 6 19 6 17C6 15 5 14 5 14M19 20C19 20 18 19 18 17C18 15 19 14 19 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Totem Text Content */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground mb-3">Totem: {leider.totem}</h2>
                        <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {leider.totemBeschrijving}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}