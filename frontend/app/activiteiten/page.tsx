import type React from "react"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActiviteitenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[color:var(--primary-color)]">
                  Activiteiten
                </h1>
                <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ontdek alle activiteiten die we organiseren bij Scouts Sint-Johannes
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Kampen</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Onze jaarlijkse hoogtepunten</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Elk jaar organiseren we verschillende kampen waar we samen avonturen beleven, 
                    nieuwe vaardigheden leren en onvergetelijke herinneringen maken. Van weekendkampen 
                    tot zomerkampen, er is altijd iets te beleven!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Wekelijkse Bijeenkomsten</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Elke week een nieuw avontuur</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Elke zaterdag komen we samen voor spannende activiteiten, van knopen leren 
                    tot speurtochten en van kampvuur maken tot samenwerken in teamspellen. 
                    Elke week is anders en leerzaam!
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Special Events</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Unieke momenten</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Naast onze reguliere activiteiten organiseren we ook speciale evenementen 
                    zoals Jamborees, districtsevents en themadagen. Dit zijn perfecte momenten 
                    om andere scouts te ontmoeten en nieuwe ervaringen op te doen.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Natuur & Milieu</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Leren over en zorgen voor de natuur</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Als scouts leren we niet alleen van de natuur, maar zorgen we er ook voor. 
                    We organiseren regelmatig natuurwandelingen, milieubewuste activiteiten 
                    en leren hoe we duurzaam kunnen leven.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Vaardigheden</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Leren door te doen</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Van kaartlezen tot EHBO, van koken op kampvuur tot houtbewerking. 
                    Bij Scouts Sint-Johannes leer je praktische vaardigheden die je 
                    je hele leven kunt gebruiken.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Gemeenschap</CardTitle>
                  <p className="text-sm text-[color:var(--text-color)]/70">Samen sterk</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    We werken regelmatig samen met de lokale gemeenschap, organiseren 
                    inzamelingsacties en helpen waar we kunnen. Zo leren we niet alleen 
                    voor onszelf, maar ook voor anderen te zorgen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 