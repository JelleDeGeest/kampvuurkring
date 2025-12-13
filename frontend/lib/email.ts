import nodemailer from 'nodemailer'

interface EmailOptions {
    to: string
    subject: string
    text?: string
    html?: string
    replyTo?: string
    attachments?: Array<{
        filename: string
        content: Buffer | string
        contentType?: string
    }>
}

export async function sendEmail({ to, subject, text, html, replyTo, attachments }: EmailOptions): Promise<{ success: boolean; error?: any }> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Scouts Sint-Johannes" <no-reply@scoutssintjohannes.be>',
            to,
            replyTo,
            subject,
            text,
            html,
            attachments,
        })

        return { success: true }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, error }
    }
}
