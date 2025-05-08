'use client'

import React, { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import PayloadRichText from '@/components/PayloadRichText'
import { CategoryFilter, categoryTabs, eventIcon } from '@/components/CategoryFilter'
import { useActivitiesFilter, Activity } from '@/hooks/useActivitiesFilter'
import { useCategorySelection, CategoryValue } from '@/hooks/CategorySelectionContext'
import { useImportantDates, PeriodItem } from '@/hooks/useImportantDates'

const TRANSITION_DURATION = 300
const INITIAL_FADE_IN_DURATION = 300

export default function ActivitiesSection() {
  // ─── Activities filter hooks ───
  const {
    filteredActivities,
    allActivities,
    isLoading: isLoadingActivities,
    fadeState,
    filterActivities,
    initialFetchDone,
    isFirstFilter,
    setAllActivities,
  } = useActivitiesFilter()

  const { selectedCategories, isInitialized: isCategoriesInitialized } =
    useCategorySelection()

  const [prevSelectedCategories, setPrevSelectedCategories] =
    useState<CategoryValue[]>([])
  const isInitialPageLoad = useRef(true)

  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [initialFadeIn, setInitialFadeIn] = useState(false)
  const [hasCheckedEmpty, setHasCheckedEmpty] = useState(false)

  // 1️⃣ Apply initial filter once fetched & categories ready
  useEffect(() => {
    if (initialFetchDone && isCategoriesInitialized) {
      filterActivities(selectedCategories)
      setPrevSelectedCategories([...selectedCategories])
    }
  }, [initialFetchDone, isCategoriesInitialized, filterActivities, selectedCategories])

  // 2️⃣ Re-filter when categories change
  useEffect(() => {
    if (
      !isFirstFilter &&
      initialFetchDone &&
      isCategoriesInitialized &&
      prevSelectedCategories.length > 0
    ) {
      const changed =
        prevSelectedCategories.length !== selectedCategories.length ||
        prevSelectedCategories.some((c) => !selectedCategories.includes(c))

      if (changed) {
        filterActivities(selectedCategories)
        setPrevSelectedCategories([...selectedCategories])
        setHasCheckedEmpty(false)
      }
    }
  }, [
    selectedCategories,
    filterActivities,
    initialFetchDone,
    isCategoriesInitialized,
    prevSelectedCategories,
    isFirstFilter,
  ])

  // 3️⃣ Initial fade‐in after first load
  useEffect(() => {
    if (!isLoadingActivities && !initialLoadComplete && initialFetchDone) {
      setInitialLoadComplete(true)
      setTimeout(() => {
        setInitialFadeIn(true)
        setHasCheckedEmpty(true)
      }, 50)
    }
  }, [isLoadingActivities, initialLoadComplete, initialFetchDone])

  // 4️⃣ Reset initial‐page flag after fade
  useEffect(() => {
    if (initialFadeIn && isInitialPageLoad.current) {
      const t = setTimeout(() => {
        isInitialPageLoad.current = false
      }, INITIAL_FADE_IN_DURATION)
      return () => clearTimeout(t)
    }
  }, [initialFadeIn])

  // Style helper for fade
  const getContentStyle = () =>
    isInitialPageLoad.current
      ? {
          opacity: initialFadeIn ? 1 : 0,
          transition: `opacity ${INITIAL_FADE_IN_DURATION}ms ease-in-out`,
        }
      : {
          opacity: fadeState === 'in' ? 1 : 0,
          transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
        }

  // No‐activities message condition
  const showNoActivitiesMessage =
    initialLoadComplete &&
    filteredActivities.length === 0 &&
    !isLoadingActivities &&
    (hasCheckedEmpty || initialFadeIn)

  // ─── New: load weekends & camps ───
  const { data: importantDates, isLoading: loadingDates } =
    useImportantDates()

  // Track if we've already added the special items to avoid duplicates
  const [specialItemsAdded, setSpecialItemsAdded] = useState(false)
  
  // Process special items when activity data and important dates are both loaded
  useEffect(() => {
    // Only run this once when both data sources are ready
    if (!importantDates || !initialFetchDone || specialItemsAdded) return
    
    try {
      // Create activity-like objects from events, weekends and camps
      const eventItems: Activity[] =
        importantDates.events.map((e) => ({
          id:        `event-${e.startDate}-${e.id}`,
          title:     e.title,
          startDate: e.startDate,
          endDate:   e.endDate || e.startDate, 
          division:  'event',
          description: { root: { children: [] } },
        }))

      const weekendItems: Activity[] =
        importantDates.weekends.map((w: PeriodItem) => ({
          id:        `weekend-${w.startDate}-${w.division}`,
          title:     w.title,
          startDate: w.startDate,
          endDate:   w.endDate || w.startDate,
          division:  w.division,
          description: { root: { children: [] } },
        }))

      const campItems: Activity[] =
        importantDates.camps.map((c: PeriodItem) => ({
          id:         `camp-${c.startDate}-${c.division}`,
          title:      c.title,
          startDate:  c.startDate,
          endDate:    c.endDate || c.startDate,
          division:   c.division,
          description: { root: { children: [] } },
        }))
      
      // Combine all activities
      const mergedActivities = [
        ...allActivities,
        ...eventItems,
        ...weekendItems,
        ...campItems
      ]
      
      // Update the activities in the filter system
      setAllActivities(mergedActivities)
      setSpecialItemsAdded(true)
      
      // Reapply the current filter
      filterActivities(selectedCategories)
      
    } catch (err) {
      console.error('Error processing special items:', err)
    }
  }, [importantDates, initialFetchDone, specialItemsAdded, allActivities, filterActivities, selectedCategories, setAllActivities])

  return (
    <div className="w-full lg:w-2/3">
      <CategoryFilter />

      {/* loader for activities */}
      {(isLoadingActivities || loadingDates) && !initialLoadComplete && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin h-6 w-6 mr-2" /> Activiteiten laden...
        </div>
      )}

      <div style={getContentStyle()}>
        {filteredActivities.length > 0 ? (
          <DateGroups acts={filteredActivities} />
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            Geen activiteiten gevonden voor de geselecteerde categorieën.
          </div>
        )}
      </div>
    </div>
  )
}

