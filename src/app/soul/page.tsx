'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function SoulPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [soulScore] = useState(72)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 page-transition">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TotalGlow
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/mind" className="text-gray-600 hover:text-gray-800 transition-colors">Mind</Link>
                <Link href="/body" className="text-gray-600 hover:text-gray-800 transition-colors">Body</Link>
                <Link href="/soul" className="text-amber-600 font-semibold border-b-2 border-amber-600 pb-1">Soul</Link>
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
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Soul Wellness</h1>
          <p className="text-xl text-gray-600">Cultivate inner peace and spiritual connection ✨</p>
        </div>

        {/* Soul Score */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Soul Wellness Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={soulScore} color="#f59e0b" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{soulScore}</div>
                <div className="text-xs text-gray-600 mt-1">Growing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Recommendations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Today's Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Gratitude Practice</h3>
              <p className="text-gray-600 mb-4">List 5 blessings and reflect on their meaning</p>
              <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
                Begin Practice
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">💖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Compassion Med</h3>
              <p className="text-gray-600 mb-4">Send loving energy to yourself and others</p>
              <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
                Start Session
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nature Connect</h3>
              <p className="text-gray-600 mb-4">Ground yourself with 15 minutes outdoors</p>
              <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Spiritual Journey</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gratitude Sessions</span>
                <span className="font-semibold text-amber-600">4/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Meditation Minutes</span>
                <span className="font-semibold text-amber-600">180 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Acts of Kindness</span>
                <span className="font-semibold text-pink-600">8 this week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nature Time</span>
                <span className="font-semibold text-green-600">45 min avg</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Inner Growth</h3>
            <div className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-gray-600 mb-4">
                "Today I am grateful for the journey of growth and the peace I'm cultivating within myself."
              </p>
              <p className="text-sm text-gray-500 italic">- Your reflection from yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Coach Modal */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}