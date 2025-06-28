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
      {/* Mobile Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TotalGlow
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
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Mind Wellness</h1>
          <p className="text-lg text-gray-600">Cultivate mental clarity and balance 🧠</p>
        </div>

        {/* Mind Score Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-xs uppercase tracking-wide mb-4 font-medium">Mind Wellness Score</p>
            <div className="relative inline-flex items-center justify-center mb-4">
              <ProgressRing progress={mindScore} color="#8b5cf6" size={140} />
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{mindScore}</div>
                <div className="text-xs text-gray-600 mt-1 leading-tight max-w-16 text-center">
                  {mindScore >= 90 ? "Excellent" : mindScore >= 80 ? "Great!" : mindScore >= 70 ? "Good" : mindScore >= 60 ? "Fair" : "Growing"}
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
                <span className="text-2xl">🧘‍♀️</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Mindful Meditation</h3>
                  <p className="text-sm text-gray-600">10 minutes of focused breathing</p>
                </div>
              </div>
              <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Begin Session
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Gratitude Journal</h3>
                  <p className="text-sm text-gray-600">Write 3 things you're grateful for</p>
                </div>
              </div>
              <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Start Writing
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Mindset Reset</h3>
                  <p className="text-sm text-gray-600">5-minute positive affirmations</p>
                </div>
              </div>
              <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">This Week's Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meditation Sessions</span>
                <span className="font-medium text-purple-600">5/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stress Level (avg)</span>
                <span className="font-medium text-green-600">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Focus Sessions</span>
                <span className="font-medium text-purple-600">12 completed</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">Mood Trends</h3>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-sm text-gray-600">Your mood has been consistently positive this week!</p>
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