'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateReceiptPDFFromHTML } from '@/lib/generate-receipt-pdf-html'
import { EnrollmentReceipt } from '@/components/EnrollmentReceipt'
import Download from 'lucide-react/dist/esm/icons/download'
import { useRef } from 'react'

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
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [enrollmentData, setEnrollmentData] = useState<any>(null)
  const receiptRef = useRef<HTMLDivElement>(null)
  
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

    // Check payment confirmation if payment is required
    if (formPage.paymentSettings?.isPaid && !paymentConfirmed) {
      setError('Je moet bevestigen dat je de betaling hebt uitgevoerd voordat je het formulier kunt versturen.')
      setIsSubmitting(false)
      return
    }

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

      const result = await response.json()
      
      // Store enrollment data for PDF generation
      setEnrollmentData({
        enrollmentId: result.enrollment.id,
        targetTitle: formPage.target.title,
        targetType: formPage.targetType,
        children: childrenData,
        customAnswers: customAnswers,
        comments: formData.get('comments') as string || '',
        totalPrice: totalPrice,
        paymentInstructions: formPage.paymentSettings?.paymentInstructions,
        isPaid: formPage.paymentSettings?.isPaid,
        startDate: formPage.target.startDate,
        endDate: formPage.target.endDate,
        division: formPage.target.division,
        createdAt: result.enrollment.createdAt || new Date().toISOString(),
        bannerImage: formPage.target.bannerImage
      })

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!enrollmentData || !receiptRef.current) return
    
    const fileName = `inschrijving-${enrollmentData.targetTitle.toLowerCase().replace(/\s+/g, '-')}-${enrollmentData.enrollmentId}.pdf`
    
    try {
      await generateReceiptPDFFromHTML(receiptRef.current, fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setError('Er is een fout opgetreden bij het genereren van de PDF')
    }
  }

  if (success && enrollmentData) {
    return (
      <>
        {/* Hidden receipt for PDF generation */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div ref={receiptRef}>
            <EnrollmentReceipt data={{
              ...enrollmentData,
              description: formPage.target.description
            }} />
          </div>
        </div>

        {/* Visible success message */}
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-primary">Inschrijving verzonden!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{formPage.formSettings?.customMessage || 'Je inschrijving is succesvol geregistreerd!'}</p>
            
            {formPage.paymentSettings?.isPaid && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 font-semibold text-sm">
                  Let op: Inschrijving is pas definitief als de betaling is ontvangen.
                </p>
              </div>
            )}
            
            <div className="pt-4">
              <Button
                onClick={handleDownloadPDF}
                variant="default"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Bevestiging (PDF)
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Download en bewaar deze bevestiging voor je administratie.
                {formPage.paymentSettings?.isPaid && ' De betalingsinformatie vind je in de PDF.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </>
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

      {/* Payment Information */}
      {formPage.paymentSettings?.isPaid && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Betaling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-semibold text-sm">
                Let op: Inschrijving is pas definitief als de betaling is ontvangen.
              </p>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Prijs per kind: €{formPage.paymentSettings.pricePerChild}</p>
              <p className="font-bold text-lg text-primary">Totaal te betalen ({children.length} {children.length === 1 ? 'kind' : 'kinderen'}): €{totalPrice}</p>
            </div>
            
            {formPage.paymentSettings.paymentInstructions && (
              <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                <h4 className="font-semibold text-primary mb-2">Betaalinstructies:</h4>
                <div className="text-sm text-foreground whitespace-pre-wrap">
                  {formPage.paymentSettings.paymentInstructions}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Payment Confirmation */}
      {formPage.paymentSettings?.isPaid && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="payment-confirmation"
                checked={paymentConfirmed}
                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="payment-confirmation" className="text-sm text-foreground cursor-pointer">
                <span className="font-semibold">Ik bevestig dat ik de betaling van €{totalPrice} heb uitgevoerd volgens de bovenstaande instructies.</span>
                <br />
                <span className="text-xs text-muted-foreground">
                  Je moet dit vakje aanvinken om je inschrijving te kunnen versturen.
                </span>
              </label>
            </div>
          </CardContent>
        </Card>
      )}

        <Button 
          type="submit" 
          disabled={isSubmitting || (formPage.paymentSettings?.isPaid && !paymentConfirmed)}
          className="w-full"
        >
          {isSubmitting ? 'Versturen...' : 'Inschrijving Versturen'}
        </Button>
      </form>
    </div>
  )
}