import Link from "next/link"
import { Button } from "./ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="hidden font-bold sm:inline-block">Scouts Sint-Johannes</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/inschrijven" className="transition-colors hover:text-primary">Info</Link>
            <Link href="/leiding" className="transition-colors hover:text-primary">Leiding</Link>
            <Link href="/fotos" className="transition-colors hover:text-primary">Foto's</Link>
            <Link href="/verhuur-lokaal" className="transition-colors hover:text-primary">Verhuur Lokaal</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild className="transition-colors">
              <Link href="/inschrijven">Inschrijven</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 