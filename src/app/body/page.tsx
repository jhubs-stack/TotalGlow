'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function BodyPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [bodyScore] = useState(85)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-teal-100 page-transition">
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
                <Link href="/body" className="text-green-600 font-semibold border-b-2 border-green-600 pb-1">Body</Link>
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
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Body Wellness</h1>
          <p className="text-xl text-gray-600">Strengthen your physical foundation and vitality 💪</p>
        </div>

        {/* Body Score */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Body Wellness Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={bodyScore} color="#10b981" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{bodyScore}</div>
                <div className="text-xs text-gray-600 mt-1">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Recommendations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Today's Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardio Boost</h3>
              <p className="text-gray-600 mb-4">20-minute high-intensity interval training</p>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                Start Workout
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Track</h3>
              <p className="text-gray-600 mb-4">Log your meals and water intake</p>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                Log Meal
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl mb-4">🧘‍♀️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Recovery Time</h3>
              <p className="text-gray-600 mb-4">Gentle stretching and flexibility routine</p>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                Start Stretching
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">This Week's Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Workouts Completed</span>
                <span className="font-semibold text-green-600">6/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Steps (daily avg)</span>
                <span className="font-semibold text-green-600">8,245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Minutes</span>
                <span className="font-semibold text-green-600">420 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Water Intake</span>
                <span className="font-semibold text-blue-600">2.1L avg</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Fitness Goals</h3>
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '85%'}}></div>
              </div>
              <p className="text-sm text-gray-600">Monthly Goal: 85% complete</p>
              
              <div className="bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{width: '92%'}}></div>
              </div>
              <p className="text-sm text-gray-600">Weekly Steps: 92% complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Coach Modal */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}
    </div>
  )
}