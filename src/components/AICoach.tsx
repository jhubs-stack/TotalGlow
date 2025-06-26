'use client'
import { useState } from 'react'

export default function AICoach() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your TotalGlow wellness coach. How can I help you today?" }
  ])

  const handleSend = () => {
    if (!message.trim()) return
    
    setChat([...chat, { role: 'user', content: message }])
    
    // Simulate AI response (replace with Claude API later)
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: "I understand you're working on your wellness journey. Based on your scores, I'd suggest focusing on your Soul pillar with some gratitude exercises. Would you like me to guide you through one?"
      }])
    }, 1000)
    
    setMessage('')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">AI Wellness Coach</h2>
      
      <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-50 rounded">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your wellness..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  )
}