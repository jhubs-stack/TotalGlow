'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function BodyPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, text: '30 minutes of exercise', completed: false },
    { id: 2, text: 'Drink 8 glasses of water', completed: false },
    { id: 3, text: 'Healthy breakfast', completed: false }
  ])
  const [score, setScore] = useState(82)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleTaskToggle = (taskId: number) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      
      // Calculate new score based on completed tasks
      const completedCount = updated.filter(t => t.completed).length
      const newScore = 74 + (completedCount * 10)
      setScore(newScore)
      
      // Show celebration if all tasks completed
      if (completedCount === tasks.length) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
      
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-teal-100 page-transition">
      {/* AI Coach Component */}
      {showAICoach && <AICoach onClose={() => setShowAICoach(false)} />}

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TotalGlow
            </Link>
            <div className="flex space-x-8 items-center">
              <Link href="/mind" className="text-gray-700 hover:text-green-600 transition-colors">Mind</Link>
              <Link href="/body" className="text-green-600 font-medium border-b-2 border-green-600">Body</Link>
              <Link href="/soul" className="text-gray-700 hover:text-green-600 transition-colors">Soul</Link>
              <button
                onClick={() => setShowAICoach(true)}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <span>AI Coach</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Body Wellness
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">Strengthen your physical health and vitality</p>

        {/* Recommended Actions - Moved to Top */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 fade-in-delayed mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Today&apos;s Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => alert('Starting HIIT workout timer...')}
              className="p-4 bg-green-100 rounded-xl hover:bg-green-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">💪</span>
              <h4 className="font-semibold text-green-700">HIIT Workout</h4>
              <p className="text-sm text-gray-600 mt-1">20-min session</p>
            </button>
            <button 
              onClick={() => alert('Opening healthy recipes...')}
              className="p-4 bg-green-100 rounded-xl hover:bg-green-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🥗</span>
              <h4 className="font-semibold text-green-700">Meal Prep</h4>
              <p className="text-sm text-gray-600 mt-1">Healthy recipes</p>
            </button>
            <button 
              onClick={() => alert('Starting stretching routine...')}
              className="p-4 bg-green-100 rounded-xl hover:bg-green-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🧘</span>
              <h4 className="font-semibold text-green-700">Stretch Session</h4>
              <p className="text-sm text-gray-600 mt-1">10-min flexibility</p>
            </button>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50 fade-in-delayed">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Body Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={score} color="#10b981" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{score}</div>
                <div className="text-xs text-gray-600">{score >= 100 ? 'Amazing!' : 'Stay strong!'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Today&apos;s Goals</h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <label key={task.id} className="flex items-center p-3 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                    className="w-5 h-5 text-green-600 rounded" 
                  />
                  <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
            {showCelebration && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-center animate-pulse">
                🎉 All goals achieved! Fantastic work!
              </div>
            )}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Weekly Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Steps Average</span>
                  <span className="font-semibold">8,500/day</span>
                </div>
                <div className="bg-green-100 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Sleep Quality</span>
                  <span className="font-semibold">7.5 hrs</span>
                </div>
                <div className="bg-green-100 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Health Insights</h3>
            <p className="text-gray-600 mb-3">Your energy levels are up 20% from last week!</p>
            <p className="text-sm text-green-600">Great hydration habits 💧</p>
          </div>
        </div>
      </div>
    </div>
  )
}