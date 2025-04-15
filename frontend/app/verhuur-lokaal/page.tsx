"use client"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Euro } from "lucide-react"

export default function VerhuurLokaalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Verhuur Lokaal
          </h1>
          <div className="w-full h-1 bg-secondary mb-8" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground mb-8">
                <p className="text-muted-foreground">
                  Ons scoutslokaal is beschikbaar voor verhuur aan groepen en organisaties. 
                  Het lokaal is perfect voor jeugdkampen, vergaderingen, workshops en andere activiteiten. 
                  Met een ruime binnenruimte en een groot buitenterrein bieden we een veelzijdige locatie 
                  voor diverse evenementen.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Capaciteit</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tot 50 personen binnen
                      <br />
                      Groot buitenterrein
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Locatie</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Centraal gelegen
                      <br />
                      Goede bereikbaarheid
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Beschikbaarheid</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Weekends
                      <br />
                      Schoolvakanties
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Euro className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground">Tarieven</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Weekend: €250
                      <br />
                      Dag: €100
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Informatie Aanvragen</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">Naam</Label>
                      <Input id="name" placeholder="Uw naam" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">E-mail</Label>
                      <Input id="email" type="email" placeholder="uw@email.com" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-foreground">Gewenste datum</Label>
                      <Input id="date" type="date" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">Bericht</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Vertel ons meer over uw plannen..." 
                        className="border-border"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Verstuur Aanvraag
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-border bg-background mt-12">
        <div className="w-full h-2 bg-secondary"></div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Scouts Sint-Johannes. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  )
} 