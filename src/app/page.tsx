'use client'
import { useState } from 'react'
import DailyCheckins from '@/components/DailyCheckins'

export default function Home() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null)

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center">TotalGlow</h1>
      <p className="text-center mt-4 text-gray-600">Mind • Body • Soul</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <button 
          onClick={() => setSelectedPillar('mind')}
          className="bg-purple-100 p-6 rounded-lg text-center hover:bg-purple-200 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-purple-700">Mind</h2>
          <p className="text-6xl font-bold mt-4">78</p>
        </button>
        
        <button 
          onClick={() => setSelectedPillar('body')}
          className="bg-green-100 p-6 rounded-lg text-center hover:bg-green-200 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-green-700">Body</h2>
          <p className="text-6xl font-bold mt-4">85</p>
        </button>
        
        <button 
          onClick={() => setSelectedPillar('soul')}
          className="bg-amber-100 p-6 rounded-lg text-center hover:bg-amber-200 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-amber-700">Soul</h2>
          <p className="text-6xl font-bold mt-4">72</p>
        </button>
      </div>

      <DailyCheckins />
    </main>
  )
}