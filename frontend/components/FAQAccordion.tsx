'use client'

import { useState, useMemo, useEffect } from 'react'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import Search from 'lucide-react/dist/esm/icons/search'
import X from 'lucide-react/dist/esm/icons/x'
import { cn } from '@/lib/utils'
import { PayloadRichText } from './PayloadRichText'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

interface FAQItem {
    id: string
    question: string
    answer: any // RichText content
    category?: any // Relationship to FAQCategory
}

interface FAQAccordionProps {
    items: FAQItem[]
    categories: { id: string; title: string }[] // Updated to reflect the structure of category objects
    className?: string
}

export default function FAQAccordion({ items, categories: initialCategories, className }: FAQAccordionProps) {
    const [openItem, setOpenItem] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const searchParams = useSearchParams()

    // Use categories passed from props
    const categories = useMemo(() => {
        return ['All', ...initialCategories.map(cat => cat.title)]
    }, [initialCategories])

    // Filter items based on search and category
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                JSON.stringify(item.answer).toLowerCase().includes(searchQuery.toLowerCase())

            // Handle category relationship (object or ID)
            const itemCategoryTitle = typeof item.category === 'object' && item.category !== null
                ? (item.category as any).title
                : item.category as string || ''

            const matchesCategory = selectedCategory === 'All' || itemCategoryTitle === selectedCategory

            return matchesSearch && matchesCategory
        })
    }, [items, searchQuery, selectedCategory])

    // Handle scrollTo query param
    useEffect(() => {
        const scrollToId = searchParams.get('scrollTo')
        if (scrollToId) {
            // Wait for render
            setTimeout(() => {
                const element = document.getElementById(`faq-${scrollToId}`)
                if (element) {
                    const yOffset = -100; // Offset for header
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    // Scroll to item
                    window.scrollTo({ top: y, behavior: 'smooth' });

                    // If already open, just highlight. If closed, open then highlight.
                    if (openItem === scrollToId) {
                        // Highlight animation
                        element.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
                        setTimeout(() => {
                            element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
                        }, 2000)
                    } else {
                        // Open item and highlight after scroll (approximate time for smooth scroll)
                        setTimeout(() => {
                            setOpenItem(scrollToId)

                            // Highlight animation
                            element.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
                            setTimeout(() => {
                                element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
                            }, 2000)
                        }, 500)
                    }
                }
            }, 100)
        }
    }, [searchParams, items, openItem])

    const toggleItem = (id: string) => {
        setOpenItem(openItem === id ? null : id)
    }

    const clearSearch = () => {
        setSearchQuery('')
        setSelectedCategory('All')
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Er zijn momenteel geen veelgestelde vragen beschikbaar.
            </div>
        )
    }

    return (
        <div className={cn("space-y-8", className)}>
            {/* Controls Section */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Zoek een vraag of antwoord..."
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition duration-150 ease-in-out shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                                selectedCategory === category
                                    ? "bg-primary text-white border-primary shadow-md transform scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            )}
                        >
                            {category === 'All' ? 'Alle vragen' : category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500 ml-1">
                {filteredItems.length} {filteredItems.length === 1 ? 'vraag' : 'vragen'} gevonden
            </div>

            {/* FAQ List */}
            <div className="space-y-6">
                <AnimatePresence mode='popLayout'>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <motion.div
                                id={`faq-${item.id}`}
                                layout="position"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                key={item.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Header */}
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className={cn(
                                        "w-full p-6 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer group",
                                        "bg-primary/5 border-b border-primary/10 hover:bg-primary/10"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3
                                                className="text-lg font-bold text-primary transition-colors duration-200"
                                            >
                                                {item.question}
                                            </h3>
                                            {item.category && (
                                                <span className="inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-primary border border-primary/20 capitalize shadow-sm">
                                                    {typeof item.category === 'object' ? (item.category as any).title : ''}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 pt-1">
                                            <motion.div
                                                animate={{ rotate: openItem === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown className={cn(
                                                    "h-5 w-5 text-primary/60 transition-colors duration-200 group-hover:text-primary",
                                                    openItem === item.id && "text-primary"
                                                )} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </button>

                                {/* Content */}
                                <AnimatePresence>
                                    {openItem === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div className="px-6 pb-6 pt-6 bg-white">
                                                <div className="prose prose-sm max-w-none text-gray-600">
                                                    <PayloadRichText content={item.answer} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 shadow-sm"
                        >
                            <p className="text-gray-500 mb-2">Geen vragen gevonden voor je zoekopdracht.</p>
                            <button
                                onClick={clearSearch}
                                className="text-primary hover:underline font-medium"
                            >
                                Filters wissen
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
