import { useState, useEffect } from 'react'
import { useDraftMode } from '@/components/DraftModeProvider'

interface Activity {
  id: string
  title: string
  division: string | string[]
  startDate: string
  endDate: string
  description?: { root: any }
  bannerImage?: any
  enrollmentSettings?: {
    enabled?: boolean
    enrollmentLink?: string
    formPage?: string | number
  }
}

interface UseActivitiesByTakOptions {
  tak: string
  limit?: number
  sort?: string
}

export function useActivitiesByTak({ tak, limit = 10, sort = 'startDate' }: UseActivitiesByTakOptions) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isDraftMode } = useDraftMode()

  useEffect(() => {
    const controller = new AbortController()
    
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Build the query parameters
        const params = new URLSearchParams({
          sort,
          limit: limit.toString(),
          // Using the where query format for Payload CMS REST API
          'where[division][contains]': tak,
        })
        
        if (isDraftMode) {
          params.append('draft', 'true')
        }
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}/api/activiteiten?${params.toString()}`,
          {
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'include', // Include cookies for draft mode
          }
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setActivities(data.docs || [])
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching activities by tak:', err)
          setError('Failed to fetch activities')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()

    return () => {
      controller.abort()
    }
  }, [tak, limit, sort, isDraftMode])

  return { activities, loading, error }
}

// Example usage in a component:
/*
import { useActivitiesByTak } from '@/hooks/useActivitiesByTak'

function KapoenenActivities() {
  const { activities, loading, error } = useActivitiesByTak({ 
    tak: 'kapoenen',
    limit: 5,
    sort: '-startDate' // Sort by most recent first
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>
          <h3>{activity.title}</h3>
          <p>{new Date(activity.startDate).toLocaleDateString('nl-BE')}</p>
        </div>
      ))}
    </div>
  )
}
*/