/* ===== Helpers ===== */
function DateGroups({ acts }: { acts: Activity[] }) {
  const groups = acts.reduce<Record<string, Activity[]>>((g, a) => {
    const key = format(new Date(a.startDate), 'yyyy-MM-dd')
    ;(g[key] ||= []).push(a)
    return g
  }, {})

  return (
    <div className="mb-8">
      {Object.entries(groups)
        .sort(([a], [b]) => +new Date(a) - +new Date(b))
        .map(([dateStr, list]) => (
          <div key={dateStr} className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-primary">
              {format(new Date(dateStr), 'EEEE d MMMM yyyy', { locale: nl })}
            </h3>
            <div className="space-y-1">
              {list.map((act) => {
                // Special handling for events (non-division items)
                if (act.division === 'event') {
                  return (
                    <Card key={act.id} className="border bg-white">
                      <CardHeader className="pb-1 pt-4 px-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-0.5 border rounded flex items-center justify-center"
                              style={{
                                backgroundColor: `${eventIcon.color}20`,
                                borderColor: eventIcon.color,
                              }}
                            >
                              <eventIcon.icon
                                className="h-7 w-7"
                                style={{ color: eventIcon.color }}
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <span className="text-sm text-muted-foreground leading-tight">
                                {format(new Date(act.startDate), "d MMM yyyy", { locale: nl })}
                                {act.endDate && act.endDate !== act.startDate && 
                                  ` - ${format(new Date(act.endDate), "d MMM yyyy", { locale: nl })}`}
                              </span>
                              <CardTitle className="text-lg font-bold leading-tight text-gray-700">
                                {act.title}
                              </CardTitle>
                            </div>
                          </div>
                          <span className="text-sm font-normal text-gray-500">
                            Evenement
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-1 px-4">
                        <div className="text-muted-foreground leading-relaxed">
                          <PayloadRichText content={act.description} />
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                
                // Check if this is a weekend or camp
                const isSpecialEvent = act.id && typeof act.id === 'string' && 
                  (act.id.startsWith('weekend-') || act.id.startsWith('camp-'));
                
                // Regular division items (activities, weekends, camps)
                const tabMeta = categoryTabs.find((t) => t.value === act.division)
                return (
                  <Card key={act.id} className="border bg-white">
                    <CardHeader className="pb-0 pt-3 px-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-0.5 border rounded flex items-center justify-center"
                            style={{
                              backgroundColor: `${tabMeta?.color}20`,
                              borderColor: tabMeta?.color,
                            }}
                          >
                            {tabMeta?.icon && (
                              <tabMeta.icon
                                className="h-7 w-7"
                                style={{ color: tabMeta.color }}
                              />
                            )}
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-sm text-muted-foreground leading-tight">
                              {isSpecialEvent ? (
                                <>
                                  {format(new Date(act.startDate), "d MMM yyyy", { locale: nl })}
                                  {act.endDate && act.endDate !== act.startDate && 
                                    ` - ${format(new Date(act.endDate), "d MMM yyyy", { locale: nl })}`}
                                </>
                              ) : (
                                <>
                                  {format(new Date(act.startDate), "HH:mm")} –{' '}
                                  {act.endDate &&
                                    format(new Date(act.endDate), "HH:mm")}
                                </>
                              )}
                            </span>
                            <CardTitle className="text-lg font-bold leading-tight text-gray-700">
                              {act.title}
                            </CardTitle>
                          </div>
                        </div>
                        {act.division && (
                          <span className="text-sm font-normal text-gray-500 capitalize">
                            {tabMeta?.name || act.division}
                            {isSpecialEvent && act.id?.startsWith('weekend-') && ' - Weekend'}
                            {isSpecialEvent && act.id?.startsWith('camp-') && ' - Kamp'}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3 px-4">
                      <div className="text-muted-foreground leading-relaxed">
                        <PayloadRichText content={act.description} />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}