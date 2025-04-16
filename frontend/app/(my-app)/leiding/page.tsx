import Header from "@/components/header"
import Image from "next/image"

export default function LeidingPage() {
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
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`kapoenen-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Vrolijke Eekhoorn</p>
                  </div>
                </div>
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
              {[1, 2, 3, 4].map((i) => (
                <div key={`wouters-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Wijze Uil</p>
                  </div>
                </div>
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`jonggivers-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Slimme Vos</p>
                  </div>
                </div>
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
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={`givers-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Dappere Beer</p>
                  </div>
                </div>
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
              {[1, 2].map((i) => (
                <div key={`jin-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Energieke Panda</p>
                  </div>
                </div>
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
              {[1, 2].map((i) => (
                <div key={`groepsleiding-${i}`} className="flex flex-col">
                  <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto">
                    <div className="absolute inset-0 bg-gray-300" />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold">Naam Leiding {i}</h3>
                    <p className="text-sm text-gray-600">Wijze Raadgever</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-border bg-background mt-12">
        <div className="w-full h-2 bg-secondary"></div>
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 text-center text-sm text-muted-foreground">
          // ... existing code ...
        </div>
      </footer>
    </div>
  )
}