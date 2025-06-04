'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CustomQuestion {
  question: string
  required: boolean
}

interface FormPageData {
  id: string
  slug: string
  title: string
  targetType: string
  target: any
  formSettings?: {
    customMessage?: string
    enrollmentDeadline?: string
    allowMultipleChildren?: boolean
    closed?: boolean
    closedMessage?: string
  }
  paymentSettings?: {
    isPaid?: boolean
    pricePerChild?: number
    paymentInstructions?: string
  }
  customQuestions?: CustomQuestion[]
  infoDocument?: {
    id?: string
    url?: string
    filename?: string
  }
}

interface DynamicFormProps {
  formPage: FormPageData
}

interface ChildData {
  firstName: string
  lastName: string
}

export function DynamicForm({ formPage }: DynamicFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Initialize with one child
  const [children, setChildren] = useState<ChildData[]>([{
    firstName: '',
    lastName: ''
  }])

  const addChild = () => {
    setChildren([...children, {
      firstName: '',
      lastName: ''
    }])
  }

  const removeChild = (index: number) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index))
    }
  }

  const updateChild = (index: number, field: string, value: string) => {
    const updatedChildren = [...children]
    if (updatedChildren[index]) {
      (updatedChildren[index] as any)[field] = value
      setChildren(updatedChildren)
    }
  }

  const totalPrice = formPage.paymentSettings?.isPaid 
    ? (formPage.paymentSettings.pricePerChild || 0) * children.length 
    : 0

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    // Collect data for all children
    const childrenData = children.map((child, index) => ({
      participantInfo: {
        firstName: child.firstName,
        lastName: child.lastName,
      }
    }))

    // Collect custom question answers
    const customAnswers: Record<string, string> = {}
    if (formPage.customQuestions) {
      formPage.customQuestions.forEach((question, index) => {
        const answer = formData.get(`custom_question_${index}`)
        if (answer) {
          customAnswers[question.question] = answer as string
        }
      })
    }

    // Get parent/general information from form
    const data = {
      targetType: formPage.targetType,
      targetId: formPage.target.id,
      children: childrenData,
      contactInfo: {
        email: formData.get('email'),
      },
      additionalOptions: {
        comments: formData.get('comments') || '',
        customAnswers: customAnswers,
      },
      totalPrice: totalPrice
    }

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Er is iets misgegaan bij het versturen van het formulier')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-green-600">Inschrijving verzonden!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{formPage.formSettings?.customMessage || 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.'}</p>
          {formPage.paymentSettings?.isPaid && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <p className="font-semibold">Totaal te betalen: €{totalPrice}</p>
              {formPage.paymentSettings.paymentInstructions && (
                <p className="mt-2 text-sm whitespace-pre-wrap">{formPage.paymentSettings.paymentInstructions}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Check if enrollments are manually closed
  if (formPage.formSettings?.closed) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-red-600">Inschrijvingen gesloten</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{formPage.formSettings.closedMessage || 'De inschrijvingen zijn helaas gesloten.'}</p>
        </CardContent>
      </Card>
    )
  }

  // Check if enrollment deadline has passed
  if (formPage.formSettings?.enrollmentDeadline) {
    const deadline = new Date(formPage.formSettings.enrollmentDeadline)
    if (deadline < new Date()) {
      return (
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-red-600">Inschrijvingen gesloten</CardTitle>
          </CardHeader>
          <CardContent>
            <p>De inschrijvingen voor deze activiteit zijn helaas gesloten.</p>
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* PDF Document Preview */}
      {formPage.infoDocument?.url && (
        <div className="flex justify-center mb-6">
          <a
            href={formPage.infoDocument.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
          >
            <div className="text-2xl group-hover:scale-110 transition-transform duration-200">📄</div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors duration-200">Uitnodiging bekijken</div>
            </div>
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        )}

      {/* Price Information */}
      {formPage.paymentSettings?.isPaid && (
        <Card>
          <CardHeader>
            <CardTitle>Prijs Informatie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Prijs per kind: €{formPage.paymentSettings.pricePerChild}</p>
            <p className="font-semibold mt-2">Totaal ({children.length} {children.length === 1 ? 'kind' : 'kinderen'}): €{totalPrice}</p>
          </CardContent>
        </Card>
      )}

      {/* Children Information */}
      {children.map((child, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              {children.length > 1 ? `Kind ${index + 1}` : 'Deelnemer Informatie'}
              {children.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="ml-4"
                  onClick={() => removeChild(index)}
                >
                  Verwijderen
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>Voornaam *</Label>
                <Input 
                  id={`firstName-${index}`} 
                  value={child.firstName}
                  onChange={(e) => updateChild(index, 'firstName', e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Achternaam *</Label>
                <Input 
                  id={`lastName-${index}`} 
                  value={child.lastName}
                  onChange={(e) => updateChild(index, 'lastName', e.target.value)}
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add child button */}
      <Button 
        type="button" 
        variant="outline"
        onClick={addChild}
        className="w-full"
      >
        + Nog een kind toevoegen
      </Button>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Informatie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail adres ouder/voogd *</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </CardContent>
      </Card>

      {/* Custom questions */}
      {formPage.customQuestions && formPage.customQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Extra Vragen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formPage.customQuestions.map((question, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`custom_question_${index}`}>
                  {question.question} {question.required && '*'}
                </Label>
                <Textarea
                  id={`custom_question_${index}`}
                  name={`custom_question_${index}`}
                  required={question.required}
                  placeholder="Typ hier uw antwoord..."
                  rows={3}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Extra Opmerkingen</CardTitle>
          <CardDescription>
            Zijn er nog vragen of opmerkingen? (Bvb: leden moet vroeger vertrekken, innemen medicatie...) Dan zijn wij ervan op de hoogte en kunnen we er rekening mee houden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="comments">Opmerkingen</Label>
            <Textarea 
              id="comments" 
              name="comments"
              placeholder="Vul hier eventuele opmerkingen of vragen in..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Versturen...' : 'Inschrijving Versturen'}
        </Button>
      </form>
    </div>
  )
}