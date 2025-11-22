export const dynamic = 'force-dynamic'

import { draftMode } from 'next/headers'
import { EventCarousel } from '@/components/event-carousel'
import PreviewControls from '@/components/PreviewControls'
import SectionToggle from '@/components/SectionToggle.client'
import RefreshOnSave from '@/components/RefreshOnSave'
import PreviewSwitcher from '@/components/PreviewSwitcher'
import PreviewSessionManager from '@/components/PreviewSessionManager'
import { DraftModeProvider } from '@/components/DraftModeProvider'
import { ImportantDatesProvider } from '@/hooks/ImportantDatesContext'

export default async function Home() {
  const { isEnabled: inDraftMode } = await draftMode()

  return (
    <>
      <PreviewControls />
      {inDraftMode && (
        <>
          <RefreshOnSave />
          <PreviewSwitcher />
          <PreviewSessionManager />
        </>
      )}

      <DraftModeProvider isDraftMode={inDraftMode}>
        <ImportantDatesProvider>
          <main className="flex-1">
            <section className="container px-4 lg:px-12 pt-8">
              <EventCarousel />
            </section>

            <section className="container px-4 lg:px-12 py-6 md:py-8">
              <SectionToggle />
            </section>
          </main>
        </ImportantDatesProvider>
      </DraftModeProvider>
    </>
  )
}