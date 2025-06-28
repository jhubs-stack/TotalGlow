'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function SoulPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [soulScore] = useState(72)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100">
      {/* Mobile Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3 overflow-visible">
          <div className="flex items-center justify-between overflow-visible">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
              TotalGlow.AI
            </Link>
            <button 
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg active:scale-95 transition-all"
            >
              <span>AI Coach</span>
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Hero Section - Enhanced */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Soul Wellness</h1>
          <p className="text-gray-600">Cultivate inner peace and connection</p>
        </div>

        {/* Enhanced Score Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-amber-600 text-sm font-semibold mb-6 uppercase tracking-wide">Your Soul Score</p>
            <div className="relative inline-flex items-center justify-center mb-6">
              <ProgressRing progress={soulScore} color="#f59e0b" size={160} />
              <div className="absolute text-center">
                <div className="text-4xl font-bold text-amber-600">{soulScore}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {soulScore >= 90 ? "Excellent" : soulScore >= 80 ? "Great!" : soulScore >= 70 ? "Good" : soulScore >= 60 ? "Fair" : "Growing"}
                </div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-amber-700 text-sm font-medium">
                Your spiritual wellness is {soulScore >= 80 ? "flourishing" : soulScore >= 70 ? "growing beautifully" : "developing"}! 
                Continue nurturing your inner light.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Spiritual Practices</h2>
          <div className="space-y-4">
            
            {/* Gratitude Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🙏</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Gratitude Practice</h3>
                    <p className="text-gray-600 text-sm">List 5 blessings and reflect</p>
                  </div>
                </div>
                <div className="text-amber-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Begin Practice
              </button>
            </div>

            {/* Compassion Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">💖</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Compassion Med</h3>
                    <p className="text-gray-600 text-sm">Send loving energy to others</p>
                  </div>
                </div>
                <div className="text-amber-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Start Session
              </button>
            </div>

            {/* Nature Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Nature Connect</h3>
                    <p className="text-gray-600 text-sm">15 minutes grounding outdoors</p>
                  </div>
                </div>
                <div className="text-amber-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Spiritual Journey */}
        <div className="space-y-6">
          
          {/* Spiritual Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Spiritual Journey</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">4/7</div>
                <div className="text-sm text-gray-600">Gratitude<br/>Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">180</div>
                <div className="text-sm text-gray-600">Meditation<br/>Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">8</div>
                <div className="text-sm text-gray-600">Acts of<br/>Kindness</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">45</div>
                <div className="text-sm text-gray-600">Nature Time<br/>(min avg)</div>
              </div>
            </div>
          </div>

          {/* Inner Growth Reflection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Inner Growth</h3>
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🌟</div>
              <p className="text-gray-600 leading-relaxed italic mb-4">
                "Today I am grateful for the journey of growth and the peace I'm cultivating within myself."
              </p>
              <p className="text-xs text-gray-500">- Your reflection from yesterday</p>
            </div>
          </div>

          {/* Connection to Other Pillars */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Mind-Body-Soul Connection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🧠</span>
                  <span className="text-gray-700 text-sm">Spiritual practice calms the mind</span>
                </div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💪</span>
                  <span className="text-gray-700 text-sm">Inner peace supports physical healing</span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 py-2">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs text-gray-600">Home</span>
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
            <span className="text-xs text-amber-600 font-medium">Soul</span>
          </Link>
        </div>
      </nav>

      {/* AI Coach Modal */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}