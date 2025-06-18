import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"

interface Leider {
  id: string
  name: string
  totem: string
  kapoenenNaam?: string
  wouterNaam?: string
  image?: {
    url: string
  }
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
  const res = await fetch(
    // NOTE the added &depth=1
    `${PAYLOAD_URL}/api/leiders?where[takken][in]=${tak}&depth=1`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data.docs;
}

export default async function LeidingPage() {
  const kapoenenLeiders = await fetchLeidersByTak('kapoenen');
  const woutersLeiders  = await fetchLeidersByTak('wouters');
  const jonggiversLeiders = await fetchLeidersByTak('jonggivers');
  const giversLeiders   = await fetchLeidersByTak('givers');
  const jinLeiders      = await fetchLeidersByTak('jin');
  const groepsLeiders   = await fetchLeidersByTak('groepsleiding');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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
                      <Image
                        src={`${PAYLOAD_URL}${leider.image.url}`}
                        alt={leider.name}
                        width={160}
                        height={160}
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