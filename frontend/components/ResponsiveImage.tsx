import * as React from 'react'
import { cn } from '@/lib/utils'
import { resolveMediaUrl } from '@/lib/mediaHelpers'

const DIMENSION_WIDTH_LOOKUP: Record<string, number> = {
  sm: 480,
  md: 1024,
  lg: 1920,
}

const FORMAT_PREFERENCE = ['avif', 'webp', 'jpeg', 'jpg', 'png'] as const

const formatToMime = (format?: string) => {
  switch (format) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'avif':
      return 'image/avif'
    default:
      return format ? `image/${format}` : undefined
  }
}

export type PayloadImageVariant = {
  url?: string
  width?: number
  height?: number
  mimeType?: string
  filename?: string
}

export type PayloadImage = PayloadImageVariant & {
  alt?: string
  sizes?: Record<string, PayloadImageVariant | undefined>
}

export type ResponsiveImageProps = Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'src' | 'srcSet'
> & {
  media?: PayloadImage | null
  fallbackUrl?: string
  pictureClassName?: string
  fill?: boolean
  priority?: boolean
  baseUrl?: string
}

type VariantEntry = {
  format: string
  width: number
  height?: number
  url: string
  mimeType?: string
}

const extractVariants = (
  media?: PayloadImage | null,
  baseUrl?: string,
): Map<string, VariantEntry[]> => {
  const grouped = new Map<string, VariantEntry[]>()

  if (!media?.sizes) {
    return grouped
  }

  Object.entries(media.sizes).forEach(([key, value]) => {
    if (!value) return
    const url = resolveMediaUrl(value.url ?? undefined, baseUrl)
    if (!url) return

    const [dimensionKey, rawFormat] = key.split('-')
    const width = value.width ?? DIMENSION_WIDTH_LOOKUP[dimensionKey] ?? value.height ?? 0
    if (!width) return

    const format = (rawFormat ?? value.mimeType?.split('/')?.pop() ?? '').toLowerCase()

    const entry: VariantEntry = {
      format,
      width,
      height: value.height,
      url,
      mimeType: value.mimeType ?? formatToMime(format),
    }

    if (!grouped.has(format)) {
      grouped.set(format, [])
    }

    grouped.get(format)?.push(entry)
  })

  // Ensure ascending order by width for each format
  grouped.forEach((entries, format) => {
    grouped.set(
      format,
      entries
        .filter((entry) => Boolean(entry.url))
        .sort((a, b) => a.width - b.width),
    )
  })

  return grouped
}

export const ResponsiveImage = React.forwardRef<HTMLImageElement, ResponsiveImageProps>(
  (
    {
      media,
      fallbackUrl,
      pictureClassName,
      fill = false,
      priority = false,
      baseUrl,
      className,
      loading: loadingProp,
      fetchPriority: fetchPriorityProp,
      sizes: sizesProp,
      alt: altProp,
      ...rest
    },
    ref,
  ) => {
    const variantsByFormat = React.useMemo(
      () => extractVariants(media, baseUrl),
      [media, baseUrl],
    )

    const fallbackFormatEntries = FORMAT_PREFERENCE.map(
      (format) => variantsByFormat.get(format),
    ).find((entries): entries is VariantEntry[] => Array.isArray(entries) && entries.length > 0)

    const fallbackVariant =
      fallbackFormatEntries && fallbackFormatEntries.length > 0
        ? fallbackFormatEntries[fallbackFormatEntries.length - 1]
        : undefined

    const resolvedFallbackSrc =
      fallbackVariant?.url ?? resolveMediaUrl(media?.url, baseUrl) ?? resolveMediaUrl(fallbackUrl, baseUrl)

    if (!resolvedFallbackSrc) {
      return null
    }

    const sources = FORMAT_PREFERENCE.map((format) => {
      const entries = variantsByFormat.get(format)
      if (!entries?.length) return null

      const srcSet = entries.map((entry) => `${entry.url} ${entry.width}w`).join(', ')
      const mimeType = formatToMime(entries[0]?.format ?? format) ?? entries[0]?.mimeType
      return {
        type: mimeType,
        srcSet,
      }
    }).filter(Boolean) as { type?: string; srcSet: string }[]

    const fallbackSrcSet = fallbackFormatEntries
      ?.map((entry) => `${entry.url} ${entry.width}w`)
      .join(', ')

    const sizes = sizesProp ?? '100vw'
    const loading = priority ? 'eager' : loadingProp
    const fetchPriority = fetchPriorityProp ?? (priority ? 'high' : undefined)

    const { width: widthProp, height: heightProp, ...restImgProps } = rest as {
      width?: number
      height?: number
      [key: string]: unknown
    }

    const widthAttr = fill ? undefined : widthProp ?? fallbackVariant?.width ?? media?.width
    const heightAttr = fill ? undefined : heightProp ?? fallbackVariant?.height ?? media?.height

    const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
      ...restImgProps,
      src: resolvedFallbackSrc,
      srcSet: fallbackSrcSet,
      sizes,
      loading,
      fetchPriority,
      width: widthAttr,
      height: heightAttr,
      alt: altProp ?? media?.alt ?? '',
      className: cn(fill && 'absolute inset-0 h-full w-full', className),
    }

    if (!imgProps.width) delete imgProps.width
    if (!imgProps.height) delete imgProps.height
    if (!imgProps.fetchPriority) delete imgProps.fetchPriority
    if (!imgProps.srcSet) delete imgProps.srcSet

    return (
      <picture className={cn(fill && 'contents', pictureClassName)}>
        {sources.map((source) => (
          <source key={source.type ?? source.srcSet} type={source.type} srcSet={source.srcSet} sizes={sizes} />
        ))}
        <img ref={ref} {...imgProps} />
      </picture>
    )
  },
)

ResponsiveImage.displayName = 'ResponsiveImage'

