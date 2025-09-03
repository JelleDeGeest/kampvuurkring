'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Search from 'lucide-react/dist/esm/icons/search'
import Camera from 'lucide-react/dist/esm/icons/camera'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Users from 'lucide-react/dist/esm/icons/users'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

interface FotosPageGlobal {
  title: string
  subtitle: string
  banner?: {
    id: number | string
    alt: string
    url: string
    filename: string
    width?: number
    height?: number
  }
}

interface PhotoAlbum {
  id: string
  name: string
  startYear: number
  endYear: number
  tak: 'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jin' | 'jowos' | 'groepsactiviteit'
  link: string
  location?: string
  coverImage: {
    url: string
    alt?: string
  }
}

interface PhotoAlbumsPageClientProps {
  fotosPageData: FotosPageGlobal | null
  photoAlbums: PhotoAlbum[]
}

const takLabels = {
  kapoenen: 'Kapoenen',
  wouters: 'Wouters',
  jonggivers: 'Jonggivers',
  givers: 'Givers',
  jin: 'Jin',
  jowos: "Jowo's",
  groepsactiviteit: 'Groepsactiviteit',
}

function calculateTakByBirthYear(birthYear: number, startYear: number, photoAlbums: PhotoAlbum[]): string[] {
  // Only process reasonable birth years (not 2, 20, etc.)
  if (birthYear < 1990 || birthYear > 2025) return []
  
  // Everyone starts scouting at age 6 (Kapoenen)
  const firstScoutYear = birthYear + 6
  
  // Calculate which year of scouting this album is for this person
  const scoutingYear = startYear - firstScoutYear + 1
  
  // Only show albums for valid scouting years (1-15)
  if (scoutingYear < 1 || scoutingYear > 15) return []
  
  // Check if Jowo's albums exist for this person's specific scout years 3-6
  const scoutYear3 = firstScoutYear + 2  // 2023 + 2 = 2025 (for years 3-4: 2025-2026, 2026-2027)
  const scoutYear4 = firstScoutYear + 3  // 2023 + 3 = 2026 
  const scoutYear5 = firstScoutYear + 4  // 2023 + 4 = 2027 (for years 5-6: 2027-2028, 2028-2029)
  const scoutYear6 = firstScoutYear + 5  // 2023 + 5 = 2028
  
  const hasJowosAlbums = photoAlbums.some(album => 
    album.tak === 'jowos' && 
    (album.startYear === scoutYear3 || album.startYear === scoutYear4 || 
     album.startYear === scoutYear5 || album.startYear === scoutYear6)
  )
  
  // Kapoenen and Givers/Jin are always the same
  if (scoutingYear >= 1 && scoutingYear <= 2) return ['kapoenen']        // Years 1-2
  if (scoutingYear >= 9 && scoutingYear <= 11) return ['givers']         // Years 9-11
  if (scoutingYear === 12) return ['jin']                                // Year 12
  if (scoutingYear >= 13) return ['jowos']                               // Year 13+ (leaders)
  
  // Dynamic progression for years 3-8 based on whether Jowo's albums exist
  if (hasJowosAlbums) {
    // Jowo's progression: Wouters (2) → Jowo's (2) → Jonggivers (2)
    if (scoutingYear >= 3 && scoutingYear <= 4) return ['wouters']       // Years 3-4
    if (scoutingYear >= 5 && scoutingYear <= 6) return ['jowos']         // Years 5-6  
    if (scoutingYear >= 7 && scoutingYear <= 8) return ['jonggivers']    // Years 7-8
  } else {
    // Normal progression: Wouters (3) → Jonggivers (3)
    if (scoutingYear >= 3 && scoutingYear <= 5) return ['wouters']       // Years 3-5
    if (scoutingYear >= 6 && scoutingYear <= 8) return ['jonggivers']    // Years 6-8
  }
  
  return []
}

// Counter animation hook with easing
function useCountUp(end: number, duration: number = 1000, delay: number = 0) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    
    if (countRef.current) {
      observer.observe(countRef.current)
    }
    
    return () => observer.disconnect()
  }, [hasStarted])
  
  useEffect(() => {
    if (!hasStarted) return
    
    let startTime: number | null = null
    let animationFrame: number
    
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime + delay
      
      const elapsed = currentTime - startTime
      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate)
        return
      }
      
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      
      setCount(Math.floor(easedProgress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, delay, hasStarted])
  
  return { count, ref: countRef }
}

export function PhotoAlbumsPageClient({ fotosPageData, photoAlbums }: PhotoAlbumsPageClientProps) {
  const [selectedTak, setSelectedTak] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [birthYear, setBirthYear] = useState<string>('')
  
  const years = useMemo(() => {
    const yearSet = new Set<string>()
    photoAlbums.forEach(album => {
      yearSet.add(`${album.startYear}-${album.endYear}`)
    })
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
  }, [photoAlbums])
  
  // Counter animations - all end at 1500ms with staggered delays
  const takkenCounter = useCountUp(7, 1500, 0)
  const yearsCounter = useCountUp(years.length, 1400, 100)
  const albumsCounter = useCountUp(photoAlbums.length, 1300, 200)
  
  const filteredAlbums = useMemo(() => {
    let filtered = photoAlbums
    
    // Filter by tak
    if (selectedTak !== 'all') {
      filtered = filtered.filter(album => album.tak === selectedTak)
    }
    
    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(album => `${album.startYear}-${album.endYear}` === selectedYear)
    }
    
    // Filter by birth year
    if (birthYear) {
      const birthYearNum = parseInt(birthYear)
      if (!isNaN(birthYearNum)) {
        filtered = filtered.filter(album => {
          const possibleTakken = calculateTakByBirthYear(birthYearNum, album.startYear, photoAlbums)
          return possibleTakken.includes(album.tak) || album.tak === 'groepsactiviteit'
        })
      }
    }
    
    return filtered
  }, [photoAlbums, selectedTak, selectedYear, birthYear])
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      {/* Banner Section */}
      {fotosPageData?.banner ? (
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
                    backgroundImage: `linear-gradient(0deg, rgba(251, 252, 252, 0.4), rgba(251, 252, 252, 0.2) 70%), url(${PAYLOAD_URL}${fotosPageData.banner.url})`,
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
                <Image
                  src={`${PAYLOAD_URL}${fotosPageData.banner.url}`}
                  alt={fotosPageData.banner.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Banner title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                    {fotosPageData.title}
                  </h1>
                  <p className="text-lg md:text-xl drop-shadow-lg">
                    {fotosPageData.subtitle}
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
              {fotosPageData?.title || 'Fotoalbums'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {fotosPageData?.subtitle || 'Herbeleef onze avonturen! Bekijk foto\'s van kampen, weekends en activiteiten.'}
            </p>
          </div>
        </section>
      )}
      
      <main className="flex-1">
        {/* Stats and Filters Section */}
        <section className="container px-4 lg:px-12 pt-6">
          <div className="w-full">            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div ref={takkenCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-accent">{takkenCounter.count}</p>
              <p className="text-sm text-muted-foreground">Takken</p>
            </div>
            <div ref={yearsCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-secondary">{yearsCounter.count}</p>
              <p className="text-sm text-muted-foreground">Jaren</p>
            </div>
            <div ref={albumsCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">{albumsCounter.count}</p>
              <p className="text-sm text-muted-foreground">Albums</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">∞</p>
              <p className="text-sm text-muted-foreground">Herinneringen</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 relative z-50">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-primary" />
              Filter Albums
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="tak-filter" className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  Filter op tak
                </Label>
                <Select value={selectedTak} onValueChange={setSelectedTak}>
                  <SelectTrigger className="bg-white border-input hover:border-primary focus:border-primary transition-all duration-200">
                    <SelectValue placeholder={selectedTak === 'all' ? 'Alle takken' : takLabels[selectedTak as keyof typeof takLabels] || 'Alle takken'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle takken</SelectItem>
                    {Object.entries(takLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="year-filter" className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  Filter op scoutsjaar
                </Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-white border-input hover:border-primary focus:border-primary transition-all duration-200">
                    <SelectValue placeholder={selectedYear === 'all' ? 'Alle scoutsjaren' : selectedYear} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle scoutsjaren</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="birth-year" className="flex items-center mb-2">
                  <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                  Zoek op geboortejaar
                </Label>
                <Input
                  id="birth-year"
                  type="number"
                  placeholder="bijv. 2010"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  min="1990"
                  max={new Date().getFullYear()}
                  className="bg-white border-input hover:border-primary focus:border-primary transition-all duration-200"
                />
              </div>
            </div>
          </div>
          </div>
        </section>
        
        {/* Photo Albums Grid */}
        <div className="container px-4 lg:px-12 py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAlbums.map((album) => (
              <a
                key={album.id}
                href={album.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="bg-gradient-to-br from-card to-secondary/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border/50 shadow-sm">
                  <CardContent className="p-0">
                    <div className="aspect-[16/10] w-full overflow-hidden relative">
                      {album.coverImage?.url ? (
                        <img
                          src={album.coverImage.url}
                          alt={album.coverImage.alt || album.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Camera className="h-16 w-16 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {album.name}
                      </h3>
                      <div className="h-5 mt-1">
                        {album.location ? (
                          <p className="text-sm text-muted-foreground">
                            📍 {album.location}
                          </p>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {album.startYear}-{album.endYear}
                        </span>
                        <span>{takLabels[album.tak]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          {filteredAlbums.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Geen fotoalbums gevonden met de huidige filters.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Probeer andere filters of verwijder de filters om alle albums te zien.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}