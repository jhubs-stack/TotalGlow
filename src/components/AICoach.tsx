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
    
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: "I understand you're working on your wellness journey. Based on your scores, I'd suggest focusing on your Soul pillar with some gratitude exercises. Would you like me to guide you through one?"
      }])
    }, 1000)
    
    setMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your wellness..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            onClick={handleSend} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}