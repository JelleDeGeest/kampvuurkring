import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/header";

export default function ActiviteitenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Activiteiten
              </h1>
              <div className="absolute bottom-0 left-0 w-1/4 h-1 bg-primary"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Wekelijkse Bijeenkomsten</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Elke zaterdag komen we samen voor spannende activiteiten en avonturen. 
                    Van speurtochten tot kampvuurverhalen, er is altijd iets nieuws te beleven.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Kampen</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Meerdere keren per jaar gaan we op kamp. Deze kampen zijn hoogtepunten 
                    waar we samen avonturen beleven en nieuwe vaardigheden leren.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Speciale Evenementen</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Van seizoensfeesten tot gemeenschapsprojecten, we organiseren 
                    verschillende speciale evenementen door het jaar heen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 