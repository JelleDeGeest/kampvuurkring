"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface EventItem {
  id: number
  title: string
  description: string
  buttonText: string
  imageUrl: string
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Spaghettiweekend 2025",
    description: "Klik hier om in te schrijven!",
    buttonText: "Inschrijvingen",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Zomerkamp 2025",
    description: "Schrijf je nu in voor ons zomerkamp!",
    buttonText: "Inschrijven",
    imageUrl: "/placeholder.svg"
  },
  // Add more events here
]

export function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
      setIsTransitioning(false)
    }, 500)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
      setIsTransitioning(false)
    }, 500)
    setIsAutoPlaying(false)
  }

  const currentEvent = events[currentIndex]

  return (
    <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <div 
        className={`absolute inset-0 bg-gray-300 transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${currentEvent.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Event Info Box */}
      <div className={`absolute top-1/2 right-4 md:right-8 lg:right-16 transform -translate-y-1/2 z-10 transition-opacity duration-1000 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="bg-background/95 p-4 md:p-6 rounded-lg shadow-lg max-w-xs md:max-w-sm border border-border/50">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">
            {currentEvent.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
            {currentEvent.description}
          </p>
          <Button className="w-full">
            {currentEvent.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsTransitioning(false)
              }, 500)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 