import "../(my-app)/globals.css"
import { primaryFont, secondaryFont, headingFont } from "@/fonts"
import { ThemeProvider } from "@/components/theme-provider"

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning className={`${primaryFont.variable} ${secondaryFont.variable} ${headingFont.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
