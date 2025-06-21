"use client"

import "./globals.css"
import { primaryFont, secondaryFont, headingFont } from "@/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "./components/Footer"
import { CategorySelectionProvider } from "@/hooks/CategorySelectionContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning className={`${primaryFont.variable} ${secondaryFont.variable} ${headingFont.variable}`}>
      <head>
        <title>Scouts Sint-Johannes</title>
        <meta
          name="description"
          content="Welkom bij Scouts Sint-Johannes, waar avontuur en vriendschap samenkomen."
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CategorySelectionProvider>
            <div className="flex flex-col min-h-screen">
              {children}
              <Footer />
            </div>
          </CategorySelectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}