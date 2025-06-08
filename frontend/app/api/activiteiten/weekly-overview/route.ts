import { NextRequest, NextResponse } from 'next/server'
import getPayloadClient from '@/lib/getPayload'
import { startOfWeek, endOfWeek, addWeeks, format, isWithinInterval } from 'date-fns'
import { nl } from 'date-fns/locale/nl'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const weeksParam = searchParams.get('weeks') || '12' // Default to 12 weeks
    const weeks = parseInt(weeksParam, 10)

    const payload = await getPayloadClient()
    
    // Fetch all activities for the next X weeks
    const today = new Date()
    const endDate = addWeeks(today, weeks)
    
    const result = await payload.find({
      collection: 'activiteiten',
      where: {
        startDate: {
          greater_than_equal: today.toISOString(),
          less_than_equal: endDate.toISOString(),
        },
      },
      limit: 1000, // Get all activities in the period
      sort: 'startDate',
      draft: false,
    })

    // Define all divisions
    const divisions = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin']
    
    // Create weekly overview structure starting from today
    const weeklyOverview = []
    
    // Start from today and group by calendar weeks
    let currentDate = new Date(today)
    currentDate.setHours(0, 0, 0, 0)
    
    for (let weekOffset = 0; weekOffset < weeks; weekOffset++) {
      // For the first week, start from today
      // For subsequent weeks, start from Monday
      let weekStart: Date
      let weekEnd: Date
      
      if (weekOffset === 0) {
        // First week: from today to end of this week
        weekStart = new Date(currentDate)
        weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
      } else {
        // Subsequent weeks: full weeks (Monday to Sunday)
        const targetDate = addWeeks(startOfWeek(today, { weekStartsOn: 1 }), weekOffset)
        weekStart = startOfWeek(targetDate, { weekStartsOn: 1 })
        weekEnd = endOfWeek(targetDate, { weekStartsOn: 1 })
      }
      
      const weekData = {
        weekNumber: format(weekStart, 'w', { locale: nl }),
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        weekLabel: weekOffset === 0 
          ? `Vandaag - ${format(weekEnd, 'd MMM yyyy', { locale: nl })}`
          : `${format(weekStart, 'd MMM', { locale: nl })} - ${format(weekEnd, 'd MMM yyyy', { locale: nl })}`,
        divisions: {} as Record<string, any[]>
      }
      
      // Initialize all divisions
      divisions.forEach(division => {
        weekData.divisions[division] = []
      })
      
      // Add activities to their divisions for this week
      result.docs.forEach(activity => {
        const activityStart = new Date(activity.startDate)
        
        if (isWithinInterval(activityStart, { start: weekStart, end: weekEnd })) {
          // Add activity to each of its divisions
          if (activity.division && Array.isArray(activity.division)) {
            activity.division.forEach((div: string) => {
              if (weekData.divisions[div]) {
                weekData.divisions[div].push({
                  id: activity.id,
                  title: activity.title,
                  startDate: activity.startDate,
                  endDate: activity.endDate,
                  dayOfWeek: format(activityStart, 'EEEE', { locale: nl }),
                  startTime: format(activityStart, 'HH:mm', { locale: nl }),
                  endTime: format(new Date(activity.endDate), 'HH:mm', { locale: nl }),
                })
              }
            })
          }
        }
      })
      
      weeklyOverview.push(weekData)
    }

    return NextResponse.json({
      weeks: weeklyOverview,
      divisions,
      totalActivities: result.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching weekly overview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weekly overview' },
      { status: 500 }
    )
  }
}