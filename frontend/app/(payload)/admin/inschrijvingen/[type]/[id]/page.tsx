import { notFound } from 'next/navigation'
import getPayloadClient from '@/lib/getPayload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EnrollmentPageClient } from '@/components/EnrollmentPageClient'

interface Props {
  params: Promise<{
    type: 'activiteiten' | 'weekends' | 'camps'
    id: string
  }>
}

const typeLabels = {
  activiteiten: 'Activiteit',
  weekends: 'Weekend',
  camps: 'Kamp'
}

const collectionMap = {
  'activiteiten': 'activiteiten',
  'weekends': 'weekends',
  'camps': 'camps'
}

export default async function ActivityEnrollmentResponsesPage({ params }: Props) {
  const resolvedParams = await params
  const payload = await getPayloadClient()

  if (!['activiteiten', 'weekends', 'camps'].includes(resolvedParams.type)) {
    return notFound()
  }

  const collectionName = collectionMap[resolvedParams.type]

  try {
    // Fetch the activity/weekend/camp
    const targetResult = await payload.find({
      collection: collectionName as any,
      where: {
        id: {
          equals: resolvedParams.id,
        },
      },
      depth: 1,
    })

    if (!targetResult.docs.length) {
      return notFound()
    }

    const target = targetResult.docs[0]

    // Check if enrollments are enabled
    if (!target.enrollmentSettings?.enabled) {
      return (
        <div className="p-6 max-w-4xl mx-auto">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="text-orange-600 text-lg font-medium mb-2">
                Inschrijvingen niet ingeschakeld
              </div>
              <p className="text-orange-700">
                Voor "{target.title}" zijn geen inschrijvingen ingeschakeld.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    }

    // Fetch enrollments for this specific target
    const enrollments = await payload.find({
      collection: 'enrollments',
      where: {
        targetType: {
          equals: resolvedParams.type,
        },
        targetId: {
          equals: resolvedParams.id,
        },
      },
      limit: 200,
      sort: '-createdAt',
    })

    // Calculate statistics - moved to client component for dynamic updates

    // Get unique custom questions across all responses
    const allCustomQuestions = new Set<string>()
    enrollments.docs.forEach((enrollment: any) => {
      if (enrollment.additionalOptions?.customAnswers) {
        Object.keys(enrollment.additionalOptions.customAnswers).forEach(question => {
          allCustomQuestions.add(question)
        })
      }
    })
    const customQuestionsArray = Array.from(allCustomQuestions)

    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'hsl(90, 6%, 97%)', // --background from theme
        fontFamily: 'var(--font-heading), system-ui, -apple-system, sans-serif' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px' 
        }}>
          <EnrollmentPageClient 
            enrollments={enrollments.docs}
            target={target}
            resolvedParams={resolvedParams}
            customQuestionsArray={customQuestionsArray}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching enrollment responses:', error)
    return notFound()
  }
}