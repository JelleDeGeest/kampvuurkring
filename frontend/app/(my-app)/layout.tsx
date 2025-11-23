"use client"

import "./globals.css"
import { primaryFont, secondaryFont, headingFont } from "@/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "./components/Footer"
import { CategorySelectionProvider } from "@/hooks/CategorySelectionContext"
import Header from "@/components/header"
import PageTransition from "@/components/PageTransition"
import { TransitionProvider } from "@/components/TransitionProvider"
import Clarity from "@/components/Clarity"

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
        <Clarity />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TransitionProvider>
            <CategorySelectionProvider>
              <div className="min-h-dvh flex flex-col">
                <Header />
                <div className="flex-1 overflow-x-hidden">
                  <PageTransition className="flex-1">
                    {children}
                  </PageTransition>
                </div>
                <Footer />
              </div>
            </CategorySelectionProvider>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}