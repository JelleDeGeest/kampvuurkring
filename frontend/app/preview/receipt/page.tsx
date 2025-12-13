'use client'

import React, { useState, useEffect } from 'react'
import { EnrollmentReceipt } from '@/components/EnrollmentReceipt'

export default function ReceiptPreviewPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const mockData = {
        enrollmentId: 'TEST-123456',
        targetTitle: 'Zomerkamp 2025: De Wilde Ruimte',
        targetType: 'camps',
        children: [
            {
                participantInfo: {
                    firstName: 'Jan',
                    lastName: 'Janssens'
                }
            },
            {
                participantInfo: {
                    firstName: 'Piet',
                    lastName: 'Peeters'
                }
            }
        ],
        customAnswers: {
            'Heeft uw kind allergieën?': 'Ja, notenallergie',
            'Mag uw kind zwemmen?': 'Ja, diploma B'
        },
        comments: 'Graag de kinderen in dezelfde groep zetten als Tom en Jerry.',
        totalPrice: 250,
        paymentInstructions: 'Gelieve over te schrijven op BE12 3456 7890 1234 met vermelding van "Kamp 2025 - Jan & Piet".',
        isPaid: true,
        startDate: '2025-07-01T10:00:00.000Z',
        endDate: '2025-07-10T16:00:00.000Z',
        division: ['Kapoenen', 'Wouters'],
        createdAt: new Date().toISOString(),
        // Optional banner image mock
        bannerImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000&auto=format&fit=crop',
        description: {
            root: {
                children: [
                    {
                        children: [
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: 'Dit is een voorbeeld van de beschrijving van de activiteit. Het kan ',
                                type: 'text',
                                version: 1
                            },
                            {
                                detail: 0,
                                format: 1,
                                mode: 'normal',
                                style: '',
                                text: 'dikgedrukte',
                                type: 'text',
                                version: 1
                            },
                            {
                                detail: 0,
                                format: 0,
                                mode: 'normal',
                                style: '',
                                text: ' tekst bevatten en andere rijke opmaak.',
                                type: 'text',
                                version: 1
                            }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'paragraph',
                        version: 1
                    }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'root',
                version: 1
            }
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="shadow-2xl">
                <EnrollmentReceipt data={mockData} />
            </div>
        </div>
    )
}
