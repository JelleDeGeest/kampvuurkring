import type React from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OverPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[color:var(--primary-color)]">
                  Over Scouts Sint-Johannes
                </h1>
                <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ontdek wie we zijn en waar we voor staan
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Missie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Bij Scouts Sint-Johannes streven we ernaar om jongeren te helpen groeien tot zelfstandige, 
                    verantwoordelijke en betrokken burgers. We doen dit door middel van avontuurlijke activiteiten, 
                    teamwork en het ontwikkelen van praktische vaardigheden.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Geschiedenis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Scouts Sint-Johannes heeft een rijke geschiedenis in de lokale gemeenschap. 
                    Al jarenlang bieden we jongeren de kans om zich te ontwikkelen in een veilige 
                    en uitdagende omgeving, met respect voor traditie en oog voor vernieuwing.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Waarden</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    We geloven in respect, samenwerking en persoonlijke groei. Onze activiteiten 
                    zijn gebaseerd op de scoutswaarden van eerlijkheid, vriendschap en zorg voor 
                    elkaar en de natuur.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Leiding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Onze ervaren leiding bestaat uit vrijwilligers die gepassioneerd zijn over 
                    scouting en het begeleiden van jongeren. Ze zijn getraind in pedagogische 
                    vaardigheden en veiligheidsprocedures.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Activiteiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Van wekelijkse bijeenkomsten tot kampen en speciale evenementen, we bieden 
                    een breed scala aan activiteiten die zowel leuk als leerzaam zijn. Elke 
                    activiteit draagt bij aan de persoonlijke ontwikkeling van onze leden.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <CardTitle className="text-[color:var(--text-color)]">Onze Gemeenschap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    We zijn trots op onze sterke band met de lokale gemeenschap. We werken 
                    regelmatig samen met andere organisaties en dragen bij aan lokale 
                    initiatieven en evenementen.
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