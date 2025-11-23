"use client"

import React, { createContext, useContext, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface TransitionContextType {
  navigate: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<number | null>(null)

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
      return
    }

    setIsTransitioning(true)

    // Clear any pending timeout
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    // Fade out current content
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement
    if (pageContent) {
      pageContent.style.transition = 'opacity 150ms ease-out'
      pageContent.style.opacity = '0'
    }

    // Navigate after fade out completes - don't reset anything, let new page handle fade in
    timeoutRef.current = window.setTimeout(() => {
      router.push(href)
      // Reset transitioning state after navigation starts
      // The new page's PageTransition will handle the fade in
      setTimeout(() => setIsTransitioning(false), 100)
      timeoutRef.current = null
    }, 150)
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
