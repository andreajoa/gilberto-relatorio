import './globals.css'
import './motion-fix.css'

export const metadata = {
  title: 'Relatório de Vendas e Payouts',
  description: 'Relatório consolidado e separado por conta: Amazon KDP Kelly Marques, Amazon KDP Gilberto De Souza e Barnes & Noble Press Kelly Marques.',
  robots: { index: false, follow: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#182734',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
