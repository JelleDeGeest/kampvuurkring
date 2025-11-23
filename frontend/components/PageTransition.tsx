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

  // Reset container opacity when pathname changes
  useEffect(() => {
    const pageContent = document.querySelector('[data-page-content]') as HTMLElement
    if (pageContent) {
      // Clear any inline transition/opacity from the fade-out
      pageContent.style.removeProperty('transition')
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
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}