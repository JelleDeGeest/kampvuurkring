import { notFound } from 'next/navigation'
import getPayloadClient from '@/lib/getPayload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function EnrollmentsPage() {
  const payload = await getPayloadClient()

  try {
    const enrollments = await payload.find({
      collection: 'enrollments',
      limit: 100,
      sort: '-createdAt',
    })

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Inschrijvingen Overzicht</h1>
        
        <div className="grid gap-4">
          {enrollments.docs.map((enrollment: any) => (
            <Card key={enrollment.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{enrollment.targetTitle}</span>
                  <span className="text-sm font-normal text-gray-500">
                    {enrollment.targetType} • {enrollment.numberOfChildren} {enrollment.numberOfChildren === 1 ? 'kind' : 'kinderen'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Email:</strong> {enrollment.participantEmail}</p>
                    <p><strong>Status:</strong> {enrollment.status}</p>
                    <p><strong>Ingediend:</strong> {new Date(enrollment.createdAt).toLocaleDateString('nl-BE')}</p>
                  </div>
                  <div>
                    <p><strong>Kinderen:</strong></p>
                    <ul className="list-disc list-inside ml-4">
                      {enrollment.children?.map((child: any, index: number) => (
                        <li key={index}>
                          {child.participantInfo.firstName} {child.participantInfo.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {enrollment.additionalOptions?.comments && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p><strong>Opmerkingen:</strong></p>
                    <p className="mt-1">{enrollment.additionalOptions.comments}</p>
                  </div>
                )}
                
                {enrollment.additionalOptions?.customAnswers && Object.keys(enrollment.additionalOptions.customAnswers).length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p><strong>Extra vragen:</strong></p>
                    {Object.entries(enrollment.additionalOptions.customAnswers).map(([question, answer]) => (
                      <div key={question} className="mt-2">
                        <p className="font-medium">{question}</p>
                        <p className="text-gray-700">{answer as string}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {enrollments.docs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nog geen inschrijvingen ontvangen.</p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return notFound()
  }
}