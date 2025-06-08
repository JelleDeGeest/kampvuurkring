'use client'

import React, { useEffect, useState } from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { nl } from 'date-fns/locale/nl'
import './styles.css'

interface Activity {
  id: string
  title: string
  startDate: string
  endDate: string
  dayOfWeek: string
  startTime: string
  endTime: string
}

interface WeekData {
  weekNumber: string
  weekStart: string
  weekEnd: string
  weekLabel: string
  divisions: Record<string, Activity[]>
}

interface WeeklyOverviewData {
  weeks: WeekData[]
  divisions: string[]
  totalActivities: number
}

const divisionLabels: Record<string, string> = {
  kapoenen: 'Kapoenen',
  wouters: 'Wouters',
  jonggivers: 'Jonggivers',
  givers: 'Givers',
  jin: 'Jin',
}

const divisionColors: Record<string, string> = {
  kapoenen: '#FF6B6B',
  wouters: '#4ECDC4',
  jonggivers: '#45B7D1',
  givers: '#F7DC6F',
  jin: '#BB8FCE',
}

export default function ActiviteitenOverzichtPage() {
  const [data, setData] = useState<WeeklyOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [weeks, setWeeks] = useState(12)

  useEffect(() => {
    fetchOverview()
  }, [weeks])

  const fetchOverview = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/activiteiten/weekly-overview?weeks=${weeks}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch overview')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="overview-container">
        <div className="overview-header">
          <h1>Activiteiten Overzicht</h1>
        </div>
        <div className="loading">Laden...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="overview-container">
        <div className="overview-header">
          <h1>Activiteiten Overzicht</h1>
        </div>
        <div className="error">Error: {error || 'No data available'}</div>
      </div>
    )
  }

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h1>Activiteiten Overzicht</h1>
        <div className="controls">
          <label>
            Aantal weken:{' '}
            <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}>
              <option value={4}>4 weken</option>
              <option value={8}>8 weken</option>
              <option value={12}>12 weken</option>
              <option value={16}>16 weken</option>
              <option value={26}>26 weken</option>
              <option value={52}>52 weken</option>
            </select>
          </label>
          <button onClick={fetchOverview} className="refresh-button">
            Vernieuwen
          </button>
        </div>
      </div>

      <div className="overview-stats">
        <p>Totaal aantal activiteiten: <strong>{data.totalActivities}</strong></p>
      </div>

      <div className="overview-table-wrapper">
        <table className="overview-table">
          <thead>
            <tr>
              <th className="week-column">Week</th>
              {data.divisions.map(division => (
                <th key={division} className="division-column">
                  <div 
                    className="division-header"
                    style={{ borderLeftColor: divisionColors[division] }}
                  >
                    {divisionLabels[division]}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.weeks.map((week, weekIndex) => (
              <tr key={week.weekNumber} className={weekIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className="week-cell">
                  <div className="week-info">
                    <div className="week-number">Week {week.weekNumber}</div>
                    <div className="week-dates">{week.weekLabel}</div>
                  </div>
                </td>
                {data.divisions.map(division => {
                  const activities = week.divisions[division]
                  const hasActivities = activities.length > 0
                  
                  return (
                    <td 
                      key={division} 
                      className={`division-cell ${hasActivities ? 'has-activity' : 'no-activity'}`}
                    >
                      {hasActivities ? (
                        <div className="activity-info">
                          {activities.map((activity, index) => (
                            <div key={activity.id} className="activity-item">
                              <div className="activity-title">{activity.title}</div>
                              <div className="activity-time">
                                {activity.dayOfWeek} {activity.startTime} - {activity.endTime}
                              </div>
                              {index < activities.length - 1 && <hr className="activity-separator" />}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-activity-placeholder">
                          <span className="warning-icon">⚠️</span>
                          <span>Geen activiteit</span>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overview-legend">
        <h3>Legenda:</h3>
        <div className="legend-items">
          {data.divisions.map(division => (
            <div key={division} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: divisionColors[division] }}
              />
              <span>{divisionLabels[division]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}