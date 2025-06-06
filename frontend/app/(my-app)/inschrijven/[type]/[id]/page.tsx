import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import getPayloadClient from '@/lib/getPayload'
import { LexicalRenderer } from '@/components/LexicalRenderer'
import PreviewControls from '@/components/PreviewControls'
import { DynamicForm } from '@/components/DynamicForm'
import Header from '@/components/header'
import Footer from '@/app/(my-app)/components/Footer'

// Banner component for enrollment pages (smaller than homepage carousel)
function EnrollmentBanner({ bannerImage, title }: { bannerImage: any, title: string }) {
  // Handle both populated media objects and simple IDs
  const imageUrl = typeof bannerImage === 'object' && bannerImage?.url 
    ? bannerImage.url 
    : typeof bannerImage === 'string' 
    ? bannerImage 
    : null;

  if (!imageUrl) return null;

  return (
    <div className="relative w-full h-[200px] md:h-[250px] rounded-2xl overflow-hidden mb-8">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute bottom-4 left-4 md:left-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  )
}

interface Props {
  params: {
    type: 'activiteiten' | 'weekends' | 'kampen'
    id: string
  }
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
    depth: 2, // Increased depth to fetch media relations
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
        <Header />
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
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Inschrijvingen gesloten</h1>
              <p className="text-lg">De inschrijvingen voor {item.title} zijn helaas gesloten.</p>
            </div>
          </main>
          <Footer />
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
      customMessage: item.enrollmentSettings.customMessage || 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.',
      enrollmentDeadline: item.enrollmentSettings.enrollmentDeadline,
      closed: item.enrollmentSettings.closed,
      closedMessage: item.enrollmentSettings.closedMessage,
    },
    paymentSettings: {
      isPaid: item.enrollmentSettings.isPaid || false,
      pricePerChild: item.enrollmentSettings.pricePerChild,
      paymentInstructions: item.enrollmentSettings.paymentInstructions,
    },
    infoDocument: item.enrollmentSettings.infoDocument ? {
      id: item.enrollmentSettings.infoDocument.id,
      url: item.enrollmentSettings.infoDocument.url,
      filename: item.enrollmentSettings.infoDocument.filename,
    } : undefined,
    customQuestions: item.enrollmentSettings.customQuestions || [],
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PreviewControls />
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Banner Display for weekends/camps */}
          {hasBanner && (
            <EnrollmentBanner bannerImage={item.bannerImage} title={item.title} />
          )}
          
          <div className="text-center mb-6">
            {/* Only show title if no banner */}
            {!hasBanner && (
              <h1 className="text-4xl font-bold text-primary mb-4">{formPage.title}</h1>
            )}
            
            {/* Target Information - inline display */}
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              {item.division && (
                <div>
                  <span className="font-medium">Tak(ken):</span> {Array.isArray(item.division) ? item.division.join(', ') : item.division}
                </div>
              )}
              {item.startDate && (
                <div>
                  <span className="font-medium">Start:</span> {new Date(item.startDate).toLocaleDateString('nl-BE')}
                </div>
              )}
              {item.endDate && item.endDate !== item.startDate && (
                <div>
                  <span className="font-medium">Eind:</span> {new Date(item.endDate).toLocaleDateString('nl-BE')}
                </div>
              )}
            </div>
          </div>

          {/* Description if available */}
          {item.description && (
            <div className="prose max-w-none mb-8 text-center">
              <div className="max-w-3xl mx-auto">
                <LexicalRenderer content={item.description} />
              </div>
            </div>
          )}

          {/* Enrollment Form */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Inschrijfformulier</h2>
            <DynamicForm formPage={formPage} />
          </div>
        </div>
      </main>
    </div>
  )
}