import { notFound } from 'next/navigation'
import getPayloadClient from '@/lib/getPayload'
import { draftMode } from 'next/headers'
import Header from '@/components/header'
import Footer from '@/app/(my-app)/components/Footer'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import PreviewControls from '@/components/PreviewControls'
import { PayloadRichText } from '@/components/PayloadRichText'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Type for valid takken
const validTakken = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'] as const
type Tak = typeof validTakken[number]

// Tak info with theme colors
const takInfo: Record<Tak, { name: string; age: string; color: string; bgColor: string }> = {
  kapoenen: {
    name: 'Kapoenen',
    age: '6-8 jaar',
    color: 'rgb(255, 205, 92)',
    bgColor: 'rgba(255, 205, 92, 0.1)',
  },
  wouters: {
    name: 'Wouters',
    age: '8-11 jaar',
    color: 'rgb(79, 190, 183)',
    bgColor: 'rgba(79, 190, 183, 0.1)',
  },
  jonggivers: {
    name: 'Jonggivers',
    age: '11-14 jaar',
    color: 'rgb(251, 139, 4)',
    bgColor: 'rgba(251, 139, 4, 0.1)',
  },
  givers: {
    name: 'Givers',
    age: '14-17 jaar',
    color: 'rgb(13, 41, 211)',
    bgColor: 'rgba(13, 41, 211, 0.1)',
  },
  jin: {
    name: 'Jin',
    age: '17-18 jaar',
    color: 'rgb(164, 57, 93)',
    bgColor: 'rgba(164, 57, 93, 0.1)',
  },
}

interface Props {
  params: {
    tak: string
  }
}

export default async function TakActivitiesPage({ params }: Props) {
  const resolvedParams = await params
  const { isEnabled } = await draftMode()
  
  // Validate tak parameter
  if (!validTakken.includes(resolvedParams.tak as Tak)) {
    notFound()
  }
  
  const tak = resolvedParams.tak as Tak
  const info = takInfo[tak]
  
  const payload = await getPayloadClient()
  
  // Fetch activities for this tak
  const activitiesResult = await payload.find({
    collection: 'activiteiten',
    where: {
      division: {
        contains: tak,
      },
    },
    sort: 'startDate',
    draft: isEnabled,
    depth: 2,
  })
  
  const activities = activitiesResult.docs
  
  // Also fetch upcoming camps and weekends for this tak
  const campsResult = await payload.find({
    collection: 'camps',
    where: {
      division: {
        contains: tak,
      },
    },
    sort: 'startDate',
    draft: isEnabled,
    depth: 2,
  })
  
  const weekendsResult = await payload.find({
    collection: 'weekends',
    where: {
      division: {
        contains: tak,
      },
    },
    sort: 'startDate',
    draft: isEnabled,
    depth: 2,
  })
  
  const camps = campsResult.docs
  const weekends = weekendsResult.docs
  
  // Filter to only show future events
  const now = new Date()
  const futureActivities = activities.filter(a => new Date(a.endDate) >= now)
  const futureCamps = camps.filter(c => new Date(c.endDate) >= now)
  const futureWeekends = weekends.filter(w => new Date(w.endDate) >= now)
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isEnabled && <PreviewControls />}
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with tak color */}
        <section 
          className="relative py-20 overflow-hidden"
          style={{ backgroundColor: info.bgColor }}
        >
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-5xl font-bold mb-4"
                style={{ color: info.color }}
              >
                {info.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-2">{info.age}</p>
              <p className="text-lg text-muted-foreground">
                Bekijk alle activiteiten, weekends en kampen voor {info.name}
              </p>
            </div>
          </div>
        </section>

        {/* Regular Activities Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Komende activiteiten</h2>
            
            {futureActivities.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Er zijn momenteel geen activiteiten gepland voor {info.name}.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {futureActivities.map((activity) => (
                  <Card 
                    key={activity.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    {/* Banner image if available */}
                    {activity.bannerImage && (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={activity.bannerImage.url || activity.bannerImage}
                          alt={activity.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{activity.title}</h3>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(activity.startDate), 'd MMMM yyyy', { locale: nl })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(new Date(activity.startDate), 'HH:mm', { locale: nl })}
                            {' - '}
                            {format(new Date(activity.endDate), 'HH:mm', { locale: nl })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="capitalize">{tak}</span>
                        </div>
                      </div>
                      
                      {activity.description && (
                        <div className="mb-4 text-sm line-clamp-3">
                          <PayloadRichText 
                            content={activity.description} 
                            className="prose-sm"
                          />
                        </div>
                      )}
                      
                      {/* Enrollment or action button */}
                      {activity.enrollmentSettings?.enabled && (
                        <div className="mt-auto">
                          {activity.enrollmentSettings.formPage ? (
                            <Link href={`/inschrijven/activiteiten/${activity.id}`}>
                              <Button className="w-full">
                                Inschrijven
                              </Button>
                            </Link>
                          ) : activity.enrollmentSettings.enrollmentLink && (
                            <a 
                              href={activity.enrollmentSettings.enrollmentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="w-full">
                                Inschrijven (externe link)
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Weekends Section */}
        {futureWeekends.length > 0 && (
          <section className="py-16 bg-secondary/10">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Weekends</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {futureWeekends.map((weekend) => (
                  <Card key={weekend.id} className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{weekend.title}</h3>
                    <p className="text-muted-foreground">
                      {format(new Date(weekend.startDate), 'd MMMM', { locale: nl })}
                      {' - '}
                      {format(new Date(weekend.endDate), 'd MMMM yyyy', { locale: nl })}
                    </p>
                    {weekend.enrollmentSettings?.enabled && (
                      <Link 
                        href={`/inschrijven/weekends/${weekend.id}`}
                        className="inline-block mt-4"
                      >
                        <Button>Meer info & inschrijven</Button>
                      </Link>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Camps Section */}
        {futureCamps.length > 0 && (
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Kampen</h2>
              <div className="grid gap-6">
                {futureCamps.map((camp) => (
                  <Card key={camp.id} className="p-8">
                    <h3 className="text-2xl font-semibold mb-3">{camp.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {format(new Date(camp.startDate), 'd MMMM', { locale: nl })}
                      {' - '}
                      {format(new Date(camp.endDate), 'd MMMM yyyy', { locale: nl })}
                    </p>
                    {camp.description && (
                      <div className="mb-4">
                        <PayloadRichText content={camp.description} />
                      </div>
                    )}
                    {camp.enrollmentSettings?.enabled && (
                      <Link href={`/inschrijven/kampen/${camp.id}`}>
                        <Button size="lg">Inschrijven voor kamp</Button>
                      </Link>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation to other takken */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Bekijk activiteiten van andere takken
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {validTakken.filter(t => t !== tak).map((otherTak) => (
                <Link
                  key={otherTak}
                  href={`/activiteiten/${otherTak}`}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: takInfo[otherTak].bgColor,
                    color: takInfo[otherTak].color,
                    border: `2px solid ${takInfo[otherTak].color}`,
                  }}
                >
                  {takInfo[otherTak].name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

// Generate static params for all takken
export async function generateStaticParams() {
  return validTakken.map((tak) => ({
    tak,
  }))
}