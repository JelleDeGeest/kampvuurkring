import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config })

    // First, check if we have any media items to use as placeholders
    const media = await payload.find({
      collection: 'media',
      limit: 1,
    })

    const placeholderImageId = media.docs[0]?.id || null

    const photoAlbums = [
      {
        name: 'Zomerkamp 2024 - Kapoenen',
        year: 2024,
        tak: 'kapoenen' as 'kapoenen',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Paaskamp 2024 - Wouters',
        year: 2024,
        tak: 'wouters' as 'wouters',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Weekend Ardennen 2024 - Jonggivers',
        year: 2024,
        tak: 'jonggivers' as 'jonggivers',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Groepsdag 2024',
        year: 2024,
        tak: 'groepsactiviteit' as 'groepsactiviteit',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Zomerkamp 2023 - Givers',
        year: 2023,
        tak: 'givers' as 'givers',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Winterweekend 2023 - Jin',
        year: 2023,
        tak: 'jin' as 'jin',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Kerstfeest 2023',
        year: 2023,
        tak: 'groepsactiviteit' as 'groepsactiviteit',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Paaskamp 2023 - Kapoenen',
        year: 2023,
        tak: 'kapoenen' as 'kapoenen',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Halloweentocht 2023 - Wouters',
        year: 2023,
        tak: 'wouters' as 'wouters',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Zomerkamp 2022 - Jonggivers',
        year: 2022,
        tak: 'jonggivers' as 'jonggivers',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Sinterklaasfeest 2022',
        year: 2022,
        tak: 'groepsactiviteit' as 'groepsactiviteit',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
      {
        name: 'Pinksterweekend 2022 - Givers',
        year: 2022,
        tak: 'givers' as 'givers',
        link: 'https://photos.google.com',
        coverImage: placeholderImageId,
      },
    ]

    const results = []

    for (const album of photoAlbums) {
      try {
        const created = await payload.create({
          collection: 'photoAlbums',
          data: album,
        })
        results.push({ success: true, name: album.name, id: created.id })
      } catch (error) {
        results.push({ success: false, name: album.name, error: error.message })
      }
    }

    return NextResponse.json({
      message: 'Photo albums seeding completed',
      results,
      totalCreated: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to seed photo albums', details: error.message },
      { status: 500 }
    )
  }
}