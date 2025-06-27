'use client'
import { useState, useEffect } from 'react'

interface CheckinItem {
  id: string
  pillar: 'mind' | 'body' | 'soul'
  task: string
  completed: boolean
  points: number
}

export default function DailyCheckins() {
  const [checkins, setCheckins] = useState<CheckinItem[]>([
    { id: '1', pillar: 'mind', task: 'Meditate for 10 minutes', completed: false, points: 10 },
    { id: '2', pillar: 'body', task: '30 minutes of exercise', completed: false, points: 15 },
    { id: '3', pillar: 'soul', task: 'Write 3 gratitudes', completed: false, points: 10 },
  ])

  useEffect(() => {
    const saved = localStorage.getItem('dailyCheckins')
    if (saved) setCheckins(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('dailyCheckins', JSON.stringify(checkins))
  }, [checkins])

  const toggleCheckin = (id: string) => {
    setCheckins(checkins.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const pillarConfig = {
    mind: { color: 'purple', emoji: '🧠' },
    body: { color: 'green', emoji: '💪' },
    soul: { color: 'amber', emoji: '✨' }
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Today's Check-ins</h3>
      <div className="space-y-4">
        {checkins.map((item) => (
          <label 
            key={item.id}
            className={`flex items-center p-4 bg-${pillarConfig[item.pillar].color}-50 rounded-2xl cursor-pointer hover:bg-${pillarConfig[item.pillar].color}-100 transition-colors group`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCheckin(item.id)}
              className={`w-6 h-6 text-${pillarConfig[item.pillar].color}-600 rounded-lg`}
            />
            <div className="ml-4 flex-1">
              <p className={`font-semibold text-${pillarConfig[item.pillar].color}-700 flex items-center gap-2`}>
                {item.pillar.charAt(0).toUpperCase() + item.pillar.slice(1)}
                <span>{pillarConfig[item.pillar].emoji}</span>
              </p>
              <p className="text-gray-600">{item.task}</p>
            </div>
            <span className={`text-${pillarConfig[item.pillar].color}-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium`}>
              +{item.points} pts
            </span>
          </label>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Complete all tasks to maintain your streak! 
        </p>
      </div>
    </div>
  )
}