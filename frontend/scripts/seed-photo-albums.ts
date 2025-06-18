import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '../payload.config'

async function seedPhotoAlbums() {
  const payload = await getPayloadHMR({ config })

  const photoAlbums = [
    {
      name: 'Zomerkamp 2024',
      year: 2024,
      tak: 'kapoenen',
      link: 'https://photos.app.goo.gl/example1',
      coverImage: null, // Will need to be uploaded manually
    },
    {
      name: 'Paaskamp 2024',
      year: 2024,
      tak: 'wouters',
      link: 'https://photos.app.goo.gl/example2',
      coverImage: null,
    },
    {
      name: 'Weekend Ardennen 2024',
      year: 2024,
      tak: 'jonggivers',
      link: 'https://photos.app.goo.gl/example3',
      coverImage: null,
    },
    {
      name: 'Groepsdag 2024',
      year: 2024,
      tak: 'groepsactiviteit',
      link: 'https://photos.app.goo.gl/example4',
      coverImage: null,
    },
    {
      name: 'Zomerkamp 2023',
      year: 2023,
      tak: 'givers',
      link: 'https://photos.app.goo.gl/example5',
      coverImage: null,
    },
    {
      name: 'Winterweekend 2023',
      year: 2023,
      tak: 'jin',
      link: 'https://photos.app.goo.gl/example6',
      coverImage: null,
    },
    {
      name: 'Kerstfeest 2023',
      year: 2023,
      tak: 'groepsactiviteit',
      link: 'https://photos.app.goo.gl/example7',
      coverImage: null,
    },
    {
      name: 'Paaskamp 2023',
      year: 2023,
      tak: 'kapoenen',
      link: 'https://photos.app.goo.gl/example8',
      coverImage: null,
    },
    {
      name: 'Halloweentocht 2023',
      year: 2023,
      tak: 'wouters',
      link: 'https://photos.app.goo.gl/example9',
      coverImage: null,
    },
    {
      name: 'Zomerkamp 2022',
      year: 2022,
      tak: 'jonggivers',
      link: 'https://photos.app.goo.gl/example10',
      coverImage: null,
    },
    {
      name: 'Sinterklaasfeest 2022',
      year: 2022,
      tak: 'groepsactiviteit',
      link: 'https://photos.app.goo.gl/example11',
      coverImage: null,
    },
    {
      name: 'Pinksterweekend 2022',
      year: 2022,
      tak: 'givers',
      link: 'https://photos.app.goo.gl/example12',
      coverImage: null,
    },
  ]

  console.log('🌱 Seeding photo albums...')

  for (const album of photoAlbums) {
    try {
      await payload.create({
        collection: 'photoAlbums',
        data: album,
      })
      console.log(`✅ Created album: ${album.name}`)
    } catch (error) {
      console.error(`❌ Error creating album ${album.name}:`, error)
    }
  }

  console.log('✨ Photo albums seeding completed!')
  process.exit(0)
}

seedPhotoAlbums().catch((error) => {
  console.error('Error seeding photo albums:', error)
  process.exit(1)
})