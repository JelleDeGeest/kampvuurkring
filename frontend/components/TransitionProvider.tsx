"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface TransitionContextType {
  navigate: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const fadeTimeoutRef = useRef<number | null>(null)
  const resetTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current)
      }
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const resetPageContent = () => {
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement | null
    if (pageContent) {
      pageContent.classList.remove('opacity-0')
      pageContent.style.opacity = '1'
      pageContent.style.removeProperty('transition')
    }
  }

  const scheduleReset = (delay: number) => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      resetPageContent()
      setIsTransitioning(false)
      resetTimeoutRef.current = null
    }, delay)
  }

  const normalizeHref = (href: string) => {
    try {
      const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
      const url = href.startsWith('http') ? new URL(href) : new URL(href, base)
      url.hash = ''
      return url.pathname + url.search
    } catch {
      return href
    }
  }

  const navigate = (href: string) => {
    if (isTransitioning) return

    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''
    if (currentPath && normalizeHref(href) === normalizeHref(currentPath)) {
      resetPageContent()
      return
    }

    setIsTransitioning(true)
    
    // Add fade out to current content
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement
    if (pageContent) {
      pageContent.style.transition = 'opacity 200ms ease-in-out'
      pageContent.style.opacity = '0'
    }

    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current)
    }

    // Wait for fade out, then navigate
    fadeTimeoutRef.current = window.setTimeout(() => {
      router.push(href)
      scheduleReset(250)
      fadeTimeoutRef.current = null
    }, 200) // Match fade duration

    // Fallback reset in case route push is a no-op (e.g. navigating to current page)
    scheduleReset(600)
  }

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionRouter() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionRouter must be used within TransitionProvider')
  }
  return context
}
