'use client'

import React, { useEffect, useState, useRef } from 'react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import PayloadRichText from '@/components/PayloadRichText'
import { CategoryFilter, categoryTabs } from '@/components/CategoryFilter'
import { useActivitiesFilter, Activity } from '@/hooks/useActivitiesFilter'
import { useCategorySelection, CategoryValue } from '@/hooks/CategorySelectionContext'

const TRANSITION_DURATION = 300
const INITIAL_FADE_IN_DURATION = 300

export default function ActivitiesSection() {
  const {
    filteredActivities,
    isLoading: isLoadingActivities,
    fadeState,
    filterActivities,
    initialFetchDone,
    isFirstFilter,
  } = useActivitiesFilter()

  const { selectedCategories, isInitialized: isCategoriesInitialized } =
    useCategorySelection()

  const [prevSelectedCategories, setPrevSelectedCategories] =
    useState<CategoryValue[]>([])
  const isInitialPageLoad = useRef(true)

  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [initialFadeIn, setInitialFadeIn] = useState(false)
  const [hasCheckedEmpty, setHasCheckedEmpty] = useState(false)

  /* ---------- 1. filters toepassen zodra data en categorieën binnen zijn ---------- */
  useEffect(() => {
    if (initialFetchDone && isCategoriesInitialized) {
      filterActivities(selectedCategories)
      setPrevSelectedCategories([...selectedCategories])
    }
  }, [initialFetchDone, isCategoriesInitialized, filterActivities, selectedCategories])

  /* ---------- 2. filter opnieuw toepassen als categorie‑selectie wijzigt ---------- */
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

  /* ---------- 3. initial fade‑in na de eerste load ---------- */
  useEffect(() => {
    if (!isLoadingActivities && !initialLoadComplete && initialFetchDone) {
      setInitialLoadComplete(true)

      setTimeout(() => {
        setInitialFadeIn(true)
        setHasCheckedEmpty(true)
      }, 50)
    }
  }, [isLoadingActivities, initialLoadComplete, initialFetchDone])

  /* ---------- 4. vlag resetten zodra fade klaar is ---------- */
  useEffect(() => {
    if (initialFadeIn && isInitialPageLoad.current) {
      const t = setTimeout(() => {
        isInitialPageLoad.current = false
      }, INITIAL_FADE_IN_DURATION)
      return () => clearTimeout(t)
    }
  }, [initialFadeIn])

  /* ---------- helpers ---------- */
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

  const showNoActivitiesMessage =
    initialLoadComplete &&
    filteredActivities.length === 0 &&
    !isLoadingActivities &&
    (hasCheckedEmpty || initialFadeIn)

  /* ---------- render ---------- */
  return (
    <div className="w-full lg:w-2/3">
      <CategoryFilter />

      {/* loader while first fetch runs */}
      {isLoadingActivities && !initialLoadComplete && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
          Laden…
        </div>
      )}

      <div style={getContentStyle()}>
        {showNoActivitiesMessage ? (
          <div className="py-20 text-center text-muted-foreground">
            Geen activiteiten gevonden voor de geselecteerde categorieën.
          </div>
        ) : (
          filteredActivities.length > 0 && <DateGroups acts={filteredActivities} />
        )}
      </div>
    </div>
  )
}

/* ===== helpers ===== */
function DateGroups({ acts }: { acts: Activity[] }) {
  const dateGroups = acts.reduce((g: Record<string, Activity[]>, a) => {
    const key = format(new Date(a.startDate), 'yyyy-MM-dd')
    ;(g[key] ||= []).push(a)
    return g
  }, {})

  return Object.entries(dateGroups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([d, list]) => <DateGroup key={d} dateStr={d} acts={list} />)
}

function DateGroup({ dateStr, acts }: { dateStr: string; acts: Activity[] }) {
  const date = new Date(dateStr)
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {format(date, 'EEEE d MMMM yyyy')}
      </h3>
      <div className="space-y-6">
        {acts.map((act) => {
          const tabMeta = categoryTabs.find((t) => t.value === act.division)
          if (!tabMeta) return null
          return (
            <Card key={act.id} className="border-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-0.5 border rounded flex items-center justify-center"
                      style={{
                        backgroundColor: `${tabMeta.color}20`,
                        borderColor: tabMeta.color,
                      }}
                    >
                      <tabMeta.icon
                        className="h-7 w-7"
                        style={{ color: tabMeta.color }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm text-muted-foreground leading-tight">
                        {format(new Date(act.startDate), "HH'u'mm")} –{' '}
                        {format(new Date(act.endDate), "HH'u'mm")}
                      </span>
                      <CardTitle className="text-xl font-bold leading-tight">
                        {act.title}
                      </CardTitle>
                    </div>
                  </div>
                  <span className="text-sm font-normal text-gray-500">
                    {tabMeta.name}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-1">
                <div className="text-muted-foreground leading-relaxed">
                  <PayloadRichText content={act.description} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}