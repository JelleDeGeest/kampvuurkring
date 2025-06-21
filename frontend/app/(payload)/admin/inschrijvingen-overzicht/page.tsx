import { notFound } from 'next/navigation'
import getPayloadClient from '@/lib/getPayload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function EnrollmentResponsesPage() {
  const payload = await getPayloadClient()

  try {
    const enrollments = await payload.find({
      collection: 'enrollments',
      limit: 200,
      sort: '-createdAt',
    })

    // Get summary stats
    const totalResponses = enrollments.docs.length
    const totalChildren = enrollments.docs.reduce((sum: number, enrollment: any) => 
      sum + (enrollment.numberOfChildren || 0), 0
    )
    const statusCounts = enrollments.docs.reduce((acc: any, enrollment: any) => {
      acc[enrollment.status] = (acc[enrollment.status] || 0) + 1
      return acc
    }, {})

    return (
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inschrijvingen Overzicht</h1>
          <p className="text-gray-600">Google Forms-stijl overzicht van alle inschrijvingen</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{totalResponses}</div>
              <p className="text-sm text-gray-600">Totaal inschrijvingen</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{totalChildren}</div>
              <p className="text-sm text-gray-600">Totaal kinderen</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{statusCounts.pending || 0}</div>
              <p className="text-sm text-gray-600">In afwachting</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-600">{statusCounts.confirmed || 0}</div>
              <p className="text-sm text-gray-600">Bevestigd</p>
            </CardContent>
          </Card>
        </div>

        {/* Responses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Alle Inschrijvingen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-700">Tijdstempel</th>
                    <th className="text-left p-3 font-medium text-gray-700">Email</th>
                    <th className="text-left p-3 font-medium text-gray-700">Activiteit</th>
                    <th className="text-left p-3 font-medium text-gray-700">Kinderen</th>
                    <th className="text-left p-3 font-medium text-gray-700">Opmerkingen</th>
                    <th className="text-left p-3 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.docs.map((enrollment: any, index: number) => (
                    <tr key={enrollment.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                      <td className="p-3 text-sm text-gray-600">
                        {new Date(enrollment.createdAt).toLocaleString('nl-BE', {
                          day: '2-digit',
                          month: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="p-3 text-sm">
                        <div className="font-medium">{enrollment.participantEmail}</div>
                      </td>
                      <td className="p-3 text-sm">
                        <div className="font-medium">{enrollment.targetTitle}</div>
                        <div className="text-gray-500 capitalize">{enrollment.targetType}</div>
                      </td>
                      <td className="p-3 text-sm">
                        <div className="space-y-1">
                          {enrollment.children?.map((child: any, childIndex: number) => (
                            <div key={childIndex} className="text-sm">
                              {child.participantInfo.firstName} {child.participantInfo.lastName}
                            </div>
                          ))}
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {enrollment.numberOfChildren} {enrollment.numberOfChildren === 1 ? 'kind' : 'kinderen'}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm max-w-xs">
                        {enrollment.additionalOptions?.comments ? (
                          <div className="truncate" title={enrollment.additionalOptions.comments}>
                            {enrollment.additionalOptions.comments}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Geen opmerkingen</span>
                        )}
                        
                        {enrollment.additionalOptions?.customAnswers && Object.keys(enrollment.additionalOptions.customAnswers).length > 0 && (
                          <div className="mt-2 text-xs">
                            <Badge variant="secondary">
                              {Object.keys(enrollment.additionalOptions.customAnswers).length} extra antwoorden
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={
                            enrollment.status === 'confirmed' ? 'default' :
                            enrollment.status === 'pending' ? 'secondary' :
                            enrollment.status === 'paid' ? 'default' :
                            'destructive'
                          }
                          className={
                            enrollment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            enrollment.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {enrollment.status === 'pending' ? 'In afwachting' :
                           enrollment.status === 'confirmed' ? 'Bevestigd' :
                           enrollment.status === 'paid' ? 'Betaald' :
                           enrollment.status === 'cancelled' ? 'Geannuleerd' :
                           enrollment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {enrollments.docs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">📋</div>
                <p className="text-gray-500">Nog geen inschrijvingen ontvangen.</p>
                <p className="text-sm text-gray-400 mt-1">Inschrijvingen zullen hier verschijnen zodra ze worden ingediend.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return notFound()
  }
}