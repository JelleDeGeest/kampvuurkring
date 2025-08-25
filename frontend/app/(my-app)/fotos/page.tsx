import { Metadata } from 'next'
import { PhotoAlbumsPageClient } from './photo-albums-page.client'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

interface FotosPageGlobal {
  title: string
  subtitle: string
  banner?: {
    id: string
    alt: string
    url: string
    filename: string
    width?: number
    height?: number
  }
}

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

async function getFotosPageData(): Promise<FotosPageGlobal | null> {
  try {
    const payload = await getPayloadHMR({ config })
    
    const result = await payload.findGlobal({
      slug: 'fotosPage',
      depth: 1,
    })
    
    return result as FotosPageGlobal
  } catch (error) {
    // During build time, database might not be available
    console.warn('Database not available during build, using default fotos page data')
    return {
      title: 'Fotoalbums',
      subtitle: 'Herbeleef onze avonturen! Bekijk foto\'s van kampen, weekends en activiteiten.'
    }
  }
}

export default async function PhotosPage() {
  const [fotosPageData, photoAlbums] = await Promise.all([
    getFotosPageData(),
    getPhotoAlbums()
  ])
  
  return <PhotoAlbumsPageClient 
    fotosPageData={fotosPageData} 
    photoAlbums={photoAlbums as any} 
  />
}