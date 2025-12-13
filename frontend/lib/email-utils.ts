export const DIVISION_EMAIL_MAP: Record<string, string> = {
    'kapoenen': 'kapoenen@scoutssintjohannes.be',
    'wouters': 'wouters@scoutssintjohannes.be',
    'jonggivers': 'jonggivers@scoutssintjohannes.be',
    'givers': 'givers@scoutssintjohannes.be',
    'jin': 'jin@scoutssintjohannes.be',
    'leiding': 'groepsleiding@scoutssintjohannes.be'
}

export const FALLBACK_EMAIL = 'groepsleiding@scoutssintjohannes.be'

export function getContactEmails(division: string | string[] | undefined) {
    if (!division) return { replyTo: FALLBACK_EMAIL, contacts: [{ name: 'Groepsleiding', email: FALLBACK_EMAIL }] }

    const divisions = Array.isArray(division) ? division : [division]
    const contacts: Array<{ name: string, email: string }> = []
    const replyToSet = new Set<string>()

    divisions.forEach(div => {
        const normalizeDiv = div.toLowerCase().trim()
        // Simple matching try
        const email = DIVISION_EMAIL_MAP[normalizeDiv]

        if (email) {
            contacts.push({ name: div, email })
            replyToSet.add(email)
        }
    })

    // If no known divisions found, use fallback
    if (contacts.length === 0) {
        return { replyTo: FALLBACK_EMAIL, contacts: [{ name: 'Groepsleiding', email: FALLBACK_EMAIL }] }
    }

    return {
        replyTo: Array.from(replyToSet).join(', '),
        contacts
    }
}
