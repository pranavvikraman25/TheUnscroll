import './globals.css'

export const metadata = {
  title: 'The Unscroll — 100 websites to cure your reel addiction',
  description: 'Discover mind-bending websites that pull you away from mindless scrolling. The Unscroll curates the best of the internet in one place.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}