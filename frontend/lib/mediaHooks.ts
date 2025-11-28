import path from 'path'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { customAlphabet } from 'nanoid'


const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 21)

// Initialize S3 client for CDN bucket
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
})

const ORIGINALS_BUCKET = process.env.S3_ORIGINALS_BUCKET || 'media-original'
const CDN_BUCKET = process.env.S3_CDN_BUCKET || 'media-cdn'

export const deriveMediaLabel = (data?: Record<string, unknown>): string | undefined => {
  if (!data) return undefined

  const candidates = [
    data.displayName,
    data.name,
    data.title,
    data.originalFilename,
    data.filename,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim()
    }
  }

  return undefined
}

export const displayNameField = {
  name: 'displayName',
  type: 'text' as const,
  label: 'Naam',
  admin: {
    description: 'Automatisch ingevuld met de originele bestandsnaam (kan aangepast worden)',
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData, originalDoc }: any) => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return value
        }

        return (
          deriveMediaLabel(siblingData) ||
          deriveMediaLabel(originalDoc) ||
          (typeof value === 'string' ? value : '')
        )
      },
    ],
    afterRead: [
      ({ value, data }: any) => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return value
        }

        return deriveMediaLabel(data) || ''
      },
    ],
  },
}

export const autoAltField = {
  name: 'alt',
  type: 'text' as const,
  label: 'Alt tekst',
  admin: {
    hidden: true,
    readOnly: true,
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData, originalDoc }: any) => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return value
        }

        return deriveMediaLabel(siblingData) || deriveMediaLabel(originalDoc) || ''
      },
    ],
    afterRead: [
      ({ value, data }: any) => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return value
        }

        return deriveMediaLabel(data) || ''
      },
    ],
  },
}

const dimensionPresets = [
  { key: 'sm', width: 480 },
  { key: 'md', width: 1024 },
  { key: 'lg', width: 1920 },
] as const

const formatPresets = [
  { key: 'avif', format: 'avif', options: { quality: 50 } },
  { key: 'webp', format: 'webp', options: { quality: 80 } },
  { key: 'jpeg', format: 'jpeg', options: { quality: 82, progressive: true } },
] as const

export const imageVariantSizes = dimensionPresets.flatMap((dimension) =>
  formatPresets.map((format) => ({
    name: `${dimension.key}-${format.key}` as const,
    width: dimension.width,
    fit: 'inside' as const,
    withoutEnlargement: true,
    formatOptions: {
      format: format.format as 'avif' | 'webp' | 'jpeg',
      options: format.options as Record<string, number | boolean>,
    },
  })),
)

const buildUniqueFilename = (originalFilename: string): string => {
  const ext = path.extname(originalFilename || '').toLowerCase()
  const suffix = ext || ''
  return `${nanoid()}${suffix}`
}

const normaliseFileName = (
  file: any,
  uniqueFilename: string,
  originalFilename: string,
): void => {
  if (!file) return

  file.name = uniqueFilename

  if (typeof file.filename === 'string') {
    file.filename = uniqueFilename
  }

  file.originalFilename = originalFilename
  file.kampvuurGeneratedFilename = uniqueFilename
}

/**
 * Hook executed in beforeOperation to ensure S3 uploads use a unique filename
 * while storing the original name alongside the document data.
 */
export const prepareUniqueFilename = async ({ args, operation }: any) => {
  if (!(operation === 'create' || operation === 'update')) {
    return args
  }

  const { req } = args
  const file = req?.file

  if (!file) {
    return args
  }

  const originalFilename: string = file.originalname || file.name || file.filename

  if (!originalFilename) {
    return args
  }

  const uniqueFilename = buildUniqueFilename(originalFilename)

  normaliseFileName(file, uniqueFilename, originalFilename)

  const nextData: Record<string, any> = {
    ...(args.data || {}),
    originalFilename,
  }

  const shouldUseString = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0

  if (!shouldUseString(nextData.displayName)) {
    nextData.displayName = originalFilename
  }

  if (!shouldUseString(nextData.name)) {
    nextData.name = originalFilename
  }

  const altFallback =
    (shouldUseString(nextData.displayName) && nextData.displayName) ||
    (shouldUseString(nextData.name) && nextData.name) ||
    originalFilename

  if (!shouldUseString(nextData.alt)) {
    nextData.alt = altFallback
  }

  args.data = nextData

  console.log(
    `📝 Generated unique filename: ${uniqueFilename} (original: ${originalFilename})`,
  )

  return args
}

