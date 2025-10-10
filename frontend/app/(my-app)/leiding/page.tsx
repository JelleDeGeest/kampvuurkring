import Image from "next/image"
import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"
import Link from "next/link"

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

interface Leider {
  id: string
  name: string
  totem: string
  kapoenenNaam?: string
  wouterNaam?: string
  image?: PayloadImage
}

interface LeidersPageGlobal {
  title: string
  subtitle: string
  banner?: (PayloadImage & { id: string })
}

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

// Helper component to display leader names based on their tak
function LeiderNameDisplay({ leider, tak }: { leider: Leider; tak: string }) {
  const displayName = tak === 'kapoenen' && leider.kapoenenNaam 
    ? leider.kapoenenNaam 
    : tak === 'wouters' && leider.wouterNaam 
    ? leider.wouterNaam 
    : null;

  if (displayName) {
    return (
      <>
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-200">{displayName}</h3>
        <p className="text-sm text-gray-600">{leider.name}</p>
        <p className="text-xs text-gray-500">{leider.totem}</p>
      </>
    );
  }

  return (
    <>
      <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">{leider.name}</h3>
      <p className="text-sm text-gray-600">{leider.totem}</p>
    </>
  );
}

async function fetchLeidersByTak(tak: string) {
  try {
    const res = await fetch(
      // NOTE the added &depth=1
      `${PAYLOAD_URL}/api/leiders?where[takken][in]=${tak}&depth=1`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.warn(`Error fetching leiders for ${tak}:`, error);
    return [];
  }
}

async function fetchLeidersPageGlobal(): Promise<LeidersPageGlobal | null> {
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/globals/leidersPage?depth=1`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.warn('Error fetching leiders page global:', error);
    return null;
  }
}

export default async function LeidingPage() {
  const [
    leidersPageData,
    kapoenenLeiders,
    woutersLeiders,
    jonggiversLeiders,
    giversLeiders,
    jinLeiders,
    groepsLeiders
  ] = await Promise.all([
    fetchLeidersPageGlobal(),
    fetchLeidersByTak('kapoenen'),
    fetchLeidersByTak('wouters'),
    fetchLeidersByTak('jonggivers'),
    fetchLeidersByTak('givers'),
    fetchLeidersByTak('jin'),
    fetchLeidersByTak('groepsleiding')
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Banner Section */}
      {leidersPageData?.banner ? (
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
                    backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${PAYLOAD_URL}${leidersPageData.banner.url})`,
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
                <ResponsiveImage
                  media={leidersPageData.banner}
                  alt={leidersPageData.banner.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Banner title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                    {leidersPageData.title}
                  </h1>
                  <p className="text-lg md:text-xl drop-shadow-lg">
                    {leidersPageData.subtitle}
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
              {leidersPageData?.title || 'Onze Leiding'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {leidersPageData?.subtitle || 'Ontmoet het team van Scouts Sint-Johannes'}
            </p>
          </div>
        </section>
      )}
      
      <main className="flex-1">
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-8 md:pb-12">
          {/* Kapoenen Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--kapoenen))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Kapoenen.svg"
                  alt="Kapoenen Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Kapoenen
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {kapoenenLeiders.map((leider: Leider) => (
                <Link key={`kapoenen-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="kapoenen" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Wouters Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--wouters))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Wouters.svg"
                  alt="Wouters Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Wouters
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {woutersLeiders.map((leider: Leider) => (
                <Link key={`wouters-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="wouters" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Jonggivers Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--jonggivers))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Jonggivers.svg"
                  alt="Jonggivers Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Jonggivers
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {jonggiversLeiders.map((leider: Leider) => (
                <Link key={`jonggivers-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="other" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Givers Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--givers))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Givers.svg"
                  alt="Givers Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Givers
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {giversLeiders.map((leider: Leider) => (
                <Link key={`givers-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="other" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Jin Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--jin))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Jin.svg"
                  alt="Jin Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Jin
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {jinLeiders.map((leider: Leider) => (
                <Link key={`jin-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="other" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Groepsleiding Section */}
          <div className="flex mb-8 rounded-2xl overflow-hidden shadow-sm">
            <div className="w-12 bg-[hsl(var(--groepsleiding))] flex flex-col items-center p-2">
              <div className="w-9 h-9 relative mb-4">
                <Image
                  src="/logos/Groeps.svg"
                  alt="Groepsleiding Logo"
                  fill
                  className="invert"
                />
              </div>
              <span className="text-white font-bold" style={{ writingMode: 'vertical-lr' }}>
                Groepsleiding
              </span>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 bg-white">
              {groepsLeiders.map((leider: Leider) => (
                <Link key={`groepsleiding-${leider.id}`} href={`/leiding/${leider.id}`} className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
                    {leider.image?.url ? (
                      <ResponsiveImage
                        media={leider.image}
                        alt={leider.name}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 45vw, 160px"
                        className="object-cover group-hover:brightness-110 transition-all duration-200"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </div>
                  <div className="mt-2 text-center">
                    <LeiderNameDisplay leider={leider} tak="other" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}