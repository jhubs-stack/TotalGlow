'use client'
import { useState, useEffect } from 'react'
import ProgressRing from '@/components/ProgressRing'
import CrossPillarInsights from '@/components/CrossPillarInsights'
import VoiceCheckin from '@/components/VoiceCheckin'
import Link from 'next/link'
import { calculateWellnessScore } from '@/utils/wellness'
import AICoach from '@/components/AICoach'

// Define types locally to avoid import issues
interface WellnessScores {
  mind: number
  body: number
  soul: number
}

interface WellnessState {
  mind: number
  body: number
  soul: number
  lastUpdated: Date
  recentActivities: string[]
  trends: {
    mind: number[]
    body: number[]
    soul: number[]
  }
}

interface VoiceAnalysis {
  mood?: string
  pillarUpdates?: Partial<WellnessScores>
}

export default function Home() {
  const [scores, setScores] = useState<WellnessScores>({ mind: 78, body: 85, soul: 72 })
  const [overallScore, setOverallScore] = useState(0)
  const [showAICoach, setShowAICoach] = useState(false)
  
  // Client-side mounted state for hydration fix
  const [mounted, setMounted] = useState(false)
  const [insightsReady, setInsightsReady] = useState(false)
  
  // Wellness state for interconnectivity tracking
  const [wellnessState, setWellnessState] = useState<WellnessState | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Initialize wellness state only on client
    const initialWellnessState: WellnessState = {
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
    
    const saved = localStorage.getItem('wellnessScores')
    if (saved) {
      try {
        const savedScores = JSON.parse(saved) as WellnessScores
        setScores(savedScores)
        
        setWellnessState({
          ...initialWellnessState,
          mind: savedScores.mind,
          body: savedScores.body,
          soul: savedScores.soul,
          lastUpdated: new Date()
        })
      } catch (error) {
        console.error('Error parsing saved scores:', error)
      }
    }
    
    setTimeout(() => setInsightsReady(true), 200)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wellnessScores', JSON.stringify(scores))
      setOverallScore(calculateWellnessScore(scores.mind, scores.body, scores.soul))
    }
  }, [scores, mounted])

  // Handle voice check-in results
  const handleVoiceCheckin = (analysis: VoiceAnalysis) => {
    if (!wellnessState) return

    const pillarUpdates = analysis.pillarUpdates || {}
    const newScores: WellnessScores = {
      mind: Math.max(0, Math.min(100, scores.mind + (pillarUpdates.mind || 0))),
      body: Math.max(0, Math.min(100, scores.body + (pillarUpdates.body || 0))),
      soul: Math.max(0, Math.min(100, scores.soul + (pillarUpdates.soul || 0)))
    }

    setScores(newScores)

    const newState: WellnessState = {
      ...wellnessState,
      mind: newScores.mind,
      body: newScores.body,
      soul: newScores.soul,
      lastUpdated: new Date(),
      recentActivities: [...wellnessState.recentActivities, `voice_checkin_${analysis.mood || 'neutral'}`]
    }
    setWellnessState(newState)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 overflow-visible">
              <span className="text-xl font-light bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic whitespace-nowrap">TotalGlow</span>
              <div className="w-px h-6 bg-gradient-to-b from-blue-600 to-purple-600 flex-shrink-0"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>
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
        {/* HERO SECTION: Voice-First Check-in */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">How are your mind, body & soul today?</h1>
          <p className="text-gray-600 mb-6">Share your wellness journey with voice or text</p>
          
          {/* Voice Check-in - Hero placement */}
          {mounted && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8">
              <VoiceCheckin onComplete={handleVoiceCheckin} isMinimized={true} />
            </div>
          )}
        </div>

        {/* ENHANCED THREE PILLARS - Only render when mounted */}
        {mounted && (
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Your Wellness Pillars</h2>
            
            {/* Mind Pillar */}
            <Link href="/mind" className="block group active:scale-98 transition-all">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 group-active:shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Mind</h3>
                      <p className="text-gray-600">Mental wellness & clarity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">{scores.mind}</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${scores.mind}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                    Connected to Body & Soul
                  </div>
                  <span className="text-purple-400 font-medium">→</span>
                </div>
              </div>
            </Link>

            {/* Body Pillar */}
            <Link href="/body" className="block group active:scale-98 transition-all">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 group-active:shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💪</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Body</h3>
                      <p className="text-gray-600">Physical health & energy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{scores.body}</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${scores.body}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                    Connected to Mind & Soul
                  </div>
                  <span className="text-green-400 font-medium">→</span>
                </div>
              </div>
            </Link>

            {/* Soul Pillar */}
            <Link href="/soul" className="block group active:scale-98 transition-all">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60 group-active:shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Soul</h3>
                      <p className="text-gray-600">Spiritual growth & peace</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600">{scores.soul}</div>
                    <div className="text-sm text-gray-500">/ 100</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${scores.soul}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Connected to Mind & Body
                  </div>
                  <span className="text-amber-400 font-medium">→</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* CROSS-PILLAR INSIGHTS - Prime placement after pillars */}
        {mounted && insightsReady && wellnessState && (
          <div className="mb-8">
            <CrossPillarInsights wellnessState={wellnessState} />
          </div>
        )}

        {/* COMPACT OVERALL SCORE - Summary format */}
        {mounted && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-lg border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Overall Wellness</h3>
                <p className="text-gray-600 flex items-center text-sm">
                  <span className="mr-2">7 day streak</span>
                  <span className="text-orange-500">🔥</span>
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {overallScore}
                  </div>
                  <div className="text-xs text-gray-500">/ 100</div>
                </div>
                <ProgressRing progress={overallScore} color="#8b5cf6" size={60} />
              </div>
            </div>
          </div>
        )}

        {/* Secondary Features - Minimized */}
        <div className="space-y-4">
          {/* Demo Buttons - Minimized but accessible */}
          {mounted && (
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 border border-white/30">
              <details className="group">
                <summary className="text-sm font-medium text-gray-600 cursor-pointer flex items-center justify-between">
                  <span>🧪 Try Pillar Connections</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between">
                    <span>🧘‍♀️ Complete Meditation</span>
                    <span className="text-xs">Mind → Body + Soul</span>
                  </button>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between">
                    <span>💪 Finish Workout</span>
                    <span className="text-xs">Body → Mind + Soul</span>
                  </button>
                  <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all flex items-center justify-between">
                    <span>🙏 Gratitude Practice</span>
                    <span className="text-xs">Soul → Mind</span>
                  </button>
                </div>
              </details>
            </div>
          )}
        </div>
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