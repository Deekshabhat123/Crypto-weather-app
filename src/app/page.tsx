import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to CryptoWeather Nexus
      </h1>
      <p className="text-lg text-gray-400 text-center">
        Stay updated with the latest Crypto prices & Weather forecasts.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  )
}
