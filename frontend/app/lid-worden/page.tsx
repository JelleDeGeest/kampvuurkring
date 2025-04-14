import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"

export default function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[color:var(--primary-color)]">
                Word Lid
              </h1>
              <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
              <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sluit je aan bij onze scoutingfamilie
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl py-12">
            <Card className="bg-[color:var(--background-color)]">
              <CardHeader>
                <CardTitle className="text-[color:var(--text-color)]">Word Lid van Onze Groep</CardTitle>
                <CardDescription className="text-[color:var(--text-color)]/80">
                  Vul het onderstaande formulier in om je scoutingreis te beginnen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[color:var(--text-color)]">Voornaam</Label>
                      <Input id="firstName" placeholder="Vul je voornaam in" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[color:var(--text-color)]">Achternaam</Label>
                      <Input id="lastName" placeholder="Vul je achternaam in" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[color:var(--text-color)]">E-mail</Label>
                    <Input id="email" type="email" placeholder="Vul je e-mailadres in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[color:var(--text-color)]">Telefoonnummer</Label>
                    <Input id="phone" type="tel" placeholder="Vul je telefoonnummer in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-[color:var(--text-color)]">Leeftijd</Label>
                    <Input id="age" type="number" placeholder="Vul je leeftijd in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-[color:var(--text-color)]">Eerdere Scoutingervaring</Label>
                    <Textarea id="experience" placeholder="Vertel ons over je eerdere scoutingervaring (indien van toepassing)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests" className="text-[color:var(--text-color)]">Interesses</Label>
                    <Textarea id="interests" placeholder="Welke activiteiten interesseren je het meest?" />
                  </div>
                  <Button type="submit" className="w-full bg-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/90 text-white">
                    Verstuur Aanmelding
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 