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
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-xl font-light bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">TotalGlow</span>
              <div className="w-px h-6 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI</span>
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
        
        {/* Hero Section - Enhanced */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">💪</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Body Wellness</h1>
          <p className="text-gray-600">Strengthen your physical foundation</p>
        </div>

        {/* Enhanced Score Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-white/50">
          <div className="text-center">
            <p className="text-green-600 text-sm font-semibold mb-6 uppercase tracking-wide">Your Body Score</p>
            <div className="relative inline-flex items-center justify-center mb-6">
              <ProgressRing progress={bodyScore} color="#10b981" size={160} />
              <div className="absolute text-center">
                <div className="text-4xl font-bold text-green-600">{bodyScore}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {bodyScore >= 90 ? "Excellent" : bodyScore >= 80 ? "Great!" : bodyScore >= 70 ? "Good" : bodyScore >= 60 ? "Fair" : "Growing"}
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-green-700 text-sm font-medium">
                Your physical wellness is {bodyScore >= 80 ? "excellent" : bodyScore >= 70 ? "strong" : "developing"}! 
                Your body is your temple - keep nurturing it.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Today's Fitness Plan</h2>
          <div className="space-y-4">
            
            {/* Cardio Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🏃‍♂️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Cardio Boost</h3>
                    <p className="text-gray-600 text-sm">20-minute HIIT workout</p>
                  </div>
                </div>
                <div className="text-green-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Start Workout
              </button>
            </div>

            {/* Nutrition Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🥗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Nutrition Track</h3>
                    <p className="text-gray-600 text-sm">Log meals and water intake</p>
                  </div>
                </div>
                <div className="text-green-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Log Meal
              </button>
            </div>

            {/* Recovery Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 group active:scale-98 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🧘‍♀️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recovery Time</h3>
                    <p className="text-gray-600 text-sm">Gentle stretching routine</p>
                  </div>
                </div>
                <div className="text-green-400 text-2xl">→</div>
              </div>
              <button className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-medium active:scale-95 transition-transform">
                Start Stretching
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Activity Stats */}
        <div className="space-y-6">
          
          {/* Weekly Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">This Week's Activity</h3>
            <div className="space-y-4">
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

          {/* Fitness Goals */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Fitness Goals</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Goal</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-700" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Weekly Steps</span>
                  <span className="font-semibold text-blue-600">92%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection to Other Pillars */}
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Mind-Body-Soul Connection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🧠</span>
                  <span className="text-gray-700 text-sm">Physical activity improves mental clarity</span>
                </div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">✨</span>
                  <span className="text-gray-700 text-sm">Movement connects you to your inner strength</span>
                </div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
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