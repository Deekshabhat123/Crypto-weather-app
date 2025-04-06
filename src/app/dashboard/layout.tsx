import type { Metadata } from 'next'
import ClientLayout from './client-layout'

export const metadata: Metadata = {
  title: 'Dashboard | CryptoWeather Nexus',
  description: 'Real-time Crypto & Weather Updates',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}