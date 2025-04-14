import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Tent, MapPin, Clock } from "lucide-react"
import Header from "@/components/header"

export default function Ratel() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[color:var(--primary-color)]">
                  Ratel
                </h1>
                <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bekijk hier het weekprogramma voor alle divisies van Scouts Sint-Johannes
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Welpen (7-10 jaar) */}
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Welpen</CardTitle>
                  </div>
                  <p className="text-sm text-[color:var(--text-color)]/70">7-10 jaar</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Zaterdag 13:30 - 16:30</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Buitenavontuur & Spellen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <MapPin className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Locatie</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Scoutslokaal & Buiten</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scouts (11-14 jaar) */}
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Tent className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Scouts</CardTitle>
                  </div>
                  <p className="text-sm text-[color:var(--text-color)]/70">11-14 jaar</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Zaterdag 14:00 - 17:00</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Technieken & Kampvaardigheden</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <MapPin className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Locatie</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Scoutsterrein</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Explorers (15-18 jaar) */}
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Explorers</CardTitle>
                  </div>
                  <p className="text-sm text-[color:var(--text-color)]/70">15-18 jaar</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Zaterdag 19:00 - 22:00</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Projecten & Leiderschap</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <MapPin className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Locatie</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Scoutslokaal</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Speciale Activiteiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Eerste Zaterdag van de Maand</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Gezamenlijke Opening & Sluiting</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Laatste Zaterdag van de Maand</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">Kampvuur & Samenzijn</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 