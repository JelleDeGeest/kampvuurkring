"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useHomepageHeroes, Hero } from "@/hooks/useHomepageHeroes"

export function EventCarousel() {
  const { heroes, isLoading, error, hasCompleteInfo } = useHomepageHeroes()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Don't auto-rotate if there's only a single hero
  useEffect(() => {
    if (!isAutoPlaying || heroes.length <= 1) return

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroes.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, heroes.length])

  // Handle manual navigation
  const goToPrevious = () => {
    if (heroes.length <= 1) return
    setActiveIndex((prevIndex) => (prevIndex - 1 + heroes.length) % heroes.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    if (heroes.length <= 1) return
    setActiveIndex((prevIndex) => (prevIndex + 1) % heroes.length)
    setIsAutoPlaying(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="animate-pulse">Laden...</div>
      </div>
    )
  }

  // Error state
  if (error || heroes.length === 0) {
    return null // Hide the carousel completely if no heroes or error
  }

  return (
    <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-visible group">
      {/* Container for outer glow effects */}
      <div className="absolute inset-y-[-30px] inset-x-[-100vw] left-0 right-0 pointer-events-none z-0">
        {heroes.map((hero, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={`glow-${hero.id}`}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{ 
                opacity: isActive ? 1 : 0,
                transitionDuration: '1600ms',
              }}
            >
              {/* Horizontally extended glow effect */}
              <div 
                style={{
                  position: 'absolute',
                  inset: '0',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${hero.homeHeroImage.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(50px) saturate(350%) opacity(35%)',
                  transform: 'scale(1.5, 0.9) translateY(-12%)',
                  transformOrigin: 'center',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Actual Carousel Content */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden z-10">
        {heroes.map((hero, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={hero.id}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{ 
                opacity: isActive ? 1 : 0,
                transitionDuration: '1600ms',
              }}
            >
              {/* Dark overlay for better contrast */}
              <div 
                className="absolute inset-0 bg-black/15"
              />
              
              {/* Hero Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${hero.homeHeroImage.url})`,
                }}
              />
              
              {/* Info Box */}
              {hasCompleteInfo(hero) && (
                <div className="absolute top-1/2 right-4 md:right-8 lg:right-16 transform -translate-y-1/2 z-20">
                  <div className="bg-background/90 p-4 md:p-6 rounded-lg shadow-lg max-w-xs md:max-w-sm border border-border/50 backdrop-blur-sm">
                    <h2 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3">
                      {hero.title || hero.name}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                      {hero.description}
                    </p>
                    <Button className="w-full" asChild>
                      <a href={hero.button?.link}>
                        {hero.button?.text} <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Navigation Controls */}
        {heroes.length > 1 && (
          <>
            {/* Arrow Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {heroes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 