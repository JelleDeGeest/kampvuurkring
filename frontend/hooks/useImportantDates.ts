'use client'

import { useState, useEffect } from 'react'

export interface EventItem {
  id: string
  title: string
  startDate: string
  endDate?: string
}

export interface PeriodItem extends EventItem {
  division: string
}

interface ImportantDates {
  events: EventItem[]
  weekends: PeriodItem[]
  camps: PeriodItem[]
}

const base = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''
const qs   = '?limit=100&sort=startDate'

const isUpcoming = (start: string, end?: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = end ? new Date(end) : new Date(start)
  return compareDate >= today
}

export function useImportantDates() {
  const [data, setData] = useState<ImportantDates | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    const fetchAll = async () => {
      try {
        setIsLoading(true)

        const [ev, we, ca] = await Promise.all([
          fetch(`${base}/api/events${qs}`,   { signal: controller.signal, cache: 'no-store' }),
          fetch(`${base}/api/weekends${qs}`, { signal: controller.signal, cache: 'no-store' }),
          fetch(`${base}/api/camps${qs}`,    { signal: controller.signal, cache: 'no-store' }),
        ])

        if (!mounted) return
        if (!ev.ok || !we.ok || !ca.ok) throw new Error('Request failed')

        const [evData, weData, caData] = await Promise.all([
          ev.json(), we.json(), ca.json(),
        ])

        if (mounted) {
          setData({
            events:   (evData?.docs ?? []).filter((e: EventItem)      => isUpcoming(e.startDate, e.endDate)),
            weekends: (weData?.docs ?? []).filter((w: PeriodItem)     => isUpcoming(w.startDate, w.endDate)),
            camps:    (caData?.docs ?? []).filter((c: PeriodItem)     => isUpcoming(c.startDate, c.endDate)),
          })
          setIsLoading(false)
        }
      } catch (err: any) {
        if (mounted && err.name !== 'AbortError') {
          console.error(err)
          setError(err.message || 'Fetch error')
          setIsLoading(false)
        }
      }
    }

    fetchAll()
    return () => { mounted = false; controller.abort() }
  }, [])

  return { data, isLoading, error }
}