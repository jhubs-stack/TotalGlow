'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function MindPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [mindScore] = useState(78)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Header - consistent with main page */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-light bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">TotalGlow</span>
              <div className="w-px h-6 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>
            </Link>
            <button 
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg active:scale-95 transition-all"
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
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mind Wellness</h1>
          <p className="text-gray-600">Cultivate mental clarity and balance</p>
        </div>

        {/* Enhanced Score Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-purple-100">
          <div className="text-center">
            <p className="text-purple-600 text-sm font-semibold mb-6 uppercase tracking-wide">Your Mind Score</p>
            <div className="relative inline-flex items-center justify-center mb-6">
              <ProgressRing progress={mindScore} color="#8b5cf6" size={160} strokeWidth={8} />
              <div className="absolute text-center">
                <div className="text-4xl font-bold text-purple-600">{mindScore}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {mindScore >= 90 ? "Excellent" : mindScore >= 80 ? "Great!" : mindScore >= 70 ? "Good" : mindScore >= 60 ? "Fair" : "Growing"}
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-purple-700 text-sm font-medium">
                Your mental wellness is {mindScore >= 80 ? "thriving" : mindScore >= 70 ? "strong" : "developing"}! 
                Keep nurturing your mind with daily practices.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Recommended for You</h2>
          <div className="space-y-4">
            
            {/* Meditation Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🧘‍♀️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Mindful Meditation</h3>
                    <p className="text-gray-600 text-sm">10 minutes of focused breathing</p>
                  </div>
                </div>
                <div className="text-purple-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
                Begin Session
              </button>
            </div>

            {/* Gratitude Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Gratitude Journal</h3>
                    <p className="text-gray-600 text-sm">Write 3 things you're grateful for</p>
                  </div>
                </div>
                <div className="text-pink-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
                Start Writing
              </button>
            </div>

            {/* Mindset Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Mindset Reset</h3>
                    <p className="text-gray-600 text-sm">5-minute positive affirmations</p>
                  </div>
                </div>
                <div className="text-blue-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <div className="space-y-6">
          
          {/* Weekly Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">This Week's Journey</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">5/7</div>
                <div className="text-sm text-gray-600">Meditation<br/>Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">Low</div>
                <div className="text-sm text-gray-600">Stress Level<br/>(average)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
                <div className="text-sm text-gray-600">Focus<br/>Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                <div className="text-sm text-gray-600">Mindfulness<br/>Goal</div>
              </div>
            </div>
          </div>

          {/* Mood Trends */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Mood Insights</h3>
            <div className="text-center py-6">
              <div className="text-5xl mb-4">📈</div>
              <p className="text-gray-600 leading-relaxed">
                Your mood has been consistently positive this week! Keep nurturing your mental wellness.
              </p>
            </div>
          </div>

          {/* Connection to Other Pillars */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Mind-Body-Soul Connection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💪</span>
                  <span className="text-gray-700 text-sm">Exercise boosts mental clarity</span>
                </div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">✨</span>
                  <span className="text-gray-700 text-sm">Meditation enhances spiritual awareness</span>
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
            <span className="text-xs text-purple-600 font-medium">Mind</span>
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