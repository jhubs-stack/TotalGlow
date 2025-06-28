'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function BodyPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [bodyScore] = useState(85)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-teal-100">
      {/* Mobile Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-white/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TotalGlow
            </Link>
            <button 
              onClick={() => setShowAICoach(true)}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg active:scale-95 transition-all"
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Body Wellness</h1>
          <p className="text-lg text-gray-600">Strengthen your physical foundation 💪</p>
        </div>

        {/* Body Score Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-gray-600 text-xs uppercase tracking-wide mb-4 font-medium">Body Wellness Score</p>
            <div className="relative inline-flex items-center justify-center mb-4">
              <ProgressRing progress={bodyScore} color="#10b981" size={140} />
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-gray-800">{bodyScore}</div>
                <div className="text-xs text-gray-600 mt-1 leading-tight max-w-16 text-center">
                  {bodyScore >= 90 ? "Excellent" : bodyScore >= 80 ? "Great!" : bodyScore >= 70 ? "Good" : bodyScore >= 60 ? "Fair" : "Growing"}
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
                <span className="text-2xl">🏃‍♂️</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Cardio Boost</h3>
                  <p className="text-sm text-gray-600">20-minute HIIT workout</p>
                </div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Start Workout
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🥗</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Nutrition Track</h3>
                  <p className="text-sm text-gray-600">Log meals and water intake</p>
                </div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Log Meal
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🧘‍♀️</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Recovery Time</h3>
                  <p className="text-sm text-gray-600">Gentle stretching routine</p>
                </div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg font-medium active:scale-95 transition-transform">
                Start Stretching
              </button>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">This Week's Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Workouts Completed</span>
                <span className="font-medium text-green-600">6/7 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Steps (daily avg)</span>
                <span className="font-medium text-green-600">8,245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Minutes</span>
                <span className="font-medium text-green-600">420 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Water Intake</span>
                <span className="font-medium text-green-600">2.1L avg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Net Calories Burned</span>
                <span className="font-medium text-green-600">7,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50">
            <h3 className="font-semibold text-gray-800 mb-4">Fitness Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Monthly Goal</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Weekly Steps</span>
                  <span className="font-medium text-blue-600">92%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
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
            <span className="text-xs text-green-600 font-medium">Body</span>
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