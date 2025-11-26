import Image from "next/image"
import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"
import { resolveMediaUrl } from '@/lib/mediaHelpers'
import LeiderCard from "./LeiderCard.client"
import PageBanner from '@/components/PageBanner'

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

  const resolvedBannerImageUrl = resolveMediaUrl(
    leidersPageData?.banner?.url,
    PAYLOAD_URL,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <PageBanner
        banner={leidersPageData?.banner}
        title={leidersPageData?.title || 'Onze Leiding'}
        subtitle={leidersPageData?.subtitle || 'Ontmoet het team van Scouts Sint-Johannes'}
        resolvedBannerImageUrl={resolvedBannerImageUrl}
      />

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
                <LeiderCard key={`kapoenen-${leider.id}`} leider={leider} tak="kapoenen" />
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
                <LeiderCard key={`wouters-${leider.id}`} leider={leider} tak="wouters" />
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
                <LeiderCard key={`jonggivers-${leider.id}`} leider={leider} tak="other" />
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
                <LeiderCard key={`givers-${leider.id}`} leider={leider} tak="other" />
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
                <LeiderCard key={`jin-${leider.id}`} leider={leider} tak="other" />
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
                <LeiderCard key={`groepsleiding-${leider.id}`} leider={leider} tak="other" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
