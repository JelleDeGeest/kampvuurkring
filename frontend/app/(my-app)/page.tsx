"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import Header from "@/components/header"
import KapoenenLogo from "@/public/logos/Kapoenen.svg"
import WoutersLogo from "@/public/logos/Wouters.svg"
import JonggiversLogo from "@/public/logos/Jonggivers.svg"
import GiversLogo from "@/public/logos/Givers.svg"
import JinLogo from "@/public/logos/Jin.svg"
import { EventCarousel } from "@/components/event-carousel"

export default function Home() {
  const [selectedTabs, setSelectedTabs] = useState<string[]>(["Alles"])

  const tabs = [
    { name: "Alles", icon: Users, color: "var(--primary-color)" },
    { name: "Kapoenen", icon: KapoenenLogo, color: "hsl(var(--kapoenen))", isImage: true },
    { name: "Wouters", icon: WoutersLogo, color: "hsl(var(--wouters))", isImage: true },
    { name: "Jonggivers", icon: JonggiversLogo, color: "hsl(var(--jonggivers))", isImage: true },
    { name: "Givers", icon: GiversLogo, color: "hsl(var(--givers))", isImage: true },
    { name: "Jins", icon: JinLogo, color: "hsl(var(--jin))", isImage: true },
  ]

  const handleTabClick = (tabName: string) => {
    if (tabName === "Alles") {
      setSelectedTabs(tabs.map(tab => tab.name))
    } else if (selectedTabs.length === tabs.length && selectedTabs.includes(tabName)) {
      setSelectedTabs([tabName])
    } else if (selectedTabs.length === 1 && selectedTabs[0] === tabName) {
      setSelectedTabs(tabs.map(tab => tab.name))
    } else {
      setSelectedTabs(prev => 
        prev.includes(tabName)
          ? prev.filter(t => t !== tabName && t !== "Alles")
          : [...prev.filter(t => t !== "Alles"), tabName]
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <EventCarousel />
        </section>

        <section className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 border-b border-border mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`flex items-center gap-2 pb-2 px-1 text-sm md:text-base font-medium transition-colors duration-200 ${
                  selectedTabs.includes(tab.name)
                    ? "border-b-2"
                    : "text-muted-foreground hover:text-primary"
                }`}
                style={selectedTabs.includes(tab.name) && tab.name !== "Alles" ? { color: tab.color, borderBottomColor: tab.color } : {}}
              >
                {tab.name === "Alles" ? (
                  <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <tab.icon className="h-5 w-5 text-current" />
                )}
                {tab.name}
              </button>
            ))}
          </div>

          <div>
            {selectedTabs.length > 0 && (
              <div className="space-y-4">
                <p className="text-md font-semibold text-primary">
                  19 april 2025
                </p>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-x-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-100 border border-orange-300 rounded">
                        <CalendarDays className="h-4 w-4 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        Speurtocht
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          ({selectedTabs.filter(t => t !== "Alles").join(", ") || "Alle takken"})
                        </span>
                      </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">14u00 tot 16u00</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Een groot avontuur wacht op jullie! Maar hoe weet je waarheen? Daar is een slim hulpmiddel voor... Kun jij raden wat het is?
                    </p>
                    <p className="mt-3 text-muted-foreground italic leading-relaxed">
                      "Ik heb geen benen, toch ga ik mee,
                      <br />
                      ik wijs je paden, over land en zee.
                      <br />
                      Volg mijn lijnen, stap voor stap,
                      <br />
                      Dan kom je er heel erg rap!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
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
