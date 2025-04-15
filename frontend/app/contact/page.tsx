import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Contact
          </h1>
          <div className="w-full h-1 bg-secondary mb-8" />
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-primary">Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Adres</h3>
                    <p className="text-muted-foreground">Straatnaam 123</p>
                    <p className="text-muted-foreground">1234 AB Stad</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@scoutssintjohannes.nl</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefoon</h3>
                    <p className="text-muted-foreground">+31 123 456 789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="text-primary">Openingstijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">Scoutsavonden</h3>
                    <p className="text-muted-foreground">Zaterdag: 14:00 - 17:00</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Bestuur</h3>
                    <p className="text-muted-foreground">Maandag: 19:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 