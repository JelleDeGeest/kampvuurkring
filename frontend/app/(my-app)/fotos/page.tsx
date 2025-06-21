import { Metadata } from 'next'
import { PhotoAlbumsPageClient } from './photo-albums-page.client'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Foto's - Scouts Sint-Johannes",
  description: 'Bekijk onze fotoalbums van kampen, weekends en activiteiten',
}

async function getPhotoAlbums() {
  let photoAlbums: any[] = []
  
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.find({
      collection: 'photoAlbums',
      limit: 1000,
      sort: '-year',
    })
    
    photoAlbums = result.docs
  } catch (error) {
    // During build time, database might not be available
    // Return empty array to allow the build to continue
    console.warn('Database not available during build, using empty data')
  }
  
  return photoAlbums
}

export default async function PhotosPage() {
  const photoAlbums = await getPhotoAlbums()
  
  return <PhotoAlbumsPageClient photoAlbums={photoAlbums as any} />
}