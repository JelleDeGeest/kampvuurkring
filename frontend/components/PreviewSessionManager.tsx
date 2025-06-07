'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PreviewSessionManager() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const isInIframe = window.parent !== window
    if (!isInIframe) return
    
    // Clear all old preview sessions
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      if (key.startsWith('preview_') && key !== 'currentPreviewSession') {
        sessionStorage.removeItem(key)
      }
    })
    
    // When we're on a homepage preview with noEnrollment
    if (pathname === '/' && searchParams.get('noEnrollment') === 'true') {
      // Clear current session
      sessionStorage.removeItem('currentPreviewSession')
      
      // Clear any lingering old-style session data
      sessionStorage.removeItem('previewEnrollmentUrl')
      sessionStorage.removeItem('previewHasEnrollment')
    }
  }, [pathname, searchParams])
  
  return null
}