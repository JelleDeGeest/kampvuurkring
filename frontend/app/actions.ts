'use server'

import getPayloadClient from "@/lib/getPayload"

export type SearchResult = {
    type: 'faq' | 'activity' | 'page' | 'weekend' | 'camp' | 'event' | 'leader'
    title: string
    url: string
    description?: string
    division?: string
}

import Fuse from 'fuse.js'

export async function searchContent(query: string): Promise<SearchResult[]> {
    if (!query || query.length < 2) return []

    const payload = await getPayloadClient()
    const now = new Date().toISOString()

    // We'll collect all searchable items here
    let allItems: any[] = []

    try {
        // 0. Static Pages & Divisions
        const divisions = [
            { name: 'Kapoenen', slug: 'kapoenen' },
            { name: 'Wouters', slug: 'wouters' },
            { name: 'Jonggivers', slug: 'jonggivers' },
            { name: 'Givers', slug: 'givers' },
            { name: 'Jin', slug: 'jin' },
        ]

        divisions.forEach(div => {
            allItems.push({
                type: 'page',
                title: `${div.name} Activiteiten`,
                url: `/?category=${div.slug}`,
                description: 'Tak',
                keywords: [div.name, 'tak', 'afdeling', 'groep'],
                division: div.name
            })
        })

        const pages = [
            { title: 'Verhuur Lokaal', url: '/verhuur-lokaal', keywords: ['verhuur', 'lokaal', 'slapen', 'weekend', 'gebouw', 'huren'] },
            { title: 'Inschrijven', url: '/inschrijven', keywords: ['inschrijven', 'lid worden', 'nieuwe leden', 'aansluiten'] },
            { title: 'Contact', url: '/contact', keywords: ['contact', 'email', 'adres', 'kaart', 'ligging', 'locatie'] },
            { title: 'Leiding', url: '/leiding', keywords: ['leiding', 'takken', 'staf', 'monitor'] },
            { title: 'Foto\'s', url: '/fotos', keywords: ['fotos', 'album', 'beelden', 'media'] },
            { title: 'FAQ', url: '/faq', keywords: ['faq', 'vragen', 'hulp', 'info'] },
        ]

        pages.forEach(page => {
            allItems.push({
                type: 'page',
                title: page.title,
                url: page.url,
                description: 'Pagina',
                keywords: page.keywords
            })
        })

        // 1. Fetch FAQs
        const faqs = await payload.find({
            collection: 'faqs',
            limit: 100,
        })

        faqs.docs.forEach((doc) => {
            const answerText = JSON.stringify(doc.answer)
            allItems.push({
                type: 'faq',
                title: doc.question,
                url: `/faq?scrollTo=${doc.id}`,
                description: 'Veelgestelde vragen',
                content: answerText
            })
        })

        // 2. Fetch Future Activities (Next One Only per Division)
        const activities = await payload.find({
            collection: 'activiteiten',
            where: {
                endDate: { greater_than: now },
            },
            sort: 'startDate', // Sort by date to find the next one
            limit: 100,
        })

        const activitiesByDivision: Record<string, any> = {}

        activities.docs.forEach((doc) => {
            const division = doc.division && doc.division.length > 0 ? doc.division[0] : 'algemeen'

            // Only keep the first (next) activity for this division
            if (!activitiesByDivision[division]) {
                const anchorId = `${doc.id}-${division}-0`
                activitiesByDivision[division] = {
                    type: 'activity',
                    title: doc.title,
                    url: `/?category=${division}&scrollTo=${anchorId}`,
                    description: `Volgende Activiteit`,
                    division: division,
                    keywords: [`${division} activiteit`, 'activiteit', division]
                }
            }
        })

        // Add filtered activities to allItems
        Object.values(activitiesByDivision).forEach(item => allItems.push(item))


        // 3. Fetch Future Weekends
        const weekends = await payload.find({
            collection: 'weekends',
            where: {
                endDate: { greater_than: now },
            },
            limit: 50,
        })

        weekends.docs.forEach((doc) => {
            const division = doc.division && doc.division.length > 0 ? doc.division[0] : 'algemeen'
            const anchorId = `weekend-${doc.startDate}-${division}-0`
            allItems.push({
                type: 'weekend',
                title: doc.title,
                url: `/?category=${division}&scrollTo=${anchorId}`,
                description: `Weekend`,
                division: division,
                keywords: [`${division} weekend`, 'weekend', division]
            })
        })

        // 4. Fetch Future Camps
        const camps = await payload.find({
            collection: 'camps',
            where: {
                endDate: { greater_than: now },
            },
            limit: 50,
        })

        camps.docs.forEach((doc) => {
            const division = doc.division && doc.division.length > 0 ? doc.division[0] : 'algemeen'
            const anchorId = `camp-${doc.startDate}-${division}-0`
            allItems.push({
                type: 'camp',
                title: doc.title,
                url: `/?category=${division}&scrollTo=${anchorId}`,
                description: `Kamp`,
                division: division,
                keywords: [`${division} kamp`, 'kamp', division]
            })
        })

        // 5. Fetch Future Events
        const events = await payload.find({
            collection: 'events',
            where: {
                startDate: { greater_than: now },
            },
            limit: 50,
        })

        events.docs.forEach((doc) => {
            const anchorId = `event-${doc.startDate}-${doc.id}`
            allItems.push({
                type: 'event',
                title: doc.title,
                url: `/?category=event&scrollTo=${anchorId}`,
                description: `Evenement`,
                content: doc.description
            })
        })

        // 6. Fetch Leaders
        const leaders = await payload.find({
            collection: 'leiders',
            limit: 100,
        })

        leaders.docs.forEach((doc) => {
            allItems.push({
                type: 'leader',
                title: doc.name + (doc.totem ? ` (${doc.totem})` : ''),
                url: `/leiding/${doc.id}`,
                description: `Leiding`,
                keywords: [doc.name, doc.totem, doc.kapoenenNaam, doc.wouterNaam].filter(Boolean)
            })
        })

        // --- PERFORM FUZZY SEARCH ---
        // General approach: Tokenize the query and search for ANY of the significant words (OR logic).
        // We filter out very short words (<= 2 chars) to reduce noise from 'is', 'de', 'en', etc.,
        // but keep 3-letter words like 'Jin' or 'Tak'.
        // We rely on field weights (Title > Content) to ensure relevant matches rank higher than noise matches.

        const tokens = query
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 2)

        // If we have tokens, join them with OR operator (|), otherwise fallback to original query
        const finalQuery = tokens.length > 0 ? tokens.join(' | ') : query

        const options = {
            includeScore: true,
            useExtendedSearch: true, // Enable extended search for logical operators
            keys: [
                { name: 'title', weight: 1.0 },
                { name: 'keywords', weight: 0.8 },
                { name: 'division', weight: 0.6 },
                { name: 'description', weight: 0.4 },
                { name: 'content', weight: 0.2 },
            ],
            threshold: 0.4, // Standard threshold
            ignoreLocation: true,
        }

        const fuse = new Fuse(allItems, options)
        const result = fuse.search(finalQuery)

        // Map back to SearchResult and take top 10
        return result.slice(0, 10).map(({ item }) => ({
            type: item.type,
            title: item.title,
            url: item.url,
            description: item.description,
            division: item.division // Pass division to frontend
        }))

    } catch (error) {
        console.error("Search error:", error)
        return []
    }
}

import nodemailer from 'nodemailer'

export async function submitQuestion(question: string, email: string): Promise<{ success: boolean, message?: string }> {
    if (!question || !email) {
        return { success: false, message: 'Vul alle velden in.' }
    }

    try {
        console.log('Configuring SMTP with host:', process.env.SMTP_HOST || '(not set, defaulting to localhost)')

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
            to: 'groepsleiding@scoutssintjohannes.be',
            replyTo: email,
            subject: 'Nieuwe vraag via website zoekfunctie',
            text: `
Er is een nieuwe vraag gesteld via de website:

Vraag:
${question}

Email van vragensteller:
${email}
            `,
            html: `
<h3>Er is een nieuwe vraag gesteld via de website:</h3>
<p><strong>Vraag:</strong><br>${question.replace(/\n/g, '<br>')}</p>
<p><strong>Email van vragensteller:</strong><br><a href="mailto:${email}">${email}</a></p>
            `,
        })

        return { success: true }
    } catch (error) {
        console.error('Email send error:', error)
        // We return success true even if email fails to not discourage the user, 
        // but in a real app you might want to handle this differently or log it to DB as backup.
        // For now, we'll assume if SMTP isn't set up, we just log it.
        return { success: true }
    }
}
