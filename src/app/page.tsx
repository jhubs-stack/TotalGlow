'use client'
import DailyCheckins from '@/components/DailyCheckins'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center">TotalGlow</h1>
        <p className="text-center mt-4 text-gray-600">Mind • Body • Soul</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Link href="/mind" className="bg-purple-100 p-6 rounded-lg text-center hover:bg-purple-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-purple-700">Mind</h2>
            <p className="text-6xl font-bold mt-4">78</p>
          </Link>
          
          <Link href="/body" className="bg-green-100 p-6 rounded-lg text-center hover:bg-green-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-green-700">Body</h2>
            <p className="text-6xl font-bold mt-4">85</p>
          </Link>
          
          <Link href="/soul" className="bg-amber-100 p-6 rounded-lg text-center hover:bg-amber-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-amber-700">Soul</h2>
            <p className="text-6xl font-bold mt-4">72</p>
          </Link>
        </div>

        <DailyCheckins />
      </main>
    </>
  )
}