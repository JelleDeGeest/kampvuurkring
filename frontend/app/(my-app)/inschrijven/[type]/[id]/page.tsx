import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import getPayloadClient from '@/lib/getPayload'
import { LexicalRenderer } from '@/components/LexicalRenderer'
import PreviewControls from '@/components/PreviewControls'
import { DynamicForm } from '@/components/DynamicForm'

import RefreshOnSave from '@/components/RefreshOnSave'
import PreviewSwitcher from '@/components/PreviewSwitcher'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PayloadRichText } from '@/components/PayloadRichText'
import { EnrollmentPageClient } from '@/components/EnrollmentPageClient'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'
import { resolveMediaUrl } from '@/lib/mediaHelpers'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface Props {
  params: Promise<{
    type: 'activiteiten' | 'weekends' | 'kampen'
    id: string
  }>
}

const typeLabels = {
  activiteiten: 'Activiteit',
  weekends: 'Weekend',
  kampen: 'Kamp'
}

export default async function EnrollmentPage({ params }: Props) {
  const resolvedParams = await params
  const { isEnabled: inDraftMode } = await draftMode()
  const payload = await getPayloadClient()

  // Validate type
  if (!['activiteiten', 'weekends', 'kampen'].includes(resolvedParams.type)) {
    return notFound()
  }

  // Map URL type to collection name
  const collectionMap = {
    'activiteiten': 'activiteiten',
    'weekends': 'weekends',
    'kampen': 'camps'
  }
  const collectionName = collectionMap[resolvedParams.type]

  // Fetch the target item
  const result = await payload.find({
    collection: collectionName as any,
    where: {
      id: {
        equals: resolvedParams.id,
      },
    },
    depth: 3, // Increased depth to ensure full media population
    draft: inDraftMode,
  })

  if (!result.docs.length) {
    return notFound()
  }

  const item = result.docs[0]

  // Check if this is a weekend or camp that might have a banner
  const hasBanner = (resolvedParams.type === 'weekends' || resolvedParams.type === 'kampen') && item.bannerImage;

  // Check if enrollments are enabled
  if (!item.enrollmentSettings?.enabled) {
    return notFound()
  }

  // Check if enrollments are manually closed
  if (item.enrollmentSettings.closed) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PreviewControls />
        {inDraftMode && (
          <>
            <RefreshOnSave />
            <PreviewSwitcher />
          </>
        )}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Inschrijvingen gesloten</h1>
            <p className="text-lg">
              {item.enrollmentSettings.closedMessage || 'De inschrijvingen voor deze activiteit zijn helaas gesloten.'}
            </p>
          </div>
        </main>
      </div>
    )
  }

  // Check enrollment deadline
  if (item.enrollmentSettings.enrollmentDeadline) {
    const deadline = new Date(item.enrollmentSettings.enrollmentDeadline)
    if (deadline < new Date()) {
      return (
        <div className="flex min-h-screen flex-col bg-background">
          <PreviewControls />
          {inDraftMode && (
            <>
              <RefreshOnSave />
              <PreviewSwitcher />
            </>
          )}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Inschrijvingen gesloten</h1>
              <p className="text-lg">De inschrijvingen voor {item.title} zijn helaas gesloten.</p>
            </div>
          </main>

        </div>
      )
    }
  }

  // Create form page data from the item
  const formPage = {
    id: item.id,
    slug: `${collectionName}-${item.id}`,
    title: `Inschrijving ${item.title}`,
    targetType: collectionName,
    target: item,
    formSettings: {
      allowMultipleChildren: true, // Always allow multiple children
      customMessage: (item.enrollmentSettings?.customMessage && item.enrollmentSettings.customMessage !== 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.')
        ? item.enrollmentSettings.customMessage
        : 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.',
      enrollmentDeadline: item.enrollmentSettings.enrollmentDeadline,
      closed: item.enrollmentSettings.closed,
      closedMessage: item.enrollmentSettings.closedMessage,
    },
    paymentSettings: {
      isPaid: item.enrollmentSettings.isPaid || false,
      pricePerChild: item.enrollmentSettings.pricePerChild,
      paymentInstructions: item.enrollmentSettings.paymentInstructions,
    },
    infoDocument: item.enrollmentSettings.infoDocument
      ? (typeof item.enrollmentSettings.infoDocument === 'object'
        ? {
          id: item.enrollmentSettings.infoDocument.id,
          url: resolveMediaUrl(item.enrollmentSettings.infoDocument.url, PAYLOAD_URL),
          filename: item.enrollmentSettings.infoDocument.filename,
        }
        : undefined)
      : undefined,
    customQuestions: item.enrollmentSettings.customQuestions || [],
  }

  // Resolve banner image URL
  const resolvedBannerImageUrl = item.bannerImage
    ? resolveMediaUrl(
      typeof item.bannerImage === 'object' && item.bannerImage?.url
        ? item.bannerImage.url
        : typeof item.bannerImage === 'string'
          ? item.bannerImage
          : undefined,
      PAYLOAD_URL
    )
    : undefined

  // Create subtitle based on type
  const bannerSubtitle = `${typeLabels[resolvedParams.type]}${item.division ? ` - ${Array.isArray(item.division) ? item.division.join(', ') : item.division}` : ''}`

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PreviewControls />
      {inDraftMode && (
        <>
          <RefreshOnSave />
          <PreviewSwitcher />
        </>
      )}

      {/* Banner for weekends/camps */}
      {hasBanner && (
        <PageBanner
          banner={item.bannerImage}
          title={item.title}
          subtitle={bannerSubtitle}
          resolvedBannerImageUrl={resolvedBannerImageUrl}
        />
      )}

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Only show title if no banner */}
          {!hasBanner && (
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">{formPage.title}</h1>
          )}

          {/* Info Document Button - Centered */}

          <div className="relative mb-24">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl -z-10 rounded-3xl" />
            <DynamicForm formPage={formPage} />
          </div>
        </div>
      </main>


    </div>
  )
}
