import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"

interface PageBannerProps {
  banner?: (PayloadImage & { id: number | string }) | null
  title: string
  subtitle: string
  resolvedBannerImageUrl?: string
}

export default function PageBanner({
  banner,
  title,
  subtitle,
  resolvedBannerImageUrl
}: PageBannerProps) {
  const glowBackgroundImage = resolvedBannerImageUrl
    ? `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${resolvedBannerImageUrl})`
    : 'linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), linear-gradient(to bottom, #87CEEB, #5F9EA0, #2E8B57)'

  return (
    <>
      {/* Banner Section */}
      {banner ? (
        <section className="container px-4 lg:px-12 pt-8">
          <div className="relative w-full h-[150px] md:h-[180px] lg:h-[220px] rounded-2xl overflow-visible">
            {/* Container for outer glow effect */}
            <div className="absolute inset-y-[-30px] inset-x-[-100vw] left-0 right-0 pointer-events-none z-0">
              <div className="absolute inset-0">
                {/* Glow effect */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: glowBackgroundImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(50px) saturate(350%) opacity(35%)',
                    transform: 'scale(1.5, 0.9) translateY(-12%)',
                    transformOrigin: 'center',
                  }}
                />
              </div>
            </div>

            {/* Banner content */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden z-10">
              {/* Banner image */}
              <div className="absolute inset-0">
                <ResponsiveImage
                  media={banner}
                  fallbackUrl={resolvedBannerImageUrl}
                  alt={banner.alt || `Banner afbeelding ${title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>

              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Banner title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                    {title}
                  </h1>
                  <p className="text-lg md:text-xl drop-shadow-lg">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Fallback header when no banner is active */
        <section className="container px-4 lg:px-12 pt-8">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </section>
      )}
    </>
  )
}
