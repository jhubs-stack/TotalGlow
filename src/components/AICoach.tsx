'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Add the interface for props
interface AICoachProps {
  onClose: () => void;
}

// Update the component to use portal and fix hydration
export default function AICoach({ onClose }: AICoachProps) {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your TotalGlow wellness coach. How can I help you today?" }
  ])
  
  // Fix hydration by ensuring modal only renders on client
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Cleanup function to restore scroll
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

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

  // Don't render anything until component is mounted on client
  if (!mounted) {
    return null
  }

  const modalContent = (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose} // Close when clicking overlay
      >
        {/* Modal Content */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <h3 className="text-lg font-semibold">AI Wellness Coach</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center text-xl transition-all"
              aria-label="Close AI Coach"
            >
              ×
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your wellness..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button 
                onClick={handleSend} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body)
}