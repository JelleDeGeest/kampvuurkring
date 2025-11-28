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
import Users from 'lucide-react/dist/esm/icons/users'
import Mail from 'lucide-react/dist/esm/icons/mail'
import MessageSquare from 'lucide-react/dist/esm/icons/message-square'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import CircleHelp from 'lucide-react/dist/esm/icons/circle-help'
import CircleCheck from 'lucide-react/dist/esm/icons/circle-check'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Download from 'lucide-react/dist/esm/icons/download'
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle'
import Info from 'lucide-react/dist/esm/icons/info'
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
  const formattedTotalPrice = totalPrice > 0
    ? new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(totalPrice)
    : null

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

      window.scrollTo({ top: 0, behavior: 'smooth' })
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
        <Card className="max-w-2xl mx-auto mt-8 border border-primary/20 shadow-lg">
          <CardHeader className="border-0 pt-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary shadow-inner">
                <CircleCheck className="w-16 h-16" />
              </div>
              <CardTitle className="text-3xl font-semibold text-primary">Inschrijving verzonden!</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-10 pb-10 flex flex-col items-center text-center space-y-6">
            <p className="text-lg text-muted-foreground max-w-xl">
              {formPage.formSettings?.customMessage || 'Je inschrijving is succesvol geregistreerd!'}
            </p>

            {formPage.paymentSettings?.isPaid && (
              <div className="w-full max-w-lg rounded-2xl border border-amber-200 bg-amber-50 px-8 py-6 text-left shadow-sm">
                <div className="flex items-center gap-3 text-lg font-semibold text-amber-800 mb-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  Let op
                </div>
                <p className="text-base leading-relaxed text-amber-900">
                  Inschrijving is pas definitief zodra de betaling van <span className="font-semibold">{formattedTotalPrice ? ` ${formattedTotalPrice}` : ''}</span> ontvangen is.
                </p>

              </div>
            )}

            <div className="flex flex-col items-center gap-3 w-full">
              <Button
                onClick={handleDownloadPDF}
                variant="default"
                className="min-w-[220px] flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md"
              >
                <Download className="h-4 w-4" />
                Download Bevestiging
              </Button>
              <p className="text-sm text-muted-foreground">
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
      <Card className="max-w-2xl mx-auto mt-8 border-red-200 shadow-md">
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
        <Card className="max-w-2xl mx-auto mt-8 border-red-200 shadow-md">
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
      {formPage.infoDocument?.url && (
        <div className="flex justify-center">
          <a
            href={formPage.infoDocument.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
          >
            <div className="text-3xl animate-bounce group-hover:animate-none">📄</div>
            <div>
              <div className="font-bold text-lg">Uitnodiging bekijken</div>
              <div className="text-sm opacity-90">Klik hier voor meer informatie</div>
            </div>
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 shadow-sm">
            {error}
          </div>
        )}


        {/* Children Information */}
        {children.map((child, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center justify-between text-primary">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {children.length > 1 ? `Kind ${index + 1}` : 'Deelnemer Informatie'}
                </div>
                {children.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeChild(index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Verwijderen
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor={`firstName-${index}`} className="text-gray-700">Voornaam *</Label>
                  <Input
                    id={`firstName-${index}`}
                    value={child.firstName}
                    onChange={(e) => updateChild(index, 'firstName', e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`lastName-${index}`} className="text-gray-700">Achternaam *</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={child.lastName}
                    onChange={(e) => updateChild(index, 'lastName', e.target.value)}
                    required
                    className="bg-white"
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
          className="w-full border-dashed border-2 py-6 text-primary hover:bg-primary/5 hover:border-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nog een kind toevoegen
        </Button>

        {/* Contact Information */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/10">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Mail className="w-5 h-5" />
              Contact Informatie
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">E-mail adres ouder/voogd *</Label>
              <Input id="email" name="email" type="email" required className="bg-white" />
            </div>
          </CardContent>
        </Card>

        {/* Custom questions */}
        {formPage.customQuestions && formPage.customQuestions.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <CircleHelp className="w-5 h-5" />
                Extra Vragen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {formPage.customQuestions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`custom_question_${index}`} className="text-gray-700">
                    {question.question} {question.required && '*'}
                  </Label>
                  <Textarea
                    id={`custom_question_${index}`}
                    name={`custom_question_${index}`}
                    required={question.required}
                    placeholder="Typ hier uw antwoord..."
                    rows={3}
                    className="bg-white"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Additional Options */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/10">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="flex items-center gap-2 text-primary">
              <MessageSquare className="w-5 h-5" />
              Extra Opmerkingen
            </CardTitle>
            <CardDescription>
              Zijn er nog vragen of opmerkingen? (Bvb: leden moet vroeger vertrekken, innemen medicatie...) Dan zijn wij ervan op de hoogte en kunnen we er rekening mee houden.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-gray-700">Opmerkingen</Label>
              <Textarea
                id="comments"
                name="comments"
                placeholder="Vul hier eventuele opmerkingen of vragen in..."
                rows={4}
                className="bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment & Confirmation */}
        {formPage.paymentSettings?.isPaid && (
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <CreditCard className="w-5 h-5" />
                Betaling & Bevestiging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">

              {/* Price Section - Invoice Style */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Prijs per deelnemer</span>
                  <span className="font-medium text-gray-900">€{formPage.paymentSettings.pricePerChild}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Aantal deelnemers</span>
                  <span className="font-medium text-gray-900">{children.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b-4 border-primary">
                  <span className="font-bold text-lg text-primary">Totaal te betalen</span>
                  <span className="font-bold text-2xl text-primary">€{totalPrice}</span>
                </div>
              </div>

              {/* Instructions */}
              {formPage.paymentSettings.paymentInstructions && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-600 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Info className="w-4 h-4" /> Betaalinstructies
                  </h4>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed pl-1">
                    {formPage.paymentSettings.paymentInstructions}
                  </div>
                </div>
              )}

              {/* Confirmation Action Area */}
              <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 transition-colors hover:border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="flex h-6 items-center">
                    <input
                      type="checkbox"
                      id="payment-confirmation"
                      checked={paymentConfirmed}
                      onChange={(e) => setPaymentConfirmed(e.target.checked)}
                      className="h-5 w-5 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                  <label htmlFor="payment-confirmation" className="text-sm cursor-pointer select-none">
                    <span className="font-semibold text-gray-900 block mb-1">
                      Ik bevestig de betaling van €{totalPrice}
                    </span>
                    <span className="text-gray-500 block leading-relaxed">
                      Ik heb de betaling uitgevoerd volgens de bovenstaande instructies. Dit is vereist om de inschrijving te voltooien.
                    </span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || (formPage.paymentSettings?.isPaid && !paymentConfirmed)}
          className="w-full py-6 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Versturen...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Inschrijving Versturen <CircleCheck className="w-5 h-5" />
            </span>
          )}
        </Button>
      </form>
    </div>
  )
}
