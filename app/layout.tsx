import './globals.css'

export const metadata = {
  title: 'TabBreaker — 100 websites to break your reel addiction',
  description: 'Discover mind-bending websites curated to pull you away from reels.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}