import type React from "react"
import Link from "next/link"
import Image from "next/image"
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
} from "lucide-react"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[color:var(--text-color)]">
                    Ontdek Avontuur bij Scouts Sint-Johannes
                  </h1>
                  <p className="max-w-[600px] text-[color:var(--text-color)]/80 md:text-xl">
                    Bouw karakter, leer vaardigheden en creëer levenslange herinneringen door buitenavonturen en
                    gemeenschapsdienst.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/lid-worden">
                    <Button className="bg-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/90 text-white">
                      Word Lid
                    </Button>
                  </Link>
                  <Link href="/over">
                    <Button className="bg-[color:var(--secondary-color)] hover:bg-[color:var(--secondary-color)]/90 text-[color:var(--primary-color)] border-0">
                      Lees Meer
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Scouts wandelen in de natuur"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--secondary-color)]/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[color:var(--primary-color)]">
                  Over Scouts Sint-Johannes
                </h2>
                <div className="w-20 h-1 mx-auto my-4 bg-[color:var(--secondary-color)]"></div>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Opgericht in 1985, begeleidt Scouts Sint-Johannes al meer dan 35 jaar jongeren op hun ontdekkingsreis naar leiderschap
                  en buitenavontuur.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Scouts rond een kampvuur"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-[color:var(--accent-color)]/20 p-2">
                      <Users className="h-6 w-6 text-[color:var(--primary-color)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--text-color)]">Gemeenschap</h3>
                      <p className="text-[color:var(--text-color)]/80">
                        Bouw levenslange vriendschappen en een gevoel van verbondenheid door teamwork en gedeelde ervaringen.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-[color:var(--accent-color)]/20 p-2">
                      <Compass className="h-6 w-6 text-[color:var(--primary-color)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--text-color)]">Leiderschap</h3>
                      <p className="text-[color:var(--text-color)]/80">
                        Ontwikkel zelfverzekerde leiders door verantwoordelijkheid, besluitvorming en mentor
                        mogelijkheden.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="rounded-full bg-[color:var(--accent-color)]/20 p-2">
                      <TreePine className="h-6 w-6 text-[color:var(--primary-color)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[color:var(--text-color)]">Natuur</h3>
                      <p className="text-[color:var(--text-color)]/80">
                        Bevorder een diepe waardering voor de natuur en leer over milieubeheer.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="activities" className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--background-color)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[color:var(--primary-color)]">
                  Onze Activiteiten
                </h2>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ontdek onze spannende activiteiten die avontuur, leren en plezier combineren voor scouts van alle leeftijden.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <Tent className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Kamperen</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Leer essentiële buitenvaardigheden door kampeertochten in verschillende terreinen en seizoenen.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <Mountain className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Hiken</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Verken natuurpaden en ontwikkel navigatievaardigheden terwijl je geniet van de schoonheid van de natuur.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <Campground className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Overlevingstechnieken</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Leer vuur maken, onderdak bouwen, eerste hulp en andere essentiële overlevingstechnieken in de natuur.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <Users className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Gemeenschapsdienst</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Geef terug aan de gemeenschap door georganiseerde serviceprojecten en vrijwilligerswerk.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <MapPin className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Navigatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Leer kaartlezen, kompasgebruik en GPS-navigatie om vol vertrouwen de natuur te verkennen.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-[color:var(--secondary-color)]/20 border-[color:var(--secondary-color)]">
                <CardHeader className="pb-2">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[color:var(--accent-color)]/20 mb-2">
                    <Calendar className="h-6 w-6 text-[color:var(--primary-color)]" />
                  </div>
                  <CardTitle className="text-[color:var(--text-color)]">Seizoensgebonden Evenementen</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[color:var(--text-color)]/80">
                    Neem deel aan speciale seizoensactiviteiten, wedstrijden en jamborees gedurende het hele jaar.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="events" className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--accent-color)]/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[color:var(--primary-color)]">
                  Komende Evenementen
                </h2>
                <p className="max-w-[900px] text-[color:var(--text-color)]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Doe mee aan deze spannende komende activiteiten en avonturen.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              <Card className="bg-gradient-to-br from-[color:var(--background-color)] to-[color:var(--secondary-color)]/30 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-[color:var(--primary-color)] p-2 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-[color:var(--text-color)]">Lentekampeertocht</CardTitle>
                      <CardDescription className="text-[color:var(--text-color)]/70">
                        15-17 mei 2025 • Woodland Valley
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Onze jaarlijkse lentekampeertocht met hiken, kampvuurkoken en sterrenkijken. Perfect voor
                    scouts van alle ervaringsniveaus.
                  </p>
                  <Button variant="link" className="mt-4 p-0 text-[color:var(--primary-color)]">
                    Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[color:var(--background-color)] to-[color:var(--secondary-color)]/30 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-[color:var(--primary-color)] p-2 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-[color:var(--text-color)]">Gemeenschapsschoonmaakdag</CardTitle>
                      <CardDescription className="text-[color:var(--text-color)]/70">
                        5 juni 2025 • Stadspark
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Help ons mee om ons lokale park schoon te maken en nieuwe bomen te planten. Een geweldige kans om
                    gemeenschapsdienstbadges te verdienen.
                  </p>
                  <Button variant="link" className="mt-4 p-0 text-[color:var(--primary-color)]">
                    Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[color:var(--background-color)] to-[color:var(--secondary-color)]/30 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-[color:var(--primary-color)] p-2 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-[color:var(--text-color)]">Zomerjamboree</CardTitle>
                      <CardDescription className="text-[color:var(--text-color)]/70">
                        10-14 juli 2025 • Lake Meadows
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Ons grootste evenement van het jaar! Vijf dagen vol activiteiten, wedstrijden en avonturen met scout
                    groepen uit de hele regio.
                  </p>
                  <Button variant="link" className="mt-4 p-0 text-[color:var(--primary-color)]">
                    Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[color:var(--background-color)] to-[color:var(--secondary-color)]/30 border-[color:var(--secondary-color)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-[color:var(--primary-color)] p-2 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-[color:var(--text-color)]">EHBO in de Natuur</CardTitle>
                      <CardDescription className="text-[color:var(--text-color)]/70">
                        22 augustus 2025 • Scout Hall
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[color:var(--text-color)]/80">
                    Leer essentiële EHBO-vaardigheden specifiek voor buiten- en natuursituaties. Certificering
                    beschikbaar na voltooiing.
                  </p>
                  <Button variant="link" className="mt-4 p-0 text-[color:var(--primary-color)]">
                    Lees meer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button className="bg-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/90 text-white">
                Bekijk Alle Evenementen
              </Button>
            </div>
          </div>
        </section>

        <section
          id="join"
          className="w-full py-12 md:py-24 lg:py-32 bg-[color:var(--primary-color)] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-20 bg-[color:var(--secondary-color)]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-[color:var(--secondary-color)]"></div>
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-[color:var(--secondary-color)]"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-[color:var(--secondary-color)]"></div>
          </div>
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                Klaar om mee te doen aan het avontuur?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Word vandaag nog lid van onze scoutingfamilie. We verwelkomen het hele jaar door nieuwe leden en hebben programma's voor alle
                leeftijdsgroepen.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:justify-end">
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-[color:var(--primary-color)] hover:bg-white/90">Word Lid</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Neem Contact Op
                </Button>
              </div>
              <p className="text-sm text-white/70">
                Vragen? Bel ons op (555) 123-4567 of mail naar info@scoutssintjohannes.org
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-[color:var(--background-color)]">
        <div className="w-full h-2 bg-[color:var(--secondary-color)]"></div>
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-[color:var(--primary-color)]" />
              <span className="text-xl font-bold text-[color:var(--primary-color)]">Scouts Sint-Johannes</span>
            </div>
            <p className="text-sm text-[color:var(--text-color)]/80">
              Bouw karakter, leer vaardigheden en creëer levenslange herinneringen door buitenavonturen en
              gemeenschapsdienst.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color)]/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color)]/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[color:var(--primary-color)] hover:text-[color:var(--primary-color)]/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[color:var(--primary-color)]">Over</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Ons Verhaal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Leiderschap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Waarden
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Locaties
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[color:var(--primary-color)]">Programma's</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Welpen (7-10 jaar)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Scouts (11-14 jaar)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Explorers (15-18 jaar)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Volwassen Vrijwilligers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[color:var(--primary-color)]">Bronnen</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Kalender
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Formulieren
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Badge-eisen
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[color:var(--text-color)]/80 hover:text-[color:var(--primary-color)]">
                    Veiligheidsrichtlijnen
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-[color:var(--text-color)]/70">
          <p>© {new Date().getFullYear()} Scouts Sint-Johannes. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  )
}
