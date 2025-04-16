"use client"

import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LidWordenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Word Lid van Scouts Sint-Johannes
          </h1>
          <div className="w-full h-1 bg-secondary mb-8" />
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Aanmeldingsformulier</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="voornaam" className="text-foreground">Voornaam</Label>
                      <Input id="voornaam" placeholder="Voornaam" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="achternaam" className="text-foreground">Achternaam</Label>
                      <Input id="achternaam" placeholder="Achternaam" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">E-mail</Label>
                      <Input id="email" type="email" placeholder="E-mail" className="border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefoon" className="text-foreground">Telefoonnummer</Label>
                      <Input id="telefoon" type="tel" placeholder="Telefoonnummer" className="border-border" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="geboortedatum" className="text-foreground">Geboortedatum</Label>
                    <Input id="geboortedatum" type="date" className="border-border" />
                  </div>
                  <Button type="submit" className="w-full">
                    Verstuur Aanmelding
                  </Button>
                </form>
              </CardContent>
            </Card>
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