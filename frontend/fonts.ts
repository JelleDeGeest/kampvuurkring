import { NextFont } from 'next/dist/compiled/@next/font'
import localFont from 'next/font/local'

// Primary font for body text
export const primaryFont = localFont({
  src: [
    {
      path: './public/fonts/Aglet Slab Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/fonts/Aglet Slab Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-primary', // CSS variable name
  display: 'swap',
})

// Aglet Slab for headings
export const headingFont = localFont({
  src: [
    {
      path: './public/fonts/Aglet Slab Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './public/fonts/Aglet Slab Bold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './public/fonts/Aglet Slab Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/fonts/Aglet Slab Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
})

// Secondary font - using Aglet Slab Light for secondary elements
export const secondaryFont = localFont({
  src: './public/fonts/Aglet Slab Light.ttf',
  variable: '--font-secondary',
  display: 'swap',
}) 