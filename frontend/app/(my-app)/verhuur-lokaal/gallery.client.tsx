'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ResponsiveImage, type PayloadImage } from '@/components/ResponsiveImage'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: number | string
  media?: PayloadImage
  src?: string
  alt: string
  title: string
  description?: string
  category: string
}

interface GalleryProps {
  images: GalleryImage[]
}

type SlideState = 'entering' | 'exiting'
interface Slide {
  key: string
  image: GalleryImage
  state: SlideState
}

const TRANSITION_MS = 450

export default function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Geen foto's beschikbaar. Upload foto's via de admin panel.</p>
      </div>
    )
  }

  const slideKeyRef = useRef(0)
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null)

  const makeSlide = useCallback(
    (image: GalleryImage, state: SlideState): Slide => ({
      image,
      state,
      key: `slide-${image.id}-${slideKeyRef.current++}`,
    }),
    [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [slides, setSlides] = useState<Slide[]>(() => [makeSlide(images[0], 'entering')])

  const selectedImage = useMemo(() => images[currentIndex], [images, currentIndex])

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }

  const scheduleCleanup = () => {
    clearResetTimer()
    resetTimerRef.current = setTimeout(() => {
      setSlides((prev) => prev.filter((slide) => slide.state === 'entering'))
      resetTimerRef.current = null
    }, TRANSITION_MS)
  }

  const changeImage = (newIndex: number) => {
    if (newIndex === currentIndex || newIndex < 0 || newIndex >= images.length) {
      return
    }

    const nextImage = images[newIndex]
    setSlides((prev) => {
      const currentSlide = prev.find((slide) => slide.state === 'entering')
      const exitingSlides = currentSlide ? [{ ...currentSlide, state: 'exiting' as SlideState }] : []
      return [makeSlide(nextImage, 'entering'), ...exitingSlides]
    })

    setCurrentIndex(newIndex)
    scheduleCleanup()
  }

  const goToNext = () => {
    changeImage((currentIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    changeImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  useEffect(() => () => {
    clearResetTimer()
  }, [])

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0)
      setSlides([makeSlide(images[0], 'entering')])
    }
  }, [images, currentIndex, makeSlide])

  const transitionSlides = useMemo(() => {
    if (slides.length === 0) {
      return [makeSlide(images[currentIndex], 'entering')]
    }
    return slides
  }, [slides, images, currentIndex, makeSlide])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3">
        <div className="group relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-100">
          {transitionSlides.map((slide, idx) => {
            const isActive = slide.state === 'entering'
            const zIndex = isActive ? transitionSlides.length : idx + 1

            return (
              <div
                key={slide.key}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
                  zIndex,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <ResponsiveImage
                  media={slide.image.media}
                  fallbackUrl={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  className="object-cover"
                  pictureClassName="absolute inset-0"
                  sizes="(min-width: 1280px) 75vw, 100vw"
                />
              </div>
            )
          })}

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-opacity duration-300 ease-out opacity-70 hover:opacity-100"
            aria-label="Vorige foto"
            type="button"
            style={{ zIndex: transitionSlides.length + 5 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white transition-opacity duration-300 ease-out opacity-70 hover:opacity-100"
            aria-label="Volgende foto"
            type="button"
            style={{ zIndex: transitionSlides.length + 5 }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 pointer-events-auto"
            style={{ zIndex: transitionSlides.length + 10 }}
          >
            <h3 className="text-white font-medium">{selectedImage.title}</h3>
          </div>
        </div>
      </div>

      <div className="xl:col-span-1">
        <div className="hidden xl:grid grid-cols-4 gap-x-1 gap-y-3 xl:h-[600px] content-start">
          {images.slice(0, 36).map((image, index) => {
            const isActive = selectedImage.id === image.id
            return (
              <button
                key={image.id}
                onClick={() => changeImage(index)}
                className={`relative w-14 h-14 rounded-md overflow-hidden transition-all duration-200 origin-center ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                aria-label={`Toon ${image.title}`}
                type="button"
              >
                <ResponsiveImage
                  media={image.media}
                  fallbackUrl={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  pictureClassName="absolute inset-0"
                  sizes="64px"
                />
              </button>
            )
          })}
        </div>

        <div className="xl:hidden flex items-center justify-center h-full">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-center">
            <div className="text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
