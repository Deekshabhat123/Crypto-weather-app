'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import '../globals.css'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dashboard-container">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="dashboard-content">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className={`main-content transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}