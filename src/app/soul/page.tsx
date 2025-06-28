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
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TotalGlow
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
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Soul Wellness</h1>
          <p className="text-lg text-gray-600">Cultivate inner peace and connection ✨</p>
        </div>

        {/* Soul Score Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-xs uppercase tracking-wide mb-4 font-medium">Soul Wellness Score</p>
            <div className="relative inline-flex items-center justify-center mb-4">
              <ProgressRing progress={soulScore} color="#f59e0b" size={140} />
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{soulScore}</div>
                <div className="text-xs text-gray-600 mt-1 leading-tight max-w-16 text-center">
                  {soulScore >= 90 ? "Excellent" : soulScore >= 80 ? "Great!" : soulScore >= 70 ? "Good" : soulScore >= 60 ? "Fair" : "Growing"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Recommendations</h2>
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🙏</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Gratitude Practice</h3>
                  <p className="text-sm text-gray-600">List 5 blessings and reflect</p>
                </div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Begin Practice
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💖</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Compassion Med</h3>
                  <p className="text-sm text-gray-600">Send loving energy to others</p>
                </div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Start Session
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Nature Connect</h3>
                  <p className="text-sm text-gray-600">15 minutes grounding outdoors</p>
                </div>
              </div>
              <button className="w-full bg-amber-100 text-amber-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">Spiritual Journey</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gratitude Sessions</span>
                <span className="font-medium text-amber-600">4/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meditation Minutes</span>
                <span className="font-medium text-amber-600">180 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Acts of Kindness</span>
                <span className="font-medium text-pink-600">8 this week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nature Time</span>
                <span className="font-medium text-green-600">45 min avg</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">Inner Growth</h3>
            <div className="text-center py-4">
              <div className="text-4xl mb-3">🌟</div>
              <p className="text-sm text-gray-600 mb-3 italic leading-relaxed">
                "Today I am grateful for the journey of growth and the peace I'm cultivating within myself."
              </p>
              <p className="text-xs text-gray-500">- Your reflection from yesterday</p>
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