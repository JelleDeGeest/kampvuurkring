import { Metadata } from 'next'
import { PhotoAlbumsPageClient } from './photo-albums-page.client'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export const metadata: Metadata = {
  title: "Foto's - Scouts Sint-Johannes",
  description: 'Bekijk onze fotoalbums van kampen, weekends en activiteiten',
}

async function getPhotoAlbums() {
  const payload = await getPayloadHMR({ config })
  
  const photoAlbums = await payload.find({
    collection: 'photoAlbums',
    limit: 1000,
    sort: '-year',
  })
  
  return photoAlbums.docs
}

export default async function PhotosPage() {
  const photoAlbums = await getPhotoAlbums()
  
  return <PhotoAlbumsPageClient photoAlbums={photoAlbums} />
}