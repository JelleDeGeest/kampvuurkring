import { NextRequest, NextResponse } from 'next/server'
import getPayloadClient from '@/lib/getPayload'
import { sendEmail } from '@/lib/email'
import { getContactEmails } from '@/lib/email-utils'
import { Buffer } from 'buffer'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: enrollmentId } = await params
        const payload = await getPayloadClient()

        // Parse the multipart form data to get the PDF file
        const formData = await request.formData()
        const pdfFile = formData.get('pdf') as File

        if (!pdfFile) {
            return NextResponse.json(
                { error: 'PDF file is required' },
                { status: 400 }
            )
        }

        // Convert file to buffer
        const arrayBuffer = await pdfFile.arrayBuffer()
        const pdfBuffer = Buffer.from(arrayBuffer)

        // Fetch enrollment to get details for email
        const enrollment = await payload.findByID({
            collection: 'enrollments' as any,
            id: enrollmentId,
        })

        if (!enrollment) {
            return NextResponse.json(
                { error: 'Enrollment not found' },
                { status: 404 }
            )
        }

        // Find the target item to get division and other setting
        const targetType = enrollment.targetType
        const targetId = enrollment.targetId

        // We need to fetch the target item (activity, weekend, or camp)
        // Since we don't know the exact collection name for findByID without casting,
        // we use the stored targetType which should preserve the collection slug
        const targetItem = await payload.findByID({
            collection: targetType as any,
            id: targetId,
        })

        if (!targetItem) {
            // Should rarely happen if referential integrity is maintained
            return NextResponse.json(
                { error: 'Target item not found' },
                { status: 404 }
            )
        }

        // Resolve contact emails
        const { replyTo, contacts } = getContactEmails(targetItem.division)

        const contactInfoHtml = contacts.map(c => `<li><strong>${c.name}</strong>: <a href="mailto:${c.email}">${c.email}</a></li>`).join('')
        const contactInfoText = contacts.map(c => `- ${c.name}: ${c.email}`).join('\n')

        // Format children names
        // @ts-ignore - Payload types can be tricky
        const childrenNames = (enrollment.children || []).map((child: any) => `${child.participantInfo.firstName} ${child.participantInfo.lastName}`)
        const childrenString = childrenNames.length > 1
            ? childrenNames.slice(0, -1).join(', ') + ' en ' + childrenNames.slice(-1)
            : childrenNames[0] || 'de deelnemer'

        const email = enrollment.participantEmail

        console.log(`Sending confirmation email for enrollment ${enrollmentId} to ${email}`)

        await sendEmail({
            to: email,
            replyTo: replyTo,
            subject: `Bevestiging inschrijving: ${targetItem.title}`,
            text: `Beste,

Bedankt om ${childrenString} in te schrijven voor "${targetItem.title}".
In bijlage vind je het bevestigingsdocument met alle details${targetItem.enrollmentSettings?.isPaid ? ' en betalingsinstructies' : ''}.

--------------------------------------------------
Dit is een automatisch gegenereerd bericht vanuit de website.

Heb je nog vragen? Je kan antwoorden op deze mail of rechtstreeks contact opnemen met:
${contactInfoText}
--------------------------------------------------

Met vriendelijke groeten,
Scouts Sint-Johannes`,
            html: `<p>Beste,</p>
<p>Bedankt om <strong>${childrenString}</strong> in te schrijven voor "<strong>${targetItem.title}</strong>".</p>
<p>In bijlage vind je het bevestigingsdocument met alle details${targetItem.enrollmentSettings?.isPaid ? ' en betalingsinstructies' : ''}.</p>
<hr>
<p style="font-size: 0.9em; color: #666;"><em>Dit is een automatisch gegenereerd bericht vanuit de website.</em></p>
<p><strong>Heb je nog vragen? Je kan antwoorden op deze mail of rechtstreeks contact opnemen met:</strong></p>
<ul>
${contactInfoHtml}
</ul>
<hr>
<p>Met vriendelijke groeten,<br>Scouts Sint-Johannes</p>`,
            attachments: [
                {
                    filename: `inschrijving-${targetItem.title.toLowerCase().replace(/\s+/g, '-')}-${enrollment.id}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Error in confirmation route:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
