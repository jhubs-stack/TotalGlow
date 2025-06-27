'use client'
import { useState, useEffect } from 'react'
import DailyCheckins from '@/components/DailyCheckins'
import ProgressRing from '@/components/ProgressRing'
import Link from 'next/link'
import { calculateWellnessScore, getScoreMessage } from '@/utils/wellness'
import AICoach from '@/components/AICoach'

export default function Home() {
  const [scores, setScores] = useState({ mind: 78, body: 85, soul: 72 })
  const [overallScore, setOverallScore] = useState(0)
  const [showAICoach, setShowAICoach] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('wellnessScores')
    if (saved) {
      setScores(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wellnessScores', JSON.stringify(scores))
    setOverallScore(calculateWellnessScore(scores.mind, scores.body, scores.soul))
  }, [scores])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TotalGlow
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/mind" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Mind</Link>
            <Link href="/body" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Body</Link>
            <Link href="/soul" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Soul</Link>
            <button 
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span>AI Coach</span>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome back!</h1>
          <p className="text-xl text-gray-600">Your wellness journey continues to shine ✨</p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Overall Wellness</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={overallScore} color="#8b5cf6" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{overallScore}</div>
                <div className="text-[10px] text-gray-600 mt-0.5 leading-tight">{getScoreMessage(overallScore)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/mind" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-white/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Mind</h3>
                  <p className="text-gray-600 text-sm mt-1">Mental wellness</p>
                </div>
                <span className="text-4xl">🧠</span>
              </div>
              <div className="flex justify-center mb-6">
                <ProgressRing progress={scores.mind} color="#8b5cf6" />
              </div>
              <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-xl hover:bg-purple-200 transition-colors font-semibold">
                Continue Journey →
              </button>
            </div>
          </Link>

          <Link href="/body" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-white/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Body</h3>
                  <p className="text-gray-600 text-sm mt-1">Physical health</p>
                </div>
                <span className="text-4xl">💪</span>
              </div>
              <div className="flex justify-center mb-6">
                <ProgressRing progress={scores.body} color="#10b981" />
              </div>
              <button className="w-full bg-green-100 text-green-700 py-3 rounded-xl hover:bg-green-200 transition-colors font-semibold">
                Continue Journey →
              </button>
            </div>
          </Link>

          <Link href="/soul" className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-white/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Soul</h3>
                  <p className="text-gray-600 text-sm mt-1">Spiritual wellness</p>
                </div>
                <span className="text-4xl">✨</span>
              </div>
              <div className="flex justify-center mb-6">
                <ProgressRing progress={scores.soul} color="#f59e0b" />
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-3 rounded-xl hover:bg-amber-200 transition-colors font-semibold">
                Continue Journey →
              </button>
            </div>
          </Link>
        </div>

        {/* Streak and Daily Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 text-white h-full shadow-xl">
              <h3 className="text-xl font-bold mb-4">Current Streak</h3>
              <div className="text-6xl font-bold mb-2">7 🔥</div>
              <p className="text-white/80 mb-6">Keep it up! Your longest: 14 days</p>
              <div>
                <div className="text-sm uppercase tracking-wide mb-3 text-white/80">This Week</div>
                <div className="grid grid-cols-7 gap-2">
                  {[1,2,3,4,5,6,7].map((day) => (
                    <div key={day} className="bg-white/20 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center text-lg font-semibold">
                      ✓
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <DailyCheckins />
          </div>
        </div>
      </main>

      {/* AI Coach Modal - Simple conditional rendering */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}