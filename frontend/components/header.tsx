"use client"

import TransitionLink from "./TransitionLink"
import { Button } from "./ui/button"
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import { useState } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <TransitionLink href="/" className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="hidden font-bold sm:inline-block">Scouts Sint-Johannes</span>
          </TransitionLink>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <TransitionLink href="/inschrijven" className="transition-colors hover:text-primary">Info</TransitionLink>
            <TransitionLink href="/leiding" className="transition-colors hover:text-primary">Leiding</TransitionLink>
            <TransitionLink href="/fotos" className="transition-colors hover:text-primary">Foto's</TransitionLink>
            <TransitionLink href="/verhuur-lokaal" className="transition-colors hover:text-primary">Verhuur Lokaal</TransitionLink>
            <TransitionLink href="/contact" className="transition-colors hover:text-primary">Contact</TransitionLink>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden w-full items-center justify-between">
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:opacity-80 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Centered Logo */}
          <TransitionLink href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="font-bold text-sm">Scouts Sint-Johannes</span>
          </TransitionLink>

          {/* Inschrijven Button */}
          <Button asChild size="sm" className="transition-colors text-xs px-3">
            <TransitionLink href="/inschrijven">Inschrijven</TransitionLink>
          </Button>
        </div>

        {/* Desktop Inschrijven Button */}
        <div className="hidden md:flex flex-1 items-center justify-end">
          <Button asChild className="transition-colors">
            <TransitionLink href="/inschrijven">Inschrijven</TransitionLink>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur border-t shadow-lg">
          <nav className="container py-4 flex flex-col space-y-3">
            <TransitionLink 
              href="/inschrijven" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Info
            </TransitionLink>
            <TransitionLink 
              href="/leiding" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leiding
            </TransitionLink>
            <TransitionLink 
              href="/fotos" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Foto's
            </TransitionLink>
            <TransitionLink 
              href="/verhuur-lokaal" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Verhuur Lokaal
            </TransitionLink>
            <TransitionLink 
              href="/contact" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </TransitionLink>
          </nav>
        </div>
      )}
    </header>
  )
} 