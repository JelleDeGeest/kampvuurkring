'use client'

import { Button } from '@/components/ui/button'
import CalendarDays from 'lucide-react/dist/esm/icons/calendar-days'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'

interface ScrollButtonProps {
  targetId: string
  children: React.ReactNode
}

export default function ScrollButton({ targetId, children }: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="relative inline-block">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <div className="relative">
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
          onClick={handleClick}
        >
          <CalendarDays className="mr-2 h-5 w-5" />
          {children}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}