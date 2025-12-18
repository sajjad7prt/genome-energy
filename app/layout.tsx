import './globals.css'

export const metadata = {
  title: 'Energy Genome',
  description: 'Human Energy Pattern Modeling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
