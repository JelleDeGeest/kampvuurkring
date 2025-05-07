// app/info/page.tsx  (server component)
export const dynamic = 'force-dynamic'   // voorkom static caching

import Header            from '@/components/header'
import Image             from 'next/image'
import { draftMode }     from 'next/headers'
import getPayload        from '@/lib/getPayload'
import PreviewControls   from '@/components/PreviewControls'

interface Pillar {
  heading: string
  body:    string
}

export default async function InfoPage() {
  const { isEnabled: inDraftMode } = await draftMode()

  // ── Payload draft ophalen ──
  const payload = await getPayload()
  let data
  try {
    data = await payload.findGlobal({
      slug : 'infoPage',
      draft: inDraftMode,
    })
  } catch (error) {
    console.error('Error fetching info page data:', error)
    data = {
      title:   'Information Page',
      intro:   'Welcome to our information page.',
      pillars: [],
      heroImage: null,
    }
  }

  const title   = data?.title   ?? 'Information Page'
  const intro   = data?.intro   ?? 'Welcome to our information page.'
  const pillars = data?.pillars ?? []

  return (
    <>
      {/* universele banner + Refresh‑on‑save */}
      <PreviewControls />

      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1">
          <div className="container px-4 lg:px-12 py-8 md:py-12">
            <h1 className="text-4xl font-bold text-primary mb-8">{title}</h1>

            <div className="w-full h-1 bg-secondary mb-8" />

            <p className="prose-lg text-muted-foreground">{intro}</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p: Pillar) => (
                <section key={p.heading}>
                  <h2 className="text-2xl font-semibold text-primary mb-4">
                    {p.heading}
                  </h2>
                  <p className="text-muted-foreground">{p.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-lg overflow-hidden">
              {data?.heroImage ? (
                <Image
                  src={
                    typeof data.heroImage !== 'number'
                      ? data.heroImage.url || ''
                      : ''
                  }
                  alt="Hero"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              ) : (
                <div className="w-full h-64 bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Image placeholder</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}