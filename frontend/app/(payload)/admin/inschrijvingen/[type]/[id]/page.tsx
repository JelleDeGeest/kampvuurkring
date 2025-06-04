import { notFound } from 'next/navigation'
import getPayloadClient from '@/lib/getPayload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, UsersIcon, MailIcon, MessageSquareIcon } from 'lucide-react'
import { EnrollmentTable } from '@/components/EnrollmentTable'

interface Props {
  params: {
    type: 'activiteiten' | 'weekends' | 'camps'
    id: string
  }
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

    // Calculate statistics
    const totalResponses = enrollments.docs.length
    const totalChildren = enrollments.docs.reduce((sum: number, enrollment: any) => 
      sum + (enrollment.numberOfChildren || 0), 0
    )
    const paidCount = enrollments.docs.filter((enrollment: any) => enrollment.status === 'paid').length
    const pendingCount = enrollments.docs.filter((enrollment: any) => enrollment.status === 'pending').length

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
        backgroundColor: '#f9fafb', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px' 
        }}>

          {/* Report Header */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#111827', 
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                Inschrijvingsrapport
              </h1>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                {target.title}
              </h2>
              <p style={{ color: '#4b5563', margin: '0' }}>
                {typeLabels[resolvedParams.type]} • Gegenereerd op {new Date().toLocaleDateString('nl-BE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            {/* Activity Information */}
            <div style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '24px'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>
                Activiteit Details
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                fontSize: '0.875rem'
              }}>
                {target.startDate && (
                  <div>
                    <span style={{ fontWeight: '500', color: '#374151' }}>Start:</span>
                    <div style={{ color: '#111827', marginTop: '4px' }}>
                      {new Date(target.startDate).toLocaleDateString('nl-BE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}
                {target.endDate && target.endDate !== target.startDate && (
                  <div>
                    <span style={{ fontWeight: '500', color: '#374151' }}>Einde:</span>
                    <div style={{ color: '#111827', marginTop: '4px' }}>
                      {new Date(target.endDate).toLocaleDateString('nl-BE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}
                {target.division && (
                  <div>
                    <span style={{ fontWeight: '500', color: '#374151' }}>Tak(ken):</span>
                    <div style={{ 
                      color: '#111827', 
                      marginTop: '4px',
                      textTransform: 'capitalize'
                    }}>
                      {Array.isArray(target.division) ? target.division.join(', ') : target.division}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Samenvatting
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              textAlign: 'center'
            }}>
              <div style={{ borderRight: '1px solid #e5e7eb', paddingRight: '32px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '4px'
                }}>{totalChildren}</div>
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>Totaal Deelnemers</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>kinderen</div>
              </div>
              <div style={{ borderRight: '1px solid #e5e7eb', paddingRight: '32px' }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#d97706',
                  marginBottom: '4px'
                }}>{pendingCount}</div>
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>Niet Betaald</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>openstaand</div>
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#10b981',
                  marginBottom: '4px'
                }}>{paidCount}</div>
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>Betaald</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>voltooid</div>
              </div>
            </div>
          </div>

          {/* Enrollments Table */}
          <EnrollmentTable 
            enrollments={enrollments.docs}
            totalResponses={totalResponses}
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