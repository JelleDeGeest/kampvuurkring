import PageBanner from '@/components/PageBanner'
import FAQAccordion from '@/components/FAQAccordion'
import { Suspense } from 'react'

// Force dynamic rendering to ensure fresh data
import { resolveMediaUrl } from '@/lib/mediaHelpers'

export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';



async function fetchFAQs() {
    try {
        const res = await fetch(
            `${PAYLOAD_URL}/api/faqs?sort=order`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.docs || [];
    } catch (error) {
        console.warn('Error fetching FAQs:', error);
        return [];
    }
}

import getPayloadClient from '@/lib/getPayload'

export default async function FAQPage() {
    const payload = await getPayloadClient()

    // Fetch FAQ Page Global for banner
    const faqPage = await payload.findGlobal({
        slug: 'faq-page',
    })

    // Fetch FAQ Categories
    const categoriesResult = await payload.find({
        collection: 'faq-categories',
        sort: 'order',
    })
    const categories = categoriesResult.docs.map(cat => ({
        ...cat,
        id: String(cat.id)
    }))

    // Fetch FAQs with depth to get category details
    const faqsResult = await payload.find({
        collection: 'faqs',
        sort: 'order',
        depth: 1,
        limit: 100,
    })

    const faqs = faqsResult.docs.map(faq => ({
        ...faq,
        id: String(faq.id)
    }))

    // Resolve banner image URL
    const resolvedBannerImageUrl = faqPage.bannerImage
        ? resolveMediaUrl(
            typeof faqPage.bannerImage === 'object' && faqPage.bannerImage?.url
                ? faqPage.bannerImage.url
                : typeof faqPage.bannerImage === 'string'
                    ? faqPage.bannerImage
                    : undefined,
            PAYLOAD_URL
        )
        : undefined

    return (
        <div className="flex min-h-screen flex-col">
            <PageBanner
                title={faqPage.title}
                subtitle={faqPage.subtitle}
                banner={faqPage.bannerImage as any}
                resolvedBannerImageUrl={resolvedBannerImageUrl}
            />

            <main className="flex-1 bg-gray-50/30">
                <div className="container w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-16 md:pb-24">
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl -z-10 rounded-3xl" />
                        <Suspense fallback={<div>Laden...</div>}>
                            <FAQAccordion items={faqs} categories={categories} />
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    )
}
