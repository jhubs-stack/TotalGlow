'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProgressRing from '@/components/ProgressRing'
import AICoach from '@/components/AICoach'

export default function MindPage() {
  const [showAICoach, setShowAICoach] = useState(false)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Morning meditation', completed: false },
    { id: 2, text: 'Gratitude journaling', completed: false },
    { id: 3, text: 'Read for 20 minutes', completed: false }
  ])
  const [score, setScore] = useState(78)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleTaskToggle = (taskId: number) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      
      // Calculate new score based on completed tasks
      const completedCount = updated.filter(t => t.completed).length
      const newScore = 70 + (completedCount * 10)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 page-transition">
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
              <Link href="/mind" className="text-purple-600 font-medium border-b-2 border-purple-600">Mind</Link>
              <Link href="/body" className="text-gray-700 hover:text-purple-600 transition-colors">Body</Link>
              <Link href="/soul" className="text-gray-700 hover:text-purple-600 transition-colors">Soul</Link>
              <button
                onClick={() => setShowAICoach(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <span>AI Coach</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Mind Wellness
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">Nurture your mental health and cognitive well-being</p>

        {/* Recommended Actions - Moved to Top */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 fade-in-delayed mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Today&apos;s Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => alert('Starting 5-minute meditation...')}
              className="p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🧘‍♀️</span>
              <h4 className="font-semibold text-purple-700">Quick Meditation</h4>
              <p className="text-sm text-gray-600 mt-1">5-minute breathing</p>
            </button>
            <button 
              onClick={() => alert('Opening journaling prompts...')}
              className="p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">📝</span>
              <h4 className="font-semibold text-purple-700">Journal Prompt</h4>
              <p className="text-sm text-gray-600 mt-1">Reflect on today</p>
            </button>
            <button 
              onClick={() => alert('Loading focus timer...')}
              className="p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-all transform hover:scale-105 text-left"
            >
              <span className="text-2xl mb-2 block">🎯</span>
              <h4 className="font-semibold text-purple-700">Focus Session</h4>
              <p className="text-sm text-gray-600 mt-1">25-min deep work</p>
            </button>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto mb-16 shadow-xl border border-white/50 fade-in-delayed">
          <div className="text-center">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Mind Score</p>
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing progress={score} color="#8b5cf6" size={180} />
              <div className="absolute text-center">
                <div className="text-5xl font-bold text-gray-800">{score}</div>
                <div className="text-xs text-gray-600">{score >= 100 ? 'Perfect!' : 'Keep going!'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Today&apos;s Practice</h3>
            <div className="space-y-3">
              {tasks.map(task => (
                <label key={task.id} className="flex items-center p-3 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                    className="w-5 h-5 text-purple-600 rounded" 
                  />
                  <span className={`ml-3 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
            {showCelebration && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-center animate-pulse">
                🎉 All tasks completed! Great job!
              </div>
            )}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Recent Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Meditation Streak</span>
                  <span className="font-semibold">5 days</span>
                </div>
                <div className="bg-purple-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Focus Time</span>
                  <span className="font-semibold">2.5 hrs</span>
                </div>
                <div className="bg-purple-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform hover:scale-105 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-700">Insights</h3>
            <p className="text-gray-600 mb-3">Your stress levels have decreased by 15% this week!</p>
            <p className="text-sm text-purple-600">Keep up the meditation practice 🎯</p>
          </div>
        </div>
      </div>
    </div>
  )
}