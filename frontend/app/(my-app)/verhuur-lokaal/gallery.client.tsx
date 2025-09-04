'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  description?: string
  category: string
}

interface GalleryProps {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Geen foto's beschikbaar. Upload foto's via de admin panel.</p>
      </div>
    )
  }
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageA, setImageA] = useState(images[0])
  const [imageB, setImageB] = useState<GalleryImage>(images[0]) // Initialize with the same image
  const [showB, setShowB] = useState(false)
  
  const selectedImage = showB ? imageB : imageA
  
  const changeImage = (newIndex: number) => {
    const newImage = images[newIndex]
    if (selectedImage.id === newImage.id) return
    
    setCurrentIndex(newIndex)
    
    if (showB) {
      // B is showing, load new image into A and crossfade to A
      setImageA(newImage)
      setShowB(false)
    } else {
      // A is showing, load new image into B and crossfade to B
      setImageB(newImage)
      setShowB(true)
    }
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    changeImage(nextIndex)
  }
  
  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    changeImage(prevIndex)
  }
  
  // Update currentIndex when selectedImage changes (from thumbnail click)
  useEffect(() => {
    const index = images.findIndex(img => img.id === selectedImage.id)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [selectedImage, images])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Main Image Viewer */}
      <div className="xl:col-span-3">
        <div className="group relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-100">
          {/* Image A */}
          <Image
            src={imageA.src}
            alt={imageA.alt}
            fill
            className={`absolute object-cover transition-opacity duration-700 ease-in-out ${
              showB ? 'opacity-0' : 'opacity-100'
            }`}
            priority
          />
          
          {/* Image B */}
          <Image
            src={imageB.src}
            alt={imageB.alt}
            fill
            className={`absolute object-cover transition-opacity duration-700 ease-in-out ${
              showB ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
          
          {/* Navigation arrows - visible on all screens */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/80 transition-all duration-500 ease-out opacity-0 hover:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/80 transition-all duration-500 ease-out opacity-0 hover:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <h3 className="text-white font-medium">{selectedImage.title}</h3>
          </div>
        </div>
      </div>

      {/* Thumbnail Grid - Right side on large screens, counter on small screens */}
      <div className="xl:col-span-1">
        {/* Thumbnail grid - only visible on larger screens */}
        <div className="hidden xl:grid grid-cols-4 gap-x-1 gap-y-3 xl:h-[600px] content-start">
          {/* Actual images */}
          {images.slice(0, 36).map((image) => (
            <button
              key={image.id}
              onClick={() => {
                const index = images.findIndex(img => img.id === image.id)
                changeImage(index)
              }}
              className={`relative w-14 h-14 rounded-md overflow-hidden transition-all duration-200 origin-center ${
                selectedImage.id === image.id
                  ? 'scale-125'
                  : 'opacity-80 hover:opacity-100 hover:scale-105'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
        
        {/* Image counter - visible on small and medium screens */}
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