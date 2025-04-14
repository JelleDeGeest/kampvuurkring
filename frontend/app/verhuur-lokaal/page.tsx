import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Calendar, MapPin, Phone, Mail, Euro } from "lucide-react"
import Header from "@/components/header"

export default function VerhuurLokaal() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[color:var(--primary-color)]">
                  Verhuur Lokaal
                </h1>
                <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Huur ons scoutslokaal voor uw evenement, vergadering of activiteit
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Faciliteiten</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Users className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Capaciteit</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          Maximaal 50 personen (zitplaatsen)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Building2 className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Voorzieningen</h4>
                        <ul className="text-sm text-[color:var(--text-color)]/80 list-disc pl-4">
                          <li>Grote zaal met podium</li>
                          <li>Volledig uitgeruste keuken</li>
                          <li>Sanitaire voorzieningen</li>
                          <li>Parkeerplaats</li>
                          <li>Buitenterrein</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Tarieven</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Weekend</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          €150 per dag (vrijdag 18:00 - zondag 18:00)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Weekdag</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          €75 per dag (09:00 - 22:00)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Calendar className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Avond</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          €50 (18:00 - 22:00)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mx-auto max-w-5xl py-12">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[color:var(--primary-color)]" />
                    <CardTitle className="text-[color:var(--text-color)]">Contact & Locatie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <MapPin className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Adres</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          Scoutslokaal Sint-Johannes<br />
                          Hoofdstraat 123<br />
                          1234 AB Stad
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Phone className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">Telefoon</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          (012) 345 6789
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-[color:var(--primary-color)]/10 p-2">
                        <Mail className="h-4 w-4 text-[color:var(--primary-color)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[color:var(--text-color)]">E-mail</h4>
                        <p className="text-sm text-[color:var(--text-color)]/80">
                          verhuur@scoutssintjohannes.org
                        </p>
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