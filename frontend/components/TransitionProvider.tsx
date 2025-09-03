"use client"

import { createContext, useContext, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

interface TransitionContextType {
  navigate: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigate = (href: string) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // Add fade out to current content
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement
    if (pageContent) {
      pageContent.style.transition = 'opacity 200ms ease-in-out'
      pageContent.style.opacity = '0'
    }
    
    // Wait for fade out, then navigate
    setTimeout(() => {
      startTransition(() => {
        router.push(href)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      })
    }, 200) // Match fade duration
  }

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning: isTransitioning || isPending }}>
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