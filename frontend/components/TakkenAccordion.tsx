'use client'

import { useState } from 'react'
import { ChevronDown, Calendar, MapPin, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface TakInfo {
  name: string
  age: string
  color: string
  bgColor: string
  logo: string
  description: string
  meetings: string
  activities: string[]
  specialEvents: string
}

const takkenData: TakInfo[] = [
  {
    name: 'Kapoenen',
    age: '6-8 jaar (1e-2e leerjaar)',
    color: 'rgb(255, 205, 92)',
    bgColor: 'rgba(255, 205, 92, 0.1)',
    logo: '/logos/Kapoenen.svg',
    description: 'Kapoenen ontdekken al spelend wat het is om scouts of gids te zijn. Het leven van een kapoen is vol spel en fantasie. De leiding bedenkt spelen op maat van kapoenen en laat genoeg ruimte om op hun eigen impulsen in te gaan. Bij de kapoenen werken we rond het kapoenenverhaal, "De Steen van Nowan", geschreven door Marc de Bel.',
    meetings: 'Zondag van 14u tot 17u aan ons lokaal. Tijdens examenperiodes (december/januari en mei/juni) zijn er avondvergaderingen.',
    activities: [
      'Spelen en fantasie rond "De Steen van Nowan"',
      'Weekend in het tweede semester',
      'Eerste kamp van 6 dagen in een gebouw'
    ],
    specialEvents: 'Het hoogtepunt in een kapoenenleven is voor de eerste keer op kamp gaan! Dit kamp duurt 6 dagen en kapoenen slapen in een gebouw.'
  },
  {
    name: 'Wouters',
    age: '8-10 jaar (3e-5e leerjaar)',
    color: 'rgb(79, 190, 183)',
    bgColor: 'rgba(79, 190, 183, 0.1)',
    logo: '/logos/Wouters.svg',
    description: 'Wouters hebben veel energie en hun enthousiasme kent soms geen grenzen. Ze bouwen graag kampen, verzinnen een geheime taal en halen kattekwaad uit. De wouters werken rond het verhaal "Jungle Book" en hun leiding heeft namen van personages uit dit boek.',
    meetings: 'Zondag van 14u tot 17u aan ons lokaal. Tijdens examenperiodes (december/januari en mei/juni) zijn er avondvergaderingen.',
    activities: [
      'Werken rond "Jungle Book"',
      'Belofteweekend één keer per jaar',
      'Kamp van 8 dagen in een lokaal'
    ],
    specialEvents: 'Wouters gaan voor hun belofte op weekend en beleven hun eerste echte kamp van 8 dagen.'
  },
  {
    name: 'Jonggivers',
    age: '11-14 jaar (6e leerjaar - 2e middelbaar)',
    color: 'rgb(251, 139, 4)',
    bgColor: 'rgba(251, 139, 4, 0.1)',
    logo: '/logos/Jonggivers.svg',
    description: 'Jonggivers houden van avontuur en steken graag de handen uit de mouwen. Ze vinden het leuk om inspraak te hebben en gaan graag nieuwe uitdagingen aan. Jonggiver zijn is leren samenwerken, engagement tonen en zich inzetten voor anderen.',
    meetings: 'Zondag van 14u tot 17u aan ons lokaal, maar gaan vaker samen op verplaatsing. Tijdens examenperiodes zijn er avondvergaderingen.',
    activities: [
      'Droppingsweekend samen met leiding',
      'Eerste tentenkamp van 10 dagen',
      'Zelf tenten opzetten en sjorren',
      'Totemceremonie voor 2e jaars'
    ],
    specialEvents: 'Het belangrijkste moment is de totemceremonie voor 2e jaars - het krijgen van een totem (dierennaam) die hun eigenschappen weergeeft.'
  },
  {
    name: 'Givers',
    age: '15-17 jaar (3e-5e middelbaar)',
    color: 'rgb(13, 41, 211)',
    bgColor: 'rgba(13, 41, 211, 0.1)',
    logo: '/logos/Givers.svg',
    description: 'We bieden givers alle kansen om te bewijzen wat ze in hun mars hebben. Er is ruimte om te experimenteren en mee te beslissen. Grootse projecten kleuren hun scoutsdag, maar gewoon gezellig samen zijn hoort er ook bij.',
    meetings: 'Zondag van 14u tot 17u aan ons lokaal, maar gaan vaker samen op verplaatsing. Tijdens examenperiodes zijn er avondvergaderingen.',
    activities: [
      'Droppingsweekend (alleen op stap)',
      'Derdejaarsweekend voor 3e jaars',
      'Tentenkamp van 10 dagen in tweede helft juli',
      'Voortotem voor 3e jaars'
    ],
    specialEvents: 'Op giverkamp krijgen 3e jaars hun voortotem: een eigenschap die vóór hun dierentotem komt en hun persoonlijkheid specifieert.'
  },
  {
    name: 'Jin',
    age: '18 jaar (6e middelbaar)',
    color: 'rgb(164, 57, 93)',
    bgColor: 'rgba(164, 57, 93, 0.1)',
    logo: '/logos/Jin.svg',
    description: 'Jin staat voor "Jij en Ik een Noodzaak" en vormt de oudste tak. Jins zijn op zoek naar zichzelf en nieuwe ervaringen. Ze worden klaargestoomd om het komende jaar zelf leiding te worden en mogen al proeven van het leiding-zijn.',
    meetings: 'Vergaderingen en jin-geeft-leiding-activiteiten. Het hele jaar door kasacties om de kamp-kas te spijzen.',
    activities: [
      'Jin-geeft-leiding-activiteiten',
      'Jinleefweek (hele schoolweek op scouts)',
      'Kasacties voor buitenlands kamp',
      'Weekend en andere activiteiten'
    ],
    specialEvents: 'Het jinjaar eindigt met een geweldig buitenlands kamp dat mogelijk wordt gemaakt door alle kasacties. De jinleefweek is een unieke ervaring waar herinneringen voor het leven worden gemaakt.'
  }
]

interface TakkenAccordionProps {
  className?: string
}

export default function TakkenAccordion({ className }: TakkenAccordionProps) {
  const [openTak, setOpenTak] = useState<string | null>(null)

  const toggleTak = (takName: string) => {
    setOpenTak(openTak === takName ? null : takName)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {takkenData.map((tak) => (
        <div
          key={tak.name}
          className="rounded-lg border border-border/50 shadow-sm overflow-hidden"
          style={{ backgroundColor: tak.bgColor }}
        >
          {/* Header */}
          <button
            onClick={() => toggleTak(tak.name)}
            className="w-full p-6 text-left transition-all duration-200 hover:bg-black/5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 p-2 rounded-full shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: tak.color }}
                >
                  <Image
                    src={tak.logo}
                    alt={`${tak.name} logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold group-hover:scale-105 transition-transform duration-200"
                    style={{ color: tak.color }}
                  >
                    {tak.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tak.age}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Klik om {openTak === tak.name ? 'te sluiten' : 'meer te lezen'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {openTak === tak.name ? 'Sluiten' : 'Meer info'}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-6 w-6 transition-all duration-200 group-hover:scale-110",
                    openTak === tak.name && "rotate-180"
                  )}
                  style={{ color: tak.color }}
                />
              </div>
            </div>
          </button>

          {/* Content */}
          {openTak === tak.name && (
            <div className="px-6 pt-4 pb-6 space-y-4 bg-white/50">
              <div>
                <p className="text-gray-700 leading-relaxed">{tak.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">Vergaderingen</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{tak.meetings}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">Activiteiten</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-6">
                      {tak.activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm">Hoogtepunten</h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{tak.specialEvents}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}