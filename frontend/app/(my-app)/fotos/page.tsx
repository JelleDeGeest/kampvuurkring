import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FotosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Foto's
          </h1>
          <div className="w-full h-1 bg-secondary mb-8" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example foto cards - replace with actual images */}
            <Card className="bg-background">
              <CardContent className="p-0">
                <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                  <img
                    src="/placeholder.jpg"
                    alt="Scouts activiteit"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary">Titel van de foto</h3>
                  <p className="text-sm text-muted-foreground">Beschrijving van de foto...</p>
                </div>
              </CardContent>
            </Card>
            {/* Add more cards for each foto */}
          </div>
        </div>
      </main>
    </div>
  )
} 