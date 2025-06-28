// src/utils/aiPredictions.ts
interface PredictionData {
  currentScores: { mind: number; body: number; soul: number }
  recentTrends: number[] // Last 7 days
  activities: string[]
  sleepQuality: number
  stressLevel: number
}

export interface WellnessPrediction {
  pillar: 'mind' | 'body' | 'soul'
  currentScore: number
  predictedScore: number
  confidence: number
  timeframe: '3_days' | '1_week' | '2_weeks'
  reasoning: string
  recommendations: string[]
}

export interface VoiceAnalysis {
  mood: 'positive' | 'neutral' | 'negative'
  energy: number // 1-10
  stress: number // 1-10
  keywords: string[]
  transcript: string
  pillarUpdates: {
    mind: number
    body: number  
    soul: number
  }
}

// AI Prediction Engine
export const generateWellnessPredictions = (data: PredictionData): WellnessPrediction[] => {
  const predictions: WellnessPrediction[] = []
  
  // Mind Score Prediction
  const mindTrend = calculateTrend(data.recentTrends, 'mind')
  const stressImpact = data.stressLevel > 7 ? -5 : data.stressLevel < 4 ? +3 : 0
  const sleepImpact = data.sleepQuality > 8 ? +4 : data.sleepQuality < 6 ? -3 : 0
  
  const predictedMind = Math.max(0, Math.min(100, 
    data.currentScores.mind + mindTrend + stressImpact + sleepImpact
  ))
  
  predictions.push({
    pillar: 'mind',
    currentScore: data.currentScores.mind,
    predictedScore: Math.round(predictedMind),
    confidence: 0.78,
    timeframe: '3_days',
    reasoning: `Based on your ${mindTrend > 0 ? 'improving' : 'declining'} meditation consistency and current stress patterns`,
    recommendations: [
      'Continue your morning meditation streak',
      'Try the new breathing exercise for stress relief',
      'Consider a digital detox evening'
    ]
  })

  // Body Score Prediction  
  const bodyTrend = calculateTrend(data.recentTrends, 'body')
  const workoutFrequency = data.activities.filter(a => a.includes('workout')).length
  const workoutImpact = workoutFrequency > 4 ? +6 : workoutFrequency < 2 ? -4 : 0
  
  const predictedBody = Math.max(0, Math.min(100,
    data.currentScores.body + bodyTrend + workoutImpact
  ))
  
  predictions.push({
    pillar: 'body',
    currentScore: data.currentScores.body,
    predictedScore: Math.round(predictedBody),
    confidence: 0.85,
    timeframe: '3_days', 
    reasoning: `Your workout consistency suggests ${workoutImpact > 0 ? 'continued improvement' : 'potential plateau'}`,
    recommendations: [
      'Add 2 more cardio sessions this week',
      'Focus on recovery with yoga',
      'Track your protein intake'
    ]
  })

  return predictions
}

// AI Analysis Function for Voice Input
export const analyzeVoiceInput = async (transcript: string): Promise<VoiceAnalysis> => {
  // Simulate AI analysis - in real app, this would call Claude API
  const words = transcript.toLowerCase().split(' ')
  
  // Mood analysis
  const positiveWords = ['good', 'great', 'amazing', 'happy', 'excited', 'energetic']
  const negativeWords = ['tired', 'stressed', 'anxious', 'bad', 'exhausted', 'overwhelmed']
  
  const positiveScore = words.filter(w => positiveWords.includes(w)).length
  const negativeScore = words.filter(w => negativeWords.includes(w)).length
  
  let mood: 'positive' | 'neutral' | 'negative' = 'neutral'
  if (positiveScore > negativeScore) mood = 'positive'
  if (negativeScore > positiveScore) mood = 'negative'
  
  // Generate pillar updates based on keywords
  const pillarUpdates = {
    mind: mood === 'positive' ? 3 : mood === 'negative' ? -2 : 0,
    body: words.includes('workout') || words.includes('exercise') ? 2 : 0,
    soul: words.includes('grateful') || words.includes('peaceful') ? 2 : 0
  }
  
  return {
    mood,
    energy: mood === 'positive' ? 8 : mood === 'negative' ? 4 : 6,
    stress: mood === 'negative' ? 7 : mood === 'positive' ? 3 : 5,
    keywords: [...positiveWords, ...negativeWords].filter(w => words.includes(w)),
    transcript,
    pillarUpdates
  }
}

const calculateTrend = (trends: number[], pillar: string): number => {
  if (trends.length < 3) return 0
  
  const recent = trends.slice(-3)
  const older = trends.slice(-6, -3)
  
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
  const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg
  
  return recentAvg - olderAvg
}