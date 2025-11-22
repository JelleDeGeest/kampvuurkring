'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useDraftMode } from '@/components/DraftModeProvider'

export interface EventItem {
  id: string
  title: string
  startDate: string
  endDate?: string
  description?: any
  button?: {
    text?: string
    url?: string
  }
  enrollmentSettings?: {
    enabled?: boolean;
    hideButton?: boolean;
    enrollmentLink?: string;
    formPage?: string | number;
  };
}

export interface PeriodItem extends EventItem {
  division: string | string[];
  bannerImage?: any;
}

interface ImportantDates {
  events: EventItem[]
  weekends: PeriodItem[]
  camps: PeriodItem[]
}

interface ImportantDatesContextType {
  data: ImportantDates | null
  isLoading: boolean
  error: string | null
}

const ImportantDatesContext = createContext<ImportantDatesContextType | undefined>(undefined)

const base = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''
const qs = '?limit=100&sort=startDate&depth=2'

const isUpcoming = (start: string, end?: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = end ? new Date(end) : new Date(start)
  return compareDate >= today
}

export function ImportantDatesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ImportantDates | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isDraftMode } = useDraftMode()

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()

    const fetchAll = async () => {
      try {
        setIsLoading(true)

        const draftParam = isDraftMode ? '&draft=true' : ''

        // Fetch all three in parallel
        const [evResponse, weResponse, caResponse] = await Promise.all([
          fetch(`${base}/api/events${qs}${draftParam}`, {
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'include'
          }),
          fetch(`${base}/api/weekends${qs}${draftParam}`, {
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'include'
          }),
          fetch(`${base}/api/camps${qs}${draftParam}`, {
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'include'
          })
        ])

        if (!mounted) return

        if (!evResponse.ok || !weResponse.ok || !caResponse.ok) {
          throw new Error('Failed to fetch important dates')
        }

        const [evData, weData, caData] = await Promise.all([
          evResponse.json(),
          weResponse.json(),
          caResponse.json()
        ])

        if (mounted) {
          setData({
            events: (evData?.docs ?? []).filter((e: EventItem) => isUpcoming(e.startDate, e.endDate)),
            weekends: (weData?.docs ?? []).filter((w: PeriodItem) => isUpcoming(w.startDate, w.endDate)),
            camps: (caData?.docs ?? []).filter((c: PeriodItem) => isUpcoming(c.startDate, c.endDate)),
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
    return () => {
      mounted = false
      controller.abort()
    }
  }, [isDraftMode])

  return (
    <ImportantDatesContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ImportantDatesContext.Provider>
  )
}

export function useImportantDates() {
  const context = useContext(ImportantDatesContext)
  if (context === undefined) {
    throw new Error('useImportantDates must be used within an ImportantDatesProvider')
  }
  return context
}
