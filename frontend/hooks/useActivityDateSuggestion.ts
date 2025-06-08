import { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

interface ActivitySuggestion {
  startDate: Date | null
  endDate: Date | null
}

export const useActivityDateSuggestion = () => {
  const [suggestion, setSuggestion] = useState<ActivitySuggestion>({
    startDate: null,
    endDate: null,
  })
  const [loading, setLoading] = useState(false)

  const { fields, dispatchFields } = useFormFields(([fields, dispatch]) => ({
    fields,
    dispatchFields: dispatch,
  }))

  const division = fields?.division?.value
  const title = fields?.title?.value

  useEffect(() => {
    const fetchSuggestion = async () => {
      // Only fetch if we have both title and division selected
      if (!title || !division || (Array.isArray(division) && division.length === 0)) {
        return
      }

      setLoading(true)
      try {
        // Get the first selected tak if multiple are selected
        const selectedDivision = Array.isArray(division) ? division[0] : division

        console.log('Fetching activities for division:', selectedDivision)
        
        // Use the by-tak API endpoint
        const response = await fetch(`/api/activiteiten/by-tak?tak=${encodeURIComponent(selectedDivision)}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Activities response:', data)
        
        // Get all activities for this tak
        const activities = data?.docs || []

        if (activities.length > 0) {
          // Get the activity with the furthest future date to understand the current pattern
          const today = new Date()
          const futureActivities = activities.filter((activity: any) => 
            new Date(activity.startDate) > today
          )
          
          let patternActivity
          if (futureActivities.length > 0) {
            // Use the furthest future activity to get the current pattern
            patternActivity = futureActivities.sort((a: any, b: any) => 
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )[0]
          } else {
            // Fallback to most recent past activity if no future activities
            patternActivity = activities.sort((a: any, b: any) => 
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )[0]
          }
          
          const lastStartDate = new Date(patternActivity.startDate)
          const lastEndDate = new Date(patternActivity.endDate)

          // Calculate the day of the week and time
          const dayOfWeek = lastStartDate.getDay()
          const startHours = lastStartDate.getHours()
          const startMinutes = lastStartDate.getMinutes()
          const endHours = lastEndDate.getHours()
          const endMinutes = lastEndDate.getMinutes()

          // Find the next available week for this specific day/time pattern
          // Start from the week AFTER the furthest future activity
          let nextDate = new Date(lastStartDate)
          nextDate.setDate(nextDate.getDate() + 7) // Move to the next week after the pattern activity

          // If this date is in the past, move to the next occurrence of this day from today
          if (nextDate <= today) {
            nextDate = new Date(today)
            const daysUntilTarget = (dayOfWeek - today.getDay() + 7) % 7
            if (daysUntilTarget === 0) {
              // If it's the same day of the week, check if it's already past the time
              const todayWithTargetTime = new Date(today)
              todayWithTargetTime.setHours(startHours, startMinutes, 0, 0)
              
              if (today >= todayWithTargetTime) {
                // Time has passed today, move to next week
                nextDate.setDate(today.getDate() + 7)
              }
              // Otherwise use today
            } else {
              nextDate.setDate(today.getDate() + daysUntilTarget)
            }
          }

          // Check if this specific day/time pattern has an available slot
          let foundAvailableDate = false
          let attempts = 0
          const maxAttempts = 52 // Check up to a year ahead

          while (!foundAvailableDate && attempts < maxAttempts) {
            const dateToCheck = new Date(nextDate)
            dateToCheck.setHours(0, 0, 0, 0)

            // Check if ANY activity exists on this specific date for this tak
            const hasActivity = activities.some(activity => {
              const activityDate = new Date(activity.startDate)
              activityDate.setHours(0, 0, 0, 0)
              return activityDate.getTime() === dateToCheck.getTime()
            })

            if (!hasActivity) {
              foundAvailableDate = true
            } else {
              // Move to the same day next week
              nextDate.setDate(nextDate.getDate() + 7)
              attempts++
            }
          }

          // Set the suggested times
          const suggestedStartDate = new Date(nextDate)
          suggestedStartDate.setHours(startHours, startMinutes, 0, 0)

          const suggestedEndDate = new Date(nextDate)
          suggestedEndDate.setHours(endHours, endMinutes, 0, 0)

          setSuggestion({
            startDate: suggestedStartDate,
            endDate: suggestedEndDate,
          })
        }
      } catch (error) {
        console.error('Error fetching activity suggestion:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestion()
  }, [title, division])

  const applySuggestion = () => {
    if (suggestion.startDate && suggestion.endDate) {
      dispatchFields({
        type: 'UPDATE',
        path: 'startDate',
        value: suggestion.startDate.toISOString(),
      })
      dispatchFields({
        type: 'UPDATE',
        path: 'endDate',
        value: suggestion.endDate.toISOString(),
      })
    }
  }

  return {
    suggestion,
    loading,
    applySuggestion,
  }
}