'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function SoulPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Practice gratitude', completed: false },
    { id: 2, text: 'Connect with loved ones', completed: false },
    { id: 3, text: 'Spend time in nature', completed: false }
  ])
  const [score, setScore] = useState(75)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleTaskToggle = (taskId: number) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      
      // Calculate new score based on completed tasks
      const completedCount = updated.filter(t => t.completed).length
      const newScore = 67 + (completedCount * 11)
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
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 page-transition">
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
              <Link href="/mind" className="text-gray-700 hover:text-amber-600 transition-colors">Mind</Link>
              <Link href="/body" className="text-gray-700 hover:text-amber-600 transition-colors">Body</Link>
              <Link href="/soul" className="text-amber-600 font-medium border-b-2 border-amber-600">Soul</Link>
              <button
                onClick={() => setShowAICoach(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <span>AI Coach</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Soul Wellness
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">Cultivate inner peace and spiritual connection</p>

        {/* Recommended Actions - Moved to Top */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 fade-in-delayed mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Today&apos;s Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => alert('Opening gratitude journal...')}
              className="p-4 bg-amber-100 rounded-xl hover:bg-amber-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🙏</span>
              <h4 className="font-semibold text-amber-700">Gratitude Practice</h4>
              <p className="text-sm text-gray-600 mt-1">List 5 blessings</p>
            </button>
            <button 
              onClick={() => alert('Starting loving-kindness meditation...')}
              className="p-4 bg-amber-100 rounded-xl hover:bg-amber-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">💖</span>
              <h4 className="font-semibold text-amber-700">Compassion Med</h4>
              <p className="text-sm text-gray-600 mt-1">Send loving energy</p>
            </button>
            <button 
              onClick={() => alert('Opening nature sounds...')}
              className="p-4 bg-amber-100 rounded-xl hover:bg-amber-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🌿</span>
              <h4 className="font-semibold text-amber-700">Nature Connect</h4>
              <p className="text-sm text-gray-600 mt-1">Ground yourself</p>
            </button>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50 fade-in-delayed">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Soul Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={score} color="#f59e0b" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{score}</div>
                <div className="text-xs text-gray-600">{score >= 100 ? 'Enlightened!' : 'Keep glowing!'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-amber-700">Today&apos;s Practices</h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <label key={task.id} className="flex items-center p-3 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                    className="w-5 h-5 text-amber-600 rounded" 
                  />
                  <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
            {showCelebration && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-center animate-pulse">
                🎉 All practices complete! Your soul shines bright!
              </div>
            )}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-amber-700">Spiritual Growth</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Gratitude Practice</span>
                  <span className="font-semibold">7 days</span>
                </div>
                <div className="bg-amber-100 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Acts of Kindness</span>
                  <span className="font-semibold">12 this week</span>
                </div>
                <div className="bg-amber-100 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-amber-700">Soul Insights</h3>
            <p className="text-gray-600 mb-3">Your compassion practice is creating positive ripples!</p>
            <p className="text-sm text-amber-600">You&apos;re radiating peace ✨</p>
          </div>
        </div>
      </div>
    </div>
  )
}