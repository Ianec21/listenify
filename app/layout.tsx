import Menu from '@/components/menu'
import './globals.css'
import { Inter } from 'next/font/google'
import Audio from '@/components/ui/audio'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Listenify',
  description: 'Free music player, created by Ianec',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-[100vh] flex flex-row">
          <Menu/>
          {children}
          <Audio/>
        </div>
      </body>
    </html>
  )
}
