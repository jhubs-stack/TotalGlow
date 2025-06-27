'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function MindPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [mindScore] = useState(78)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 page-transition">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TotalGlow
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/mind" className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-1">Mind</Link>
                <Link href="/body" className="text-gray-600 hover:text-gray-800 transition-colors">Body</Link>
                <Link href="/soul" className="text-gray-600 hover:text-gray-800 transition-colors">Soul</Link>
              </div>
            </div>
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Mind Wellness</h1>
          <p className="text-xl text-gray-600">Cultivate mental clarity and emotional balance 🧠</p>
        </div>

        {/* Mind Score */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Mind Wellness Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={mindScore} color="#8b5cf6" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{mindScore}</div>
                <div className="text-xs text-gray-600 mt-1">Good Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Recommendations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Today's Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mindful Meditation</h3>
              <p className="text-gray-600 mb-4">Start your day with 10 minutes of focused breathing</p>
              <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                Begin Session
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gratitude Journal</h3>
              <p className="text-gray-600 mb-4">Write down 3 things you're grateful for today</p>
              <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                Start Writing
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mindset Reset</h3>
              <p className="text-gray-600 mb-4">5-minute positive affirmation practice</p>
              <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">This Week's Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Meditation Sessions</span>
                <span className="font-semibold text-purple-600">5/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stress Level (avg)</span>
                <span className="font-semibold text-green-600">Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Focus Sessions</span>
                <span className="font-semibold text-purple-600">12 completed</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Mood Trends</h3>
            <div className="flex items-center justify-center h-32">
              <div className="text-6xl">📈</div>
            </div>
            <p className="text-center text-gray-600">Your mood has been consistently positive this week!</p>
          </div>
        </div>
      </div>

      {/* AI Coach Modal */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}