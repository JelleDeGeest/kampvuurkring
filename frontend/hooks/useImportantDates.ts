'use client'

import { useState, useEffect } from 'react'
import { useDraftMode } from '@/components/DraftModeProvider'

export interface EventItem {
  id: string
  title: string
  startDate: string
  endDate?: string
  button?: {
    text?: string
    url?: string
  }
  enrollmentSettings?: {
    enabled?: boolean;
    enrollmentLink?: string;
    formPage?: string | number;
  };
}

export interface PeriodItem extends EventItem {
  division: string | string[];
  bannerImage?: any; // Media object or ID
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

// Function to get a division for sorting
const getPrimaryDivision = (division: string | string[]): string => {
  if (Array.isArray(division) && division.length > 0) {
    return division[0];
  }
  return division as string;
};

export function useImportantDates() {
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
        console.log('Important dates fetch - Draft mode:', isDraftMode)
        
        // Fetch data with better error handling
        let evResponse, weResponse, caResponse;
        
        try {
          evResponse = await fetch(`${base}/api/events${qs}${draftParam}`, { 
            signal: controller.signal, 
            cache: 'no-store',
            credentials: 'include' // Include cookies for draft mode
          });
        } catch (err: any) {
          if (err.name === 'AbortError') return;
          console.error('Failed to fetch events:', err);
          throw new Error('Events request failed');
        }
        
        try {
          weResponse = await fetch(`${base}/api/weekends${qs}${draftParam}`, { 
            signal: controller.signal, 
            cache: 'no-store',
            credentials: 'include' // Include cookies for draft mode
          });
        } catch (err: any) {
          if (err.name === 'AbortError') return;
          console.error('Failed to fetch weekends:', err);
          throw new Error('Weekends request failed');
        }
        
        try {
          caResponse = await fetch(`${base}/api/camps${qs}${draftParam}`, { 
            signal: controller.signal, 
            cache: 'no-store',
            credentials: 'include' // Include cookies for draft mode
          });
        } catch (err: any) {
          if (err.name === 'AbortError') return;
          console.error('Failed to fetch camps:', err);
          throw new Error('Camps request failed');
        }

        if (!mounted) return
        
        // Check responses
        if (!evResponse.ok) {
          console.error(`Events API error: ${evResponse.status} ${evResponse.statusText}`);
          throw new Error(`Events request failed with status ${evResponse.status}`);
        }
        if (!weResponse.ok) {
          console.error(`Weekends API error: ${weResponse.status} ${weResponse.statusText}`);
          throw new Error(`Weekends request failed with status ${weResponse.status}`);
        }
        if (!caResponse.ok) {
          console.error(`Camps API error: ${caResponse.status} ${caResponse.statusText}`);
          throw new Error(`Camps request failed with status ${caResponse.status}`);
        }

        // Parse JSON
        let evData, weData, caData;
        
        try {
          evData = await evResponse.json();
        } catch (err) {
          if (controller.signal.aborted) return;
          console.error('Failed to parse events JSON:', err);
          throw new Error('Events data is invalid');
        }
        
        try {
          weData = await weResponse.json();
        } catch (err) {
          if (controller.signal.aborted) return;
          console.error('Failed to parse weekends JSON:', err);
          throw new Error('Weekends data is invalid');
        }
        
        try {
          caData = await caResponse.json();
        } catch (err) {
          if (controller.signal.aborted) return;
          console.error('Failed to parse camps JSON:', err);
          throw new Error('Camps data is invalid');
        }

        if (mounted) {
          setData({
            events:   (evData?.docs ?? []).filter((e: EventItem) => isUpcoming(e.startDate, e.endDate)),
            weekends: (weData?.docs ?? []).filter((w: PeriodItem) => isUpcoming(w.startDate, w.endDate)),
            camps:    (caData?.docs ?? []).filter((c: PeriodItem) => isUpcoming(c.startDate, c.endDate)),
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
  }, [isDraftMode])

  return { data, isLoading, error }
}