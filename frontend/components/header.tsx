import Link from "next/link"
import TransitionLink from "./TransitionLink"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center">
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
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild className="transition-colors">
              <TransitionLink href="/inschrijven">Inschrijven</TransitionLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 