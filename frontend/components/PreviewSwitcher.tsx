'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function PreviewSwitcher() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [enrollmentUrl, setEnrollmentUrl] = useState<string | null>(null)
  const [hasEnrollmentPage, setHasEnrollmentPage] = useState(false)
  
  // Detect if we're in an iframe (CMS preview)
  const isInIframe = typeof window !== 'undefined' && window.parent !== window
  
  // Only show if we're in an iframe
  if (!isInIframe) {
    return null
  }
  
  // Check if this preview explicitly has no enrollment
  const noEnrollment = searchParams.get('noEnrollment') === 'true'
  
  // If explicitly no enrollment, don't show switcher
  if (noEnrollment) {
    return null
  }
  
  const currentView = pathname === '/' ? 'homepage' : 'enrollment'
  
  // Initialize session on first load
  useEffect(() => {
    if (!sessionStorage.getItem('currentPreviewSession')) {
      const sessionKey = `preview_${Date.now()}`
      sessionStorage.setItem('currentPreviewSession', sessionKey)
    }
  }, [])
  
  // Store enrollment URL when on enrollment page
  useEffect(() => {
    if (pathname.includes('/inschrijven/')) {
      setEnrollmentUrl(pathname)
      setHasEnrollmentPage(true)
      // Store in sessionStorage with current session key
      const currentSession = sessionStorage.getItem('currentPreviewSession')
      if (currentSession) {
        sessionStorage.setItem(`${currentSession}_enrollmentUrl`, pathname)
        sessionStorage.setItem(`${currentSession}_hasEnrollment`, 'true')
      }
    }
  }, [pathname])
  
  // Retrieve stored enrollment URL from session
  useEffect(() => {
    const currentSession = sessionStorage.getItem('currentPreviewSession')
    if (currentSession) {
      const storedUrl = sessionStorage.getItem(`${currentSession}_enrollmentUrl`)
      const storedHasEnrollment = sessionStorage.getItem(`${currentSession}_hasEnrollment`)
      if (storedUrl) {
        setEnrollmentUrl(storedUrl)
      }
      if (storedHasEnrollment === 'true') {
        setHasEnrollmentPage(true)
      }
    }
  }, [])
  
  // Only show switcher if enrollment page exists (enrollments are enabled)
  if (!hasEnrollmentPage) {
    return null
  }

  const handleViewChange = (view: string) => {
    if (view === 'homepage') {
      // Navigate to homepage
      router.push('/')
    } else if (view === 'enrollment' && enrollmentUrl) {
      // Navigate back to enrollment page
      router.push(enrollmentUrl)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[100] bg-white rounded-lg shadow-lg p-2 border border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Preview:</span>
        <select
          value={currentView}
          onChange={(e) => handleViewChange(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!enrollmentUrl && currentView === 'homepage'}
        >
          <option value="enrollment">📝 Enrollment Page</option>
          <option value="homepage">🏠 Homepage Card</option>
        </select>
      </div>
    </div>
  )
}