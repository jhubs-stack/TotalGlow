'use client'
import { useState, useRef } from 'react'
import { analyzeVoiceInput, VoiceAnalysis } from '@/utils/aiPredictions'

interface VoiceCheckinProps {
  onComplete: (results: VoiceAnalysis) => void
  isMinimized?: boolean
}

export default function VoiceCheckin({ onComplete, isMinimized = false }: VoiceCheckinProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastResult, setLastResult] = useState<VoiceAnalysis | null>(null)
  const [showTextFallback, setShowTextFallback] = useState(false)
  const [textInput, setTextInput] = useState('')
  const recognitionRef = useRef<any>(null)

  const startVoiceCheckin = async () => {
    setIsRecording(true)
    setTranscript('')
    
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript)
          }
        }
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsRecording(false)
          
          if (event.error === 'not-allowed') {
            alert('🎤 Microphone access denied. Please:\n\n1. Click the microphone icon in your browser address bar\n2. Allow microphone access\n3. Refresh the page and try again\n\nOr try the text input fallback below!')
          } else if (event.error === 'no-speech') {
            alert('No speech detected. Please try speaking again.')
          } else {
            alert(`Speech recognition error: ${event.error}. Try the text input fallback below!`)
          }
        }
        
        recognitionRef.current.onend = () => {
          if (isRecording) {
            // Auto-stop after getting transcript
            setIsRecording(false)
          }
        }
        
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setIsRecording(false)
        alert('Unable to start speech recognition. Please try the text input fallback below!')
      }
    } else {
      // Fallback for browsers without speech recognition
      setIsRecording(false)
      alert('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari, or try the text input fallback below!')
    }
  }

  const stopVoiceCheckin = async () => {
    setIsRecording(false)
    setIsAnalyzing(true)
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    if (transcript.trim()) {
      try {
        // Analyze the voice input
        const analysis = await analyzeVoiceInput(transcript)
        setLastResult(analysis)
        setIsAnalyzing(false)
        onComplete(analysis)
      } catch (error) {
        console.error('Error analyzing voice input:', error)
        setIsAnalyzing(false)
      }
    } else {
      setIsAnalyzing(false)
    }
  }

  // Handle text input fallback
  const handleTextSubmit = async () => {
    if (!textInput.trim()) return
    
    setIsAnalyzing(true)
    try {
      const analysis = await analyzeVoiceInput(textInput)
      setLastResult(analysis)
      setIsAnalyzing(false)
      setTextInput('')
      setShowTextFallback(false)
      onComplete(analysis)
    } catch (error) {
      console.error('Error analyzing text input:', error)
      setIsAnalyzing(false)
    }
  }

  // Minimized version for main page
  if (isMinimized) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={startVoiceCheckin}
              disabled={isRecording || isAnalyzing}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              {isRecording ? (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              ) : isAnalyzing ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="text-sm">🎤</span>
              )}
            </button>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">Voice Check-in</h3>
              <p className="text-xs text-gray-600">
                {isRecording ? 'Listening...' : isAnalyzing ? 'Analyzing...' : 'Share how you feel'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTextFallback(!showTextFallback)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded bg-blue-50"
          >
            {showTextFallback ? '🎤 Voice' : '✍️ Type'}
          </button>
        </div>

        {/* Always show text input option */}
        <div className="space-y-3">
          {showTextFallback ? (
            /* Text input mode */
            <div className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder="Type how you're feeling..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAnalyzing}
                autoFocus
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim() || isAnalyzing}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? '...' : 'Send'}
              </button>
            </div>
          ) : (
            /* Voice recording mode */
            isRecording && (
              <div>
                <button
                  onClick={stopVoiceCheckin}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-all"
                >
                  Stop Recording
                </button>
                {transcript && (
                  <div className="mt-2 bg-gray-100 p-2 rounded-lg text-xs text-gray-700 max-h-16 overflow-y-auto">
                    "{transcript}"
                  </div>
                )}
              </div>
            )
          )}
          
          {lastResult && !isRecording && !isAnalyzing && (
            <div className="text-xs text-gray-500 text-center bg-green-50 p-2 rounded-lg">
              Last result: {lastResult.mood} mood • Energy {lastResult.energy}/10
            </div>
          )}
        </div>
      </div>
    )
  }

  // Full version for dedicated modal/page
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Voice Check-in
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Tell me how you're feeling today - I'll update your wellness scores automatically
        </p>
        
        {!isRecording && !isAnalyzing && (
          <div className="space-y-4">
            <button
              onClick={startVoiceCheckin}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg active:scale-95 transition-all flex items-center space-x-3 mx-auto"
            >
              <span>🎤</span>
              <span>Start Voice Check-in</span>
            </button>
            <button
              onClick={() => setShowTextFallback(!showTextFallback)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showTextFallback ? 'Use Voice Instead' : 'Or Type Your Message'}
            </button>
          </div>
        )}

        {/* Text input fallback for full version */}
        {showTextFallback && !isRecording && !isAnalyzing && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type how you're feeling today..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isAnalyzing}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze My Wellness'}
            </button>
          </div>
        )}
        
        {isRecording && (
          <div className="space-y-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-white text-2xl">🎤</span>
            </div>
            <p className="text-gray-600 font-medium">Listening... Tap to stop</p>
            <button
              onClick={stopVoiceCheckin}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-medium active:scale-95 transition-all"
            >
              Stop Recording
            </button>
            {transcript && (
              <div className="bg-gray-100 p-4 rounded-xl text-sm text-left max-h-32 overflow-y-auto mx-auto max-w-md">
                <p className="text-gray-500 text-xs mb-2">You said:</p>
                <p className="text-gray-800">"{transcript}"</p>
              </div>
            )}
          </div>
        )}
        
        {isAnalyzing && (
          <div className="space-y-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-gray-600 font-medium">Analyzing your wellness patterns...</p>
          </div>
        )}

        {lastResult && !isRecording && !isAnalyzing && (
          <div className="bg-green-50 p-4 rounded-xl mb-4">
            <h4 className="font-medium text-green-800 mb-2">Analysis Complete!</h4>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="text-lg">😊</div>
                <div className="text-green-700 font-medium">Mood</div>
                <div className="text-green-600 capitalize">{lastResult.mood}</div>
              </div>
              <div className="text-center">
                <div className="text-lg">⚡</div>
                <div className="text-green-700 font-medium">Energy</div>
                <div className="text-green-600">{lastResult.energy}/10</div>
              </div>
              <div className="text-center">
                <div className="text-lg">😌</div>
                <div className="text-green-700 font-medium">Stress</div>
                <div className="text-green-600">{lastResult.stress}/10</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}