"use client"

import { useState, useEffect, useCallback } from "react"
import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useHomepageHeroes, Hero } from "@/hooks/useHomepageHeroes"
import { selectMediaVariantUrl, resolveMediaUrl } from "@/lib/mediaHelpers"

const HERO_SIZE_PREFERENCE = ['lg', 'md', 'sm'] as const
const HERO_FORMAT_PREFERENCE = ['avif', 'webp', 'jpeg', 'jpg'] as const

export function EventCarousel() {
  const { heroes, isLoading, error, hasCompleteInfo } = useHomepageHeroes()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set())

  const getHeroImageUrl = useCallback(
    (image?: PayloadImage | null) =>
      selectMediaVariantUrl(image, {
        sizePreference: Array.from(HERO_SIZE_PREFERENCE),
        formatPreference: Array.from(HERO_FORMAT_PREFERENCE),
      }) ?? resolveMediaUrl(image?.url),
    [],
  )


  // Preload next image
  useEffect(() => {
    if (heroes.length <= 1) return
    
    const nextIndex = (activeIndex + 1) % heroes.length
    const nextHero = heroes[nextIndex]
    const preloadUrl = getHeroImageUrl(nextHero?.homeHeroImage)
    if (preloadUrl) {
      const img = new window.Image()
      img.src = preloadUrl
    }
  }, [activeIndex, heroes])

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

  const handleImageLoad = (url?: string) => {
    if (!url) return
    setImagesLoaded((prev) => {
      if (prev.has(url)) return prev
      const next = new Set(prev)
      next.add(url)
      return next
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Laden...</div>
      </div>
    )
  }

  // Error state
  if (error || heroes.length === 0) {
    return null // Hide the carousel completely if no heroes or error
  }

  return (
    <div className="relative w-full h-[300px] md:h-[367px] lg:h-[400px] rounded-2xl overflow-visible group">
      {/* Container for outer glow effects - only render for active hero */}
      <div className="absolute inset-y-[-30px] inset-x-[-100vw] left-0 right-0 pointer-events-none z-0">
        {heroes.map((hero, index) => {
          const isActive = index === activeIndex;
          if (!isActive) return null;

          const backgroundUrl =
            getHeroImageUrl(hero.homeHeroImage) ??
            resolveMediaUrl(hero.homeHeroImage?.url) ??
            hero.homeHeroImage.url

          return (
            <div
              key={`glow-${hero.id}`}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{ 
                opacity: 1,
                transitionDuration: '1600ms',
              }}
            >
              {/* Horizontally extended glow effect with lower quality for performance */}
              <div
                style={{
                  position: 'absolute',
                  inset: '0',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${backgroundUrl})`,
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
          const imageUrl = getHeroImageUrl(hero.homeHeroImage);
          const fallbackImageUrl = imageUrl ?? resolveMediaUrl(hero.homeHeroImage?.url);
          const isImageLoaded = fallbackImageUrl ? imagesLoaded.has(fallbackImageUrl) : false;

          return (
            <div
              key={hero.id}
              className="absolute inset-0"
              style={{ 
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1600ms ease-in-out',
                visibility: isActive ? 'visible' : 'hidden',
              }}
            >
              {/* Loading placeholder */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              
              {/* Hero Image using Next.js Image component */}
              <ResponsiveImage
                media={hero.homeHeroImage}
                alt={hero.homeHeroImage.alt || hero.title || 'Hero image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={index === 0}
                onLoad={() => handleImageLoad(fallbackImageUrl)}
                style={{
                  opacity: isImageLoaded ? 1 : 0,
                  transition: 'opacity 300ms ease-in-out',
                }}
              />
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/15" />
              
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-black/70"
              aria-label="Next image"
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
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}