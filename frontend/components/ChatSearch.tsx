'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Search from 'lucide-react/dist/esm/icons/search'
import X from 'lucide-react/dist/esm/icons/x'
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import { searchContent, submitQuestion, type SearchResult } from '@/app/actions'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import Send from 'lucide-react/dist/esm/icons/send'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'

type View = 'search' | 'contact'

export default function ChatSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState<View>('search')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    // Contact form state
    const [contactQuestion, setContactQuestion] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const pathname = usePathname()
    const controls = useAnimation()

    // Jiggle animation
    useEffect(() => {
        const interval = setInterval(() => {
            controls.start({
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 }
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [controls])

    // Close chat when navigating
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Focus input when opening
    useEffect(() => {
        if (isOpen && view === 'search') {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [isOpen, view])

    // Reset view when closing
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setView('search')
                setSubmitSuccess(false)
                setContactEmail('')
            }, 300)
        }
    }, [isOpen])

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value.length < 2) {
            setResults([])
            setHasSearched(false)
            return
        }

        setIsLoading(true)
        try {
            // Debounce could be added here, but for now direct call is fine for low traffic
            const searchResults = await searchContent(value)
            setResults(searchResults)
            setHasSearched(true)
        } catch (error) {
            console.error('Search failed', error)
        } finally {
            setIsLoading(false)
        }
    }

    const switchToContact = () => {
        setContactQuestion(query)
        setView('contact')
    }

    const handleSubmitQuestion = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await submitQuestion(contactQuestion, contactEmail)
            if (result.success) {
                setSubmitSuccess(true)
            }
        } catch (error) {
            console.error('Submit failed', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center relative">
                            {view === 'contact' && (
                                <button
                                    onClick={() => setView('search')}
                                    className="absolute left-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            )}
                            <h3 className={`font-semibold text-lg ${view === 'contact' ? 'w-full text-center' : ''}`}>
                                {view === 'search' ? 'Op zoek naar iets?' : 'Stel je vraag'}
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors absolute right-4"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Area with Slide Transition */}
                        <div className="flex-1 overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {view === 'search' ? (
                                    <motion.div
                                        key="search"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="flex flex-col h-full"
                                    >
                                        {/* Chat Body */}
                                        <div className="flex-1 p-4 overflow-y-auto min-h-[300px] bg-zinc-50 dark:bg-zinc-950/50">
                                            <div className="space-y-4">
                                                {/* Initial Message */}
                                                <div className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <MessageCircle size={16} className="text-primary" />
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-zinc-100 dark:border-zinc-800">
                                                        <p>Hallo! 👋 Waar ben je naar op zoek? Gebruik trefwoorden zoals "kapoenen weekend" voor het beste resultaat, of stel hier je vraag.</p>
                                                    </div>
                                                </div>

                                                {/* Results */}
                                                {query.length >= 2 && (
                                                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                        <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-11">
                                                            {isLoading ? 'Aan het zoeken...' : results.length > 0 ? 'Suggesties' : 'Geen resultaten gevonden'}
                                                        </div>

                                                        {results.map((result, index) => {
                                                            // Check if result URL is on same page
                                                            const isSamePage = result.url.split('?')[0] === pathname

                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    href={result.url}
                                                                    scroll={!isSamePage}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="flex gap-3 group"
                                                                >
                                                                    <div className="w-8 h-8 flex-shrink-0" /> {/* Spacer */}
                                                                    <div className="flex-1 bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:border-primary/50 hover:shadow-md transition-all group-hover:-translate-y-0.5">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <div className="flex items-center gap-2 mb-0.5">
                                                                                    <span className="text-xs font-medium text-primary">{result.description}</span>
                                                                                    {result.division && (
                                                                                        <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider">
                                                                                            {result.division}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{result.title}</h4>
                                                                            </div>
                                                                            <ArrowRight size={16} className="text-zinc-400 group-hover:text-primary transition-colors mt-1" />
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Input Area */}
                                        <div className={`px-4 pb-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 space-y-1 ${hasSearched ? 'pt-1' : 'pt-4'}`}>
                                            {/* Not Found Hint */}
                                            {hasSearched && (
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={switchToContact}
                                                        className="text-sm font-medium text-zinc-500 hover:text-primary transition-colors flex items-center gap-1.5 py-0.5"
                                                    >
                                                        Niet gevonden wat je zocht?
                                                        <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            )}

                                            <div className="relative">
                                                <input
                                                    ref={inputRef}
                                                    type="text"
                                                    placeholder="Typ je zoekopdracht..."
                                                    value={query}
                                                    onChange={handleSearch}
                                                    className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                                    {isLoading ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <Search size={18} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="contact"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950/50 p-4"
                                    >
                                        {submitSuccess ? (
                                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-6">
                                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                                                    <CheckCircle size={32} />
                                                </div>
                                                <h4 className="text-xl font-bold text-zinc-900">Bedankt!</h4>
                                                <p className="text-zinc-600">We hebben je vraag ontvangen en sturen zo snel mogelijk een antwoord naar je emailadres.</p>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                                >
                                                    Sluiten
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmitQuestion} className="flex-1 flex flex-col space-y-4">
                                                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Je vraag</label>
                                                    <textarea
                                                        value={contactQuestion}
                                                        onChange={(e) => setContactQuestion(e.target.value)}
                                                        className="w-full p-3 bg-zinc-50 rounded-lg border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none h-32"
                                                        placeholder="Wat wil je weten?"
                                                        required
                                                    />
                                                </div>

                                                <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Je emailadres</label>
                                                    <input
                                                        type="email"
                                                        value={contactEmail}
                                                        onChange={(e) => setContactEmail(e.target.value)}
                                                        className="w-full p-3 bg-zinc-50 rounded-lg border-none focus:ring-2 focus:ring-primary/20 outline-none"
                                                        placeholder="naam@voorbeeld.be"
                                                        required
                                                    />
                                                    <p className="text-xs text-zinc-500 mt-2">
                                                        We gebruiken dit enkel om je te antwoorden.
                                                    </p>
                                                </div>

                                                <div className="flex-1"></div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={18} className="animate-spin" />
                                                            Versturen...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Versturen
                                                            <Send size={18} />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="search"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <motion.div animate={controls}>
                                <span className="font-bold text-xl">?</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button >
        </>
    )
}
