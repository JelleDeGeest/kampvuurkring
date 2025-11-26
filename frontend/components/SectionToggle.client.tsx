'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ActivitiesContent } from '@/components/ActivitiesSection.client'
import { useActivitiesFilter } from '@/hooks/useActivitiesFilter'
import BelangrijkeDataBlock from '@/components/BelangrijkeDataBlock'
import { useImportantDates } from '@/hooks/ImportantDatesContext'

type SectionType = 'activities' | 'dates'
export default function SectionToggle() {
  const [activeSection, setActiveSection] = useState<SectionType>('activities')

  // Fetch activities data once at the top level
  const filterData = useActivitiesFilter()

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Get important dates count for notification badge
  const { data: importantDates } = useImportantDates()

  const getTotalCount = () => {
    if (!importantDates) return 0
    return importantDates.events.length + importantDates.weekends.length + importantDates.camps.length
  }

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section)
  }

  // Swipe detection
  const minSwipeDistance = 50 // Minimum distance for a swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset touch end
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && activeSection === 'activities') {
      // Swipe left on activities -> go to dates
      handleSectionChange('dates')
    } else if (isRightSwipe && activeSection === 'dates') {
      // Swipe right on dates -> go to activities
      handleSectionChange('activities')
    }
  }

  // Simple transforms without hints
  const getSliderTransform = () => {
    return activeSection === 'dates' ? 'translate-x-full' : 'translate-x-0'
  }

  // Use left positioning instead of transform to avoid resize animations
  const getActivitiesPosition = () => {
    return activeSection === 'dates' ? '-left-full' : 'left-0'
  }

  const getDatesPosition = () => {
    return activeSection === 'dates' ? 'left-0' : 'left-full'
  }

  return (
    <div className="w-full">
      {/* Toggle buttons - only show on small screens */}
      <div className="md:hidden mb-4 relative flex rounded-full p-1 bg-gray-100 w-[85%] sm:w-[70%] md:w-[50%] mx-auto">
        {/* Sliding background indicator */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-primary rounded-full shadow-sm transition-transform duration-300 ease-in-out ${getSliderTransform()}`}
        />

        {/* Button content */}
        <button
          className={`relative flex-1 text-sm py-2 px-4 rounded-full transition-colors duration-300 font-medium ${activeSection === 'activities'
            ? 'text-white z-10'
            : 'text-gray-600 hover:text-gray-800 z-10'
            }`}
          onClick={() => handleSectionChange('activities')}
        >
          Activiteiten
        </button>
        <button
          className={`relative flex-1 text-sm py-2 px-4 rounded-full transition-colors duration-300 font-medium ${activeSection === 'dates'
            ? 'text-white z-10'
            : 'text-gray-600 hover:text-gray-800 z-10'
            }`}
          onClick={() => handleSectionChange('dates')}
        >
          Belangrijke Data
          {getTotalCount() > 0 && (
            <span className="absolute -top-0.5 right-1 sm:right-3 md:right-5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {getTotalCount()}
            </span>
          )}
        </button>
      </div>

      {/* Unified content section with responsive layout */}
      <div
        className="relative overflow-hidden md:overflow-visible md:flex md:gap-6"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`relative transition-[left] duration-300 ease-in-out md:static md:w-2/3 md:transition-none ${getActivitiesPosition()}`}
        >
          <ActivitiesContent filterData={filterData} />
        </div>
        <div
          className={`absolute top-0 w-full transition-[left] duration-300 ease-in-out md:static md:w-1/3 md:transition-none ${getDatesPosition()}`}
        >
          <BelangrijkeDataBlock />
        </div>
      </div>
    </div>
  )
}