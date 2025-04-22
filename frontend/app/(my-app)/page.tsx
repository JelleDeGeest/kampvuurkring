"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { format } from "date-fns"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Compass,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  Tent,
  Mountain,
  TreePine,
  CaravanIcon as Campground,
  LogIn,
  CalendarDays,
  Crown,
  Rabbit,
  Bike,
  Sailboat,
  Sparkles,
  Loader2,
} from "lucide-react"
import Header from "@/components/header"
import KapoenenLogo from "@/public/logos/Kapoenen.svg"
import WoutersLogo from "@/public/logos/Wouters.svg"
import JonggiversLogo from "@/public/logos/Jonggivers.svg"
import GiversLogo from "@/public/logos/Givers.svg"
import JinLogo from "@/public/logos/Jin.svg"
import { EventCarousel } from "@/components/event-carousel"
import PayloadRichText from "@/components/PayloadRichText"

export default function Home() {
  const tabs = [
    { name: "Alles",      value: "__all__", icon: Users,          color: "var(--primary-color)", isImage: false },
    { name: "Kapoenen",   value: "kapoenen",   icon: KapoenenLogo,   color: "hsl(var(--kapoenen))",   isImage: true },
    { name: "Wouters",    value: "wouters",    icon: WoutersLogo,    color: "hsl(var(--wouters))",    isImage: true },
    { name: "Jonggivers", value: "jonggivers", icon: JonggiversLogo, color: "hsl(var(--jonggivers))", isImage: true },
    { name: "Givers",     value: "givers",     icon: GiversLogo,     color: "hsl(var(--givers))",     isImage: true },
    { name: "Jin",        value: "jin",        icon: JinLogo,        color: "hsl(var(--jin))",        isImage: true },
  ] as const
  type TabValue = typeof tabs[number]['value']
  const ALL: TabValue = '__all__'

  // ---- selection state ----------------------------------------------------
  const readStorage = (): TabValue[] => {
    if (typeof window === 'undefined') return [ALL]
    try {
      const raw = window.localStorage.getItem('selectedTabs')
      const parsed: unknown = raw ? JSON.parse(raw) : null
      return Array.isArray(parsed)
        ? parsed.filter((v): v is TabValue => v === ALL || tabs.some(t => t.value === v))
        : [ALL]
    } catch {
      return [ALL]
    }
  }

  const [selectedTabs, setSelectedTabs] = useState<TabValue[]>([])
  useEffect(() => setSelectedTabs(readStorage()), [])

  const tabMap = Object.fromEntries(tabs.map(t => [t.name, t]))
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in')

  // Fetch activities whenever selectedTabs change
  useEffect(() => {
    const controller = new AbortController()
    
    // First load or tab change
    const handleLoad = async () => {
      try {
        // Start fade out if not initial load
        if (initialLoaded) {
          setFadeState('out')
          
          // Wait for fade out transition
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        
        setIsLoading(true)
        
        // Build query for selected divisions
        const divs = selectedTabs.includes(ALL) ? [] : selectedTabs
        const query = divs.length
          ? `?where[division][in]=${divs.join(",")}&sort=startDate`
          : "?sort=startDate"
        
        // Fetch data
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}/api/activiteiten${query}`,
          { signal: controller.signal, cache: "no-store" }
        )
        
        const data = await res.json()
        setActivities(data?.docs ?? [])
        
        // Small delay before showing new content
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // Show new content
        setIsLoading(false)
        setFadeState('in')
        setInitialLoaded(true)
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err)
        setIsLoading(false)
        setFadeState('in')
        setInitialLoaded(true)
      }
    }
    
    handleLoad()
    
    return () => controller.abort()
  }, [selectedTabs])

  // Add CSS for transitions
  const fadeStyle = {
    opacity: fadeState === 'in' ? 1 : 0,
    transition: 'opacity 300ms ease-in-out',
  }

  interface Activity {
    id: string
    title: string
    division: string
    startDate: string
    endDate: string
    description: { root: any } // lexical JSON; render simple text excerpt
  }

  const handleTabClick = (value: TabValue) => {
    if (value === ALL) {
      setSelectedTabs([ALL])
      return
    }
    setSelectedTabs(prev => {
      let next: TabValue[]
      if (prev.includes(value)) {
        next = prev.filter(v => v !== value)
        if (next.length === 0) next = [ALL]
      } else {
        next = [...prev.filter(v => v !== ALL), value]
      }
      return next
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('selectedTabs', JSON.stringify(selectedTabs))
    }
  }, [selectedTabs])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <EventCarousel />
        </section>

        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Activities Section - 2/3 width */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 border-b border-border mb-6">
                {tabs.map(tab => {
                  const isAllSelected = selectedTabs.includes(ALL);
                  const isActive = isAllSelected || selectedTabs.includes(tab.value as TabValue);

                  return (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab.value as TabValue)}
                    className={`flex items-center gap-2 pb-2 px-1 text-sm md:text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-b-2"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    style={isActive ? { color: tab.color, borderBottomColor: tab.color } : {}}
                  >
                    {tab.value === ALL ? (
                      <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <tab.icon 
                        className="h-5 w-5" 
                        style={{ color: isActive ? tab.color : 'currentColor' }} 
                      />
                    )}
                    {tab.name}
                  </button>
                )})}
              </div>

              <div>
                {isLoading && !initialLoaded ? (
                  // Loading wheel for initial page load only
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  </div>
                ) : (
                  // Actual content with fade transition
                  <div style={fadeStyle}>
                    {(() => {
                      // Group activities by date (ignoring time)
                      const dateGroups = activities.reduce((groups: Record<string, Activity[]>, activity) => {
                        const date = new Date(activity.startDate);
                        const dateStr = format(date, 'yyyy-MM-dd');
                        
                        if (!groups[dateStr]) {
                          groups[dateStr] = [];
                        }
                        
                        groups[dateStr].push(activity);
                        return groups;
                      }, {});
                      
                      // Convert to array and sort by date
                      return Object.entries(dateGroups)
                        .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                        .map(([dateStr, activitiesForDate]) => {
                          const date = new Date(dateStr);
                          
                          return (
                            <div key={dateStr} className="mb-8">
                              <h3 className="text-xl font-bold mb-4 text-primary">
                                {format(date, 'EEEE d MMMM yyyy')}
                              </h3>
                              <div className="space-y-6">
                                {activitiesForDate.map(act => {
                                  const tabMeta = tabs.find(t => t.value === act.division);
                                  if (!tabMeta) return null;

                                  return (
                                    <Card key={act.id} className="border-2">
                                      <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                          <div className="flex items-center gap-3">
                                            <div
                                              className="p-0.5 border rounded flex items-center justify-center"
                                              style={{ backgroundColor: `${tabMeta.color}20`, borderColor: tabMeta.color }}
                                            >
                                              {tabMeta.isImage ? (
                                                <tabMeta.icon 
                                                  className="h-7 w-7" 
                                                  style={{ color: tabMeta.color }} 
                                                />
                                              ) : (
                                                <tabMeta.icon 
                                                  className="h-7 w-7" 
                                                  style={{ color: tabMeta.color }}
                                                />
                                              )}
                                            </div>
                                            
                                            <div className="flex flex-col justify-center">
                                              <span className="text-sm text-muted-foreground leading-tight">
                                                {format(new Date(act.startDate), "HH'u'mm")} tot {format(new Date(act.endDate), "HH'u'mm")}
                                              </span>
                                              <CardTitle className="text-xl font-bold text-foreground leading-tight">
                                                {act.title}
                                              </CardTitle>
                                            </div>
                                          </div>
                                          
                                          <span className="text-sm font-normal text-gray-500">
                                            {tabMeta.name}
                                          </span>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="pt-0 pb-1">
                                        <div className="text-muted-foreground leading-relaxed mb-0">
                                          <PayloadRichText content={act.description} />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        });
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Important Dates Section - 1/3 width */}
            <div className="w-full lg:w-1/3">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-primary">Belangrijke Data</h2>
                
                {/* Evenementen */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Evenementen</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">24-25 augustus</div>
                      <div className="font-medium">Overgang</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">15 december</div>
                      <div className="font-medium">Kerstfeest</div>
                    </div>
                  </div>
                </div>
                
                {/* Weekends */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Weekends</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">18-20 oktober</div>
                      <div className="font-medium">Herfstweekend</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">7-9 maart</div>
                      <div className="font-medium">Lenteweekend</div>
                    </div>
                  </div>
                </div>
                
                {/* Kampen */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary">Kampen</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">10-15 april</div>
                      <div className="font-medium">Paaskamp</div>
                    </div>
                    <div className="border-l-4 pl-3 py-1 border-primary">
                      <div className="text-sm text-muted-foreground">15-25 juli</div>
                      <div className="font-medium">Groot Kamp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-border bg-background mt-12">
        <div className="w-full h-2 bg-secondary"></div>
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Scouts Sint-Johannes. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  )
}