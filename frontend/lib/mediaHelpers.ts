import type { PayloadImage } from '@/components/ResponsiveImage'

const PUBLIC_MEDIA_BASE =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_URL ||
  ''

export const resolveMediaUrl = (url?: string, baseOverride?: string): string | undefined => {
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  const base = baseOverride ?? PUBLIC_MEDIA_BASE
  if (!base) return url
  return `${base}${url}`
}

const DEFAULT_SIZE_ORDER = ['lg', 'md', 'sm']
const DEFAULT_FORMAT_ORDER = ['webp', 'avif', 'jpeg', 'jpg', 'png']

export const selectMediaVariantUrl = (
  media?: PayloadImage | null,
  {
    sizePreference = DEFAULT_SIZE_ORDER,
    formatPreference = DEFAULT_FORMAT_ORDER,
    baseUrl,
  }: {
    sizePreference?: string[]
    formatPreference?: string[]
    baseUrl?: string
  } = {},
): string | undefined => {
  if (!media?.sizes) {
    return resolveMediaUrl(media?.url, baseUrl)
  }

  for (const size of sizePreference) {
    for (const format of formatPreference) {
      const variant = media.sizes?.[`${size}-${format}`]
      if (variant?.url) {
        return resolveMediaUrl(variant.url, baseUrl)
      }
    }
  }

  return resolveMediaUrl(media?.url, baseUrl)
}

export const getAllVariantUrls = (
  media?: PayloadImage | null,
  baseUrl?: string,
): string[] => {
  if (!media?.sizes) {
    const resolved = resolveMediaUrl(media?.url, baseUrl)
    return resolved ? [resolved] : []
  }

  const urls = new Set<string>()
  Object.values(media.sizes).forEach((variant) => {
    const resolved = resolveMediaUrl(variant?.url, baseUrl)
    if (resolved) urls.add(resolved)
  })

  const fallback = resolveMediaUrl(media.url, baseUrl)
  if (fallback) urls.add(fallback)

  return Array.from(urls)
}
