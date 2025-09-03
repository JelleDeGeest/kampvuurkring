"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()

  // Reset opacity when route changes (after fade-out is complete)
  useEffect(() => {
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement
    if (pageContent) {
      // Remove the opacity-0 class that was added during fade out
      pageContent.classList.remove('opacity-0')
      pageContent.style.opacity = '1'
    }
  }, [pathname])

  return (
    <div 
      className={className ?? ""}
      data-page-content
      style={{ opacity: 1 }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}