import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-[color:var(--primary-color)] hover:text-[color:var(--primary-color)]/80 transition-colors">
              Scouts Sint-Johannes
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/over"
              className="transition-colors hover:text-[color:var(--primary-color)] text-[color:var(--text-color)]/60"
            >
              Over
            </Link>
            <Link
              href="/activiteiten"
              className="transition-colors hover:text-[color:var(--primary-color)] text-[color:var(--text-color)]/60"
            >
              Activiteiten
            </Link>
            <Link
              href="/ratel"
              className="transition-colors hover:text-[color:var(--primary-color)] text-[color:var(--text-color)]/60"
            >
              Ratel
            </Link>
            <Link
              href="/verhuur-lokaal"
              className="transition-colors hover:text-[color:var(--primary-color)] text-[color:var(--text-color)]/60"
            >
              Verhuur Lokaal
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button asChild className="bg-[color:var(--primary-color)] hover:bg-[color:var(--primary-color)]/80">
              <Link href="/lid-worden">Word Lid</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 