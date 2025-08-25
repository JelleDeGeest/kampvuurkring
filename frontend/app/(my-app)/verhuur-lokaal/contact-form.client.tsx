'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Informatie Aanvragen</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Naam</Label>
            <Input id="name" placeholder="Uw naam" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">E-mail</Label>
            <Input id="email" type="email" placeholder="uw@email.com" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">Gewenste datum</Label>
            <Input id="date" type="date" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">Bericht</Label>
            <Textarea 
              id="message" 
              placeholder="Vertel ons meer over uw plannen..." 
              className="border-border"
            />
          </div>
          <Button type="submit" className="w-full">
            Verstuur Aanvraag
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}