/**
 * Hook to copy uploaded image to CDN bucket
 */
const copyObjectToCDN = async (key: string, mimeType?: string) => {
  if (!key) return

  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: ORIGINALS_BUCKET,
        Key: key,
      }),
    )

    const fileBuffer = await response.Body?.transformToByteArray()

    if (!fileBuffer) {
      console.error(`❌ Could not read file from originals bucket: ${key}`)
      return
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: CDN_BUCKET,
        Key: key,
        Body: Buffer.from(fileBuffer),
        ContentType: mimeType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    )

    console.log(`✅ Copied ${key} to CDN bucket`)
  } catch (error) {
    console.error(`Error copying ${key} to CDN bucket:`, error)
  }
}

const deleteObjectFromOriginals = async (key: string) => {
  if (!key) return

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: ORIGINALS_BUCKET,
        Key: key,
      }),
    )
  } catch (error) {
    if (error?.name !== 'NoSuchKey') {
      console.error(`Error deleting ${key} from originals bucket:`, error)
    }
  }
}

const deleteObjectFromCDN = async (key: string) => {
  if (!key) return

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: CDN_BUCKET,
        Key: key,
      }),
    )
  } catch (error) {
    console.error(`Error deleting ${key} from CDN bucket:`, error)
  }
}

/**
 * Hook to copy uploaded files and all generated variants to CDN bucket
 * Now handles both images and other file types (PDFs, documents, etc.)
 */
export const copyCDN = async ({ doc, previousDoc, operation }) => {
  if (!(operation === 'create' || operation === 'update')) {
    return doc
  }

  // Skip if this is just a metadata update (filename and focal point haven't changed)
  if (
    operation === 'update' &&
    previousDoc?.filename === doc.filename &&
    previousDoc?.focalX === doc.focalX &&
    previousDoc?.focalY === doc.focalY
  ) {
    return doc
  }

  try {
    // Always copy the main file to CDN (images, PDFs, etc.)
    await copyObjectToCDN(doc.filename, doc.mimeType)

    // For images, also copy all generated variants
    if (doc.mimeType?.startsWith('image/') && doc?.sizes && typeof doc.sizes === 'object') {
      const entries = Object.values(doc.sizes).filter((variant: any) => Boolean(variant?.filename))

      await Promise.all(
        entries.map(async (variant: any) => {
          await copyObjectToCDN(variant.filename, variant.mimeType ?? doc.mimeType)
          await deleteObjectFromOriginals(variant.filename)
        }),
      )
    }

    return doc
  } catch (error) {
    console.error('Error copying assets to CDN:', error)
    return doc
  }
}

export const cleanupCDN = async ({ doc }) => {
  const keys = new Set<string>()

  if (doc?.filename) {
    keys.add(doc.filename)
  }

  if (doc?.sizes && typeof doc.sizes === 'object') {
    Object.values(doc.sizes).forEach((variant: any) => {
      if (variant?.filename) {
        keys.add(variant.filename)
      }
    })
  }

  if (keys.size === 0) {
    return doc
  }

  await Promise.all(Array.from(keys).map(async (key) => {
    await deleteObjectFromCDN(key)
    await deleteObjectFromOriginals(key)
  }))

  return doc
}

/**
 * Field to add to media collections to store original filename
 */
export const originalFilenameField = {
  name: 'originalFilename',
  type: 'text' as const,
  label: 'Original Filename',
  admin: {
    readOnly: true,
    description: 'The original name of the uploaded file',
    condition: ({ user }) => Boolean(user?.roles?.includes('admin')),
  },
}
