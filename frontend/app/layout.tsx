import type React from "react"
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Scouts Sint-Johannes",
  description:
    "Bouw karakter, leer vaardigheden en creëer levenslange herinneringen door buitenavonturen en gemeenschapsdienst.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body style={
        {
          "--text-color": "#070807",
          "--background-color": "#f7f8f6",
          "--primary-color": "#527b3d",
          "--secondary-color": "#b2d2a2",
          "--accent-color": "#98cd7e",
        } as React.CSSProperties
      }>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'