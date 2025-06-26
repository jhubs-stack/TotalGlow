'use client'
import { useState, useEffect } from 'react'
import DailyCheckins from '@/components/DailyCheckins'
import Navigation from '@/components/Navigation'
import AICoach from '@/components/AICoach'
import Link from 'next/link'
import { calculateWellnessScore, getScoreColor, getScoreMessage } from '@/utils/wellness'

export default function Home() {
  const [scores, setScores] = useState({ mind: 78, body: 85, soul: 72 })
  const [overallScore, setOverallScore] = useState(0)

  // Load scores on mount
  useEffect(() => {
    const saved = localStorage.getItem('wellnessScores')
    if (saved) {
      setScores(JSON.parse(saved))
    }
  }, [])

  // Save scores when they change
  useEffect(() => {
    localStorage.setItem('wellnessScores', JSON.stringify(scores))
    setOverallScore(calculateWellnessScore(scores.mind, scores.body, scores.soul))
  }, [scores])

  return (
    <>
      <Navigation />
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center">TotalGlow</h1>
        <p className="text-center mt-4 text-gray-600">Mind • Body • Soul</p>
        
        <div className="text-center mt-6">
          <p className="text-lg text-gray-600">Overall Wellness Score</p>
          <p className={`text-6xl font-bold mt-2 ${getScoreColor(overallScore)}`}>
            {overallScore}
          </p>
          <p className="text-gray-600 mt-2">{getScoreMessage(overallScore)}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Link href="/mind" className="bg-purple-100 p-6 rounded-lg text-center hover:bg-purple-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-purple-700">Mind</h2>
            <p className="text-6xl font-bold mt-4">{scores.mind}</p>
          </Link>
          
          <Link href="/body" className="bg-green-100 p-6 rounded-lg text-center hover:bg-green-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-green-700">Body</h2>
            <p className="text-6xl font-bold mt-4">{scores.body}</p>
          </Link>
          
          <Link href="/soul" className="bg-amber-100 p-6 rounded-lg text-center hover:bg-amber-200 transition-colors block">
            <h2 className="text-2xl font-semibold text-amber-700">Soul</h2>
            <p className="text-6xl font-bold mt-4">{scores.soul}</p>
          </Link>
        </div>

        <DailyCheckins />
        <AICoach />
      </main>
    </>
  )
}