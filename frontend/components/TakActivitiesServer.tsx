import getPayloadClient from '@/lib/getPayload'
import { Card } from '@/components/ui/card'
import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { draftMode } from 'next/headers'

interface TakActivitiesServerProps {
  tak: 'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jin'
  limit?: number
}

export async function TakActivitiesServer({ tak, limit = 10 }: TakActivitiesServerProps) {
  const { isEnabled } = await draftMode()
  const payload = await getPayloadClient()
  
  // Fetch activities for the specific tak
  const result = await payload.find({
    collection: 'activiteiten',
    where: {
      division: {
        contains: tak,
      },
    },
    sort: 'startDate',
    limit,
    draft: isEnabled,
    depth: 2, // Include related data
  })

  const activities = result.docs

  if (activities.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">
          Er zijn momenteel geen activiteiten gepland voor {tak}.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="p-6">
          <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(activity.startDate), 'd MMMM yyyy', { locale: nl })}
                {activity.endDate !== activity.startDate && 
                  ` - ${format(new Date(activity.endDate), 'd MMMM yyyy', { locale: nl })}`
                }
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="capitalize">{tak}</span>
            </div>
          </div>

          {/* Enrollment button if enabled */}
          {activity.enrollmentSettings?.enabled && (
            <div className="mt-4">
              {activity.enrollmentSettings.formPage ? (
                <a 
                  href={`/inschrijven/activiteiten/${activity.id}`}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Inschrijven
                </a>
              ) : activity.enrollmentSettings.enrollmentLink && (
                <a 
                  href={activity.enrollmentSettings.enrollmentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Inschrijven (externe link)
                </a>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// Example page component using the server component
export async function TakActivitiesPage({ tak }: { tak: string }) {
  // Validate tak parameter
  const validTakken = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'] as const
  if (!validTakken.includes(tak as any)) {
    return <div>Ongeldige tak</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Activiteiten voor {tak}
      </h1>
      
      <TakActivitiesServer tak={tak as any} limit={20} />
    </div>
  )
}