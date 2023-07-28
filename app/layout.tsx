import type { Metadata } from 'next'
import './globals.css'
import AddTaskDialog from '@/components/AddTaskDialog'

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A kanban board using Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      <AddTaskDialog/> 
      </body>
    </html>
  )
}
