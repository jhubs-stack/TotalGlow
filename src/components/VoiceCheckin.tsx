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
  const [showVoiceMode, setShowVoiceMode] = useState(false)
  const [textInput, setTextInput] = useState('')
  const recognitionRef = useRef<any>(null)

  // Enhanced demo suggestions showing both positive and negative examples
  const demoSuggestions = [
    "I feel amazing after my workout session!",
    "I'm stressed and overwhelmed with work today", 
    "Had a peaceful meditation and feel centered",
    "I'm exhausted and need to rest more"
  ]

  const startVoiceCheckin = async () => {
    setIsRecording(true)
    setTranscript('')
    
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
            alert('🎤 Microphone access denied. Try the text input below!')
          } else {
            alert(`Speech recognition error: ${event.error}. Using text input instead!`)
          }
        }
        
        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
        
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setIsRecording(false)
        alert('Voice not available. Using text input!')
      }
    } else {
      setIsRecording(false)
      alert('Voice not supported. Using text input!')
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

  const handleTextSubmit = async (inputText?: string) => {
    const textToAnalyze = inputText || textInput
    if (!textToAnalyze.trim()) return
    
    setIsAnalyzing(true)
    try {
      console.log('🎤 Analyzing text:', textToAnalyze)
      const analysis = await analyzeVoiceInput(textToAnalyze)
      console.log('📊 Analysis result:', analysis)
      
      setLastResult(analysis)
      setIsAnalyzing(false)
      setTextInput('')
      onComplete(analysis)
    } catch (error) {
      console.error('Error analyzing text input:', error)
      setIsAnalyzing(false)
    }
  }

  // Minimized version for main page - TEXT-FIRST DESIGN
  if (isMinimized) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800">AI Wellness Check-in</h3>
            <p className="text-xs text-gray-600">
              {isAnalyzing ? 'Analyzing your wellness...' : 'Share how you\'re feeling today'}
            </p>
          </div>
          <button
            onClick={() => setShowVoiceMode(!showVoiceMode)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded bg-blue-50"
          >
            {showVoiceMode ? '✍️ Text' : '🎤 Voice'}
          </button>
        </div>

        {/* TEXT-FIRST: Always show text input prominently */}
        {!showVoiceMode ? (
          <div className="space-y-3">
            {/* Main text input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder="I feel amazing after my workout!"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAnalyzing}
              />
              <button
                onClick={() => handleTextSubmit()}
                disabled={!textInput.trim() || isAnalyzing}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? '⚡' : 'Analyze'}
              </button>
            </div>
            
            {/* Quick suggestion buttons */}
            <div className="flex flex-wrap gap-1">
              {demoSuggestions.slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleTextSubmit(suggestion)}
                  disabled={isAnalyzing}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
                >
                  {suggestion.length > 25 ? suggestion.substring(0, 25) + '...' : suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Voice mode (secondary) */
          <div className="space-y-3">
            {!isRecording ? (
              <button
                onClick={startVoiceCheckin}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-medium active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>🎤</span>
                <span>Start Voice Check-in</span>
              </button>
            ) : (
              <div className="text-center">
                <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 animate-pulse flex items-center justify-center">
                  <span className="text-white text-sm">🎤</span>
                </div>
                <button
                  onClick={stopVoiceCheckin}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium active:scale-95 transition-all"
                >
                  Stop Recording
                </button>
                {transcript && (
                  <div className="mt-2 bg-gray-100 p-2 rounded-lg text-xs text-gray-700">
                    &quot;{transcript}&quot;
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Results display */}
        {lastResult && !isAnalyzing && (
          <div className="mt-3 text-xs text-center bg-green-50 p-2 rounded-lg border border-green-200">
            <div className="flex items-center justify-center space-x-3">
              <span>Mood: <strong className="text-green-700 capitalize">{lastResult.mood}</strong></span>
              <span>•</span>
              <span>Energy: <strong className="text-blue-700">{lastResult.energy}/10</strong></span>
              <span>•</span>
              <span>Stress: <strong className="text-orange-700">{lastResult.stress}/10</strong></span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full version remains the same but text-first
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          AI Wellness Check-in
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Share how you're feeling - I'll analyze your wellness and update your scores
        </p>
        
        {/* Text input - primary method */}
        <div className="space-y-4 mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="I feel energized after my morning workout..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAnalyzing}
            />
            <button
              onClick={() => handleTextSubmit()}
              disabled={!textInput.trim() || isAnalyzing}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          
          {/* Demo suggestions */}
          <div className="flex flex-wrap gap-2 justify-center">
            {demoSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleTextSubmit(suggestion)}
                disabled={isAnalyzing}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Voice option - secondary */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowVoiceMode(!showVoiceMode)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showVoiceMode ? 'Hide Voice Option' : 'Or Try Voice Input'}
          </button>
          
          {showVoiceMode && (
            <div className="mt-4">
              {/* Voice controls */}
              {!isRecording ? (
                <button
                  onClick={startVoiceCheckin}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-all disabled:opacity-50 flex items-center space-x-2 mx-auto"
                >
                  <span>🎤</span>
                  <span>Start Voice Check-in</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                    <span className="text-white text-2xl">🎤</span>
                  </div>
                  <button
                    onClick={stopVoiceCheckin}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-all"
                  >
                    Stop Recording
                  </button>
                  {transcript && (
                    <div className="bg-gray-100 p-3 rounded-xl text-sm">
                      &quot;{transcript}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {lastResult && !isAnalyzing && (
          <div className="mt-6 bg-green-50 p-4 rounded-xl">
            <h4 className="font-medium text-green-800 mb-3">Analysis Complete!</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-1">😊</div>
                <div className="text-green-700 font-medium">Mood</div>
                <div className="text-green-600 capitalize">{lastResult.mood}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-green-700 font-medium">Energy</div>
                <div className="text-green-600">{lastResult.energy}/10</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">😌</div>
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