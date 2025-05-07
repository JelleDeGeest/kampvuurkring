export const dynamic = 'force-dynamic'

import Header from '@/components/header'
import { EventCarousel } from '@/components/event-carousel'
import PreviewControls from '@/components/PreviewControls'
import ActivitiesSection from '@/components/ActivitiesSection.client'
import BelangrijkeDataBlock from '@/components/BelangrijkeDataBlock'

export default function Home() {
  return (
    <>
      <PreviewControls />

      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1">
          <section className="container px-4 lg:px-12 py-8">
            <EventCarousel />
          </section>

          <section className="container px-4 lg:px-12 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row gap-6">
              <ActivitiesSection />

              <div className="w-full lg:w-1/3">
                <BelangrijkeDataBlock />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}