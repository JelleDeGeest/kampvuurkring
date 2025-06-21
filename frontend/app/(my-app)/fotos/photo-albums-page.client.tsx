'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Search from 'lucide-react/dist/esm/icons/search'
import Camera from 'lucide-react/dist/esm/icons/camera'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Users from 'lucide-react/dist/esm/icons/users'

interface PhotoAlbum {
  id: string
  name: string
  year: number
  tak: 'kapoenen' | 'wouters' | 'jonggivers' | 'givers' | 'jin' | 'groepsactiviteit'
  link: string
  location?: string
  coverImage: {
    url: string
    alt?: string
  }
}

interface PhotoAlbumsPageClientProps {
  photoAlbums: PhotoAlbum[]
}

const takLabels = {
  kapoenen: 'Kapoenen',
  wouters: 'Wouters',
  jonggivers: 'Jonggivers',
  givers: 'Givers',
  jin: 'Jin',
  groepsactiviteit: 'Groepsactiviteit',
}

function calculateTakByBirthYear(birthYear: number, albumYear: number): string[] {
  const age = albumYear - birthYear
  const schoolYear = age - 6 // Approximate school year (assuming age 6 in 1st grade)
  
  if (schoolYear >= 1 && schoolYear <= 2) return ['kapoenen']
  if (schoolYear >= 3 && schoolYear <= 5) return ['wouters']
  if (schoolYear >= 6 && schoolYear <= 8) return ['jonggivers'] // 6e leerjaar - 2e middelbaar
  if (schoolYear >= 9 && schoolYear <= 11) return ['givers'] // 3e - 5e middelbaar
  if (schoolYear === 12) return ['jin'] // 6e middelbaar
  
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

export function PhotoAlbumsPageClient({ photoAlbums }: PhotoAlbumsPageClientProps) {
  const [selectedTak, setSelectedTak] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [birthYear, setBirthYear] = useState<string>('')
  
  const years = useMemo(() => {
    return Array.from(new Set(photoAlbums.map(album => album.year))).sort((a, b) => b - a)
  }, [photoAlbums])
  
  // Counter animations - all end at 1500ms with staggered delays
  const takkenCounter = useCountUp(6, 1500, 0)
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
      filtered = filtered.filter(album => album.year === parseInt(selectedYear))
    }
    
    // Filter by birth year
    if (birthYear) {
      const birthYearNum = parseInt(birthYear)
      if (!isNaN(birthYearNum)) {
        filtered = filtered.filter(album => {
          const possibleTakken = calculateTakByBirthYear(birthYearNum, album.year)
          return possibleTakken.includes(album.tak) || album.tak === 'groepsactiviteit'
        })
      }
    }
    
    return filtered
  }, [photoAlbums, selectedTak, selectedYear, birthYear])
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section with full background */}
        <section className="relative bg-primary/5 py-12 overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-3">
                <Camera className="h-10 w-10 text-primary mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-heading">
                  Fotoalbums
                </h1>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Herbeleef onze avonturen! Bekijk foto's van kampen, weekends en activiteiten.
              </p>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div ref={takkenCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-accent">{takkenCounter.count}</p>
              <p className="text-sm text-muted-foreground">Takken</p>
            </div>
            <div ref={yearsCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-secondary">{yearsCounter.count}</p>
              <p className="text-sm text-muted-foreground">Jaren</p>
            </div>
            <div ref={albumsCounter.ref} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">{albumsCounter.count}</p>
              <p className="text-sm text-muted-foreground">Albums</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-primary">∞</p>
              <p className="text-sm text-muted-foreground">Herinneringen</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-border/50 p-6 relative z-50">
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
                  Filter op jaar
                </Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-white border-input hover:border-primary focus:border-primary transition-all duration-200">
                    <SelectValue placeholder={selectedYear === 'all' ? 'Alle jaren' : selectedYear} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle jaren</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
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
        <div className="container mx-auto px-4 py-8">
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
                      {album.location && (
                        <p className="text-sm text-muted-foreground mt-1">
                          📍 {album.location}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {album.year}
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