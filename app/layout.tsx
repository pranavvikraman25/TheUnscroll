import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Unscroll — Cure your endless scrolling',
  description: 'Discover 150+ mind-bending websites curated to pull you away from mindless scrolling. The Unscroll is the best of the internet in one place.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%230f1117"/><path d="M9 7 L9 19 Q9 25 16 25 Q23 25 23 19 L23 9" stroke="%232d8a4e" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M16 25 Q23 25 23 19 L23 9" stroke="%23c8970a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M23 9 Q23 5 26 6 Q28.5 7.5 26.5 10" stroke="%23c8970a" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',
        type: 'image/svg+xml',
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}