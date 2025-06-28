'use client'
import { useState, useEffect } from 'react'
import DailyCheckins from '@/components/DailyCheckins'
import ProgressRing from '@/components/ProgressRing'
import CrossPillarInsights from '@/components/CrossPillarInsights'
import Link from 'next/link'
import { calculateWellnessScore, getScoreMessage } from '@/utils/wellness'
import { 
  calculatePillarImpacts, 
  applyPillarImpacts,
  WellnessState 
} from '@/utils/pillarConnections'
import AICoach from '@/components/AICoach'

export default function Home() {
  // Standardized default scores for consistent demo experience
  const [scores, setScores] = useState({ mind: 78, body: 85, soul: 72 })
  const [overallScore, setOverallScore] = useState(0)
  const [showAICoach, setShowAICoach] = useState(false)
  
  // Client-side mounted state for hydration fix
  const [mounted, setMounted] = useState(false)
  const [insightsReady, setInsightsReady] = useState(false)
  
  // Wellness state for interconnectivity tracking - Initialize without Date
  const [wellnessState, setWellnessState] = useState<WellnessState | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Initialize wellness state only on client
    const initialWellnessState = {
      mind: 78,
      body: 85,
      soul: 72,
      lastUpdated: new Date(),
      recentActivities: [],
      trends: {
        mind: [75, 76, 78],
        body: [82, 84, 85],
        soul: [70, 71, 72]
      }
    }
    
    setWellnessState(initialWellnessState)
    
    // Check for saved scores and update if needed
    const saved = localStorage.getItem('wellnessScores')
    if (saved) {
      const savedScores = JSON.parse(saved)
      setScores(savedScores)
      
      // Update wellness state with saved scores
      setWellnessState({
        ...initialWellnessState,
        mind: savedScores.mind,
        body: savedScores.body,
        soul: savedScores.soul,
        lastUpdated: new Date()
      })
    }
    
    // Small delay to ensure everything is hydrated
    setTimeout(() => setInsightsReady(true), 200)
  }, [])

  // Remove the problematic useEffect that was causing infinite loops
  // localStorage handling is now done in the first useEffect

  useEffect(() => {
    localStorage.setItem('wellnessScores', JSON.stringify(scores))
    setOverallScore(calculateWellnessScore(scores.mind, scores.body, scores.soul))
  }, [scores])

  // Function to simulate pillar activities and their interconnected effects
  const simulateActivity = (activity: string, pillar: 'mind' | 'body' | 'soul') => {
    if (!wellnessState) return
    
    const impacts = calculatePillarImpacts(wellnessState, activity, pillar)
    const newState = applyPillarImpacts(wellnessState, impacts)
    
    // Update wellness state
    setWellnessState(newState)
    
    // Update individual scores for UI
    setScores({
      mind: newState.mind,
      body: newState.body,
      soul: newState.soul
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Mobile Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TotalGlow
            </Link>
            <button 
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg active:scale-95 transition-all"
            >
              <span>AI Coach</span>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-lg text-gray-600">Your wellness journey continues ✨</p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-xs uppercase tracking-wide mb-4 font-medium">Overall Wellness</p>
            <div className="relative inline-flex items-center justify-center mb-4">
              <ProgressRing progress={overallScore} color="#8b5cf6" size={140} />
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{overallScore}</div>
                <div className="text-xs text-gray-600 mt-1 leading-tight max-w-16 text-center">
                  {overallScore >= 90 ? "Excellent" : overallScore >= 80 ? "Great!" : overallScore >= 70 ? "Good" : overallScore >= 60 ? "Fair" : "Growing"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div className="space-y-4 mb-8">
          <Link href="/mind" className="block group active:scale-98 transition-transform">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 group-active:bg-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Mind</h3>
                    <p className="text-sm text-gray-600">Mental Health</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressRing progress={scores.mind} color="#8b5cf6" size={50} />
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/body" className="block group active:scale-98 transition-transform">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 group-active:bg-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💪</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Body</h3>
                    <p className="text-sm text-gray-600">Physical Health</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressRing progress={scores.body} color="#10b981" size={50} />
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/soul" className="block group active:scale-98 transition-transform">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 group-active:bg-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Soul</h3>
                    <p className="text-sm text-gray-600">Spiritual Health</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressRing progress={scores.soul} color="#f59e0b" size={50} />
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Cross-Pillar Insights - The Key Differentiator - Cleaner with max 2 insights */}
        {mounted && insightsReady && wellnessState && (
          <div className="mb-8">
            <CrossPillarInsights wellnessState={wellnessState} />
          </div>
        )}

        {/* Test Pillar Connections - Demo Buttons */}
        {mounted && (
          <div className="mb-6 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Experience Pillar Connections:</h3>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => simulateActivity('meditation_completed', 'mind')}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between"
              >
                <span>🧘‍♀️ Complete Meditation</span>
                <span className="text-xs">Mind → Body + Soul</span>
              </button>
              <button 
                onClick={() => simulateActivity('workout_completed', 'body')}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between"
              >
                <span>💪 Finish Workout</span>
                <span className="text-xs">Body → Mind + Soul</span>
              </button>
              <button 
                onClick={() => simulateActivity('gratitude_practice', 'soul')}
                className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between"
              >
                <span>🙏 Gratitude Practice</span>
                <span className="text-xs">Soul → Mind</span>
              </button>
            </div>
          </div>
        )}

        {/* Current Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Current Streak</h3>
              <div className="text-3xl font-bold">7 🔥</div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Longest: 14 days</p>
              <p className="text-white/80 text-sm">Keep it up!</p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[1,2,3,4,5,6,7].map((day) => (
              <div key={day} className="bg-white/20 backdrop-blur-sm aspect-square rounded-lg flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
            ))}
          </div>
        </div>

        {/* Daily Check-ins */}
        <DailyCheckins />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs text-blue-600 font-medium">Home</span>
          </Link>
          <Link href="/mind" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl mb-1">🧠</span>
            <span className="text-xs text-gray-600">Mind</span>
          </Link>
          <Link href="/body" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl mb-1">💪</span>
            <span className="text-xs text-gray-600">Body</span>
          </Link>
          <Link href="/soul" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl mb-1">✨</span>
            <span className="text-xs text-gray-600">Soul</span>
          </Link>
        </div>
      </nav>

      {/* AI Coach Modal */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}