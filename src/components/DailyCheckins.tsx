'use client'
import { useState, useEffect } from 'react'

interface CheckinItem {
  id: string
  pillar: 'mind' | 'body' | 'soul'
  task: string
  completed: boolean
}

export default function DailyCheckins() {
  const [checkins, setCheckins] = useState<CheckinItem[]>([
    { id: '1', pillar: 'mind', task: 'Meditate for 10 minutes', completed: false },
    { id: '2', pillar: 'body', task: '30 minutes of exercise', completed: false },
    { id: '3', pillar: 'soul', task: 'Write 3 gratitudes', completed: false },
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

  const pillarColors = {
    mind: 'purple',
    body: 'green',
    soul: 'amber'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Daily Check-ins</h2>
      <div className="space-y-3">
        {checkins.map((item) => (
          <div 
            key={item.id}
            className={`flex items-center p-3 rounded-lg bg-${pillarColors[item.pillar]}-50`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCheckin(item.id)}
              className="w-5 h-5 mr-3"
            />
            <div className="flex-1">
              <p className={`font-medium text-${pillarColors[item.pillar]}-700`}>
                {item.pillar.charAt(0).toUpperCase() + item.pillar.slice(1)}
              </p>
              <p className="text-gray-700">{item.task}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}