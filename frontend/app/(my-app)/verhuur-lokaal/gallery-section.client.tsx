'use client'

import Gallery from './gallery.client'
import { PayloadImage } from '@/components/ResponsiveImage'

interface GalleryImage {
  id: number | string
  media?: PayloadImage
  src?: string
  alt: string
  title: string
  description?: string
  category: string
}

interface GallerySectionProps {
  title: string
  description: string
  images: GalleryImage[]
  emptyMessage?: string
}

export default function GallerySection({
  title,
  description,
  images,
  emptyMessage = 'Geen foto\'s beschikbaar. Upload foto\'s via de admin panel.'
}: GallerySectionProps) {
  return (
    <section className="pt-4 pb-8">
      <div className="container px-4 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">{title}</h2>
        <p className="text-center text-muted-foreground mb-8">
          {description}
        </p>
        {images.length > 0 ? (
          <Gallery images={images} />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        )}
      </div>
    </section>
  )
}
