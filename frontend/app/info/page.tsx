"use client"

import Header from "@/components/header"

export default function OverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Over Scouts Sint-Johannes
          </h1>
          <div className="w-full h-1 bg-secondary mb-8" />
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground">
              Sinds onze oprichting zijn we uitgegroeid tot een hechte gemeenschap van jonge avonturiers, 
              leiders en natuurliefhebbers. Onze scoutinggroep is meer dan alleen een jeugdbeweging - 
              het is een plek waar vriendschappen voor het leven worden gesmeed en waar jonge mensen 
              de kans krijgen om te groeien en hun potentieel te ontdekken.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Gemeenschap</h2>
                <p className="text-muted-foreground">
                  Bij Scouts Sint-Johannes geloven we in de kracht van samen. 
                  Onze activiteiten zijn gericht op teamwork, wederzijds respect en het ontwikkelen 
                  van sociale vaardigheden die van onschatbare waarde zijn in het leven.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Leiderschap</h2>
                <p className="text-muted-foreground">
                  We moedigen onze leden aan om verantwoordelijkheid te nemen en hun leiderschapskwaliteiten 
                  te ontwikkelen. Door verschillende rollen en taken binnen de groep leren ze 
                  belangrijke vaardigheden voor hun toekomst.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Natuur</h2>
                <p className="text-muted-foreground">
                  De natuur is onze grootste leermeester. Door buitenactiviteiten en kamperen 
                  leren onze scouts het belang van natuurbehoud en ontwikkelen ze een blijvende 
                  waardering voor de wereld om hen heen.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Scouts rond een kampvuur"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
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