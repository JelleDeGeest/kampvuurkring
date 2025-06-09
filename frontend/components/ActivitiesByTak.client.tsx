'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

interface Activity {
  id: string
  title: string
  division: string | string[]
  startDate: string
  endDate: string
  description?: { root: any }
  bannerImage?: any
}

interface ActivitiesByTakProps {
  tak: 'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jin'
}

export function ActivitiesByTak({ tak }: ActivitiesByTakProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/activiteiten/by-tak?tak=${tak}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }
        
        const data = await response.json()
        setActivities(data.docs || [])
      } catch (err) {
        console.error('Error fetching activities:', err)
        setError('Er is een fout opgetreden bij het laden van de activiteiten')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [tak])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </Card>
    )
  }

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
        <Card key={activity.id} className="p-6 hover:shadow-lg transition-shadow">
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

          {activity.description && (
            <div className="text-muted-foreground">
              {/* Here you would render the rich text description */}
              <p>Meer informatie beschikbaar...</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// Example usage component
export function TakActivitiesExample() {
  const [selectedTak, setSelectedTak] = useState<'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jin'>('kapoenen')

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Activiteiten per Tak</h1>
      
      {/* Tak selector */}
      <div className="flex gap-2 mb-6">
        {(['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'] as const).map((tak) => (
          <button
            key={tak}
            onClick={() => setSelectedTak(tak)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              selectedTak === tak 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tak}
          </button>
        ))}
      </div>

      {/* Activities list */}
      <ActivitiesByTak tak={selectedTak} />
    </div>
  )
}