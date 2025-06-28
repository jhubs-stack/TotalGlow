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
  const words = transcript.toLowerCase().split(' ')
  
  // Enhanced mood analysis with more keywords
  const positiveWords = ['good', 'great', 'amazing', 'happy', 'excited', 'energetic', 'fantastic', 'wonderful', 'awesome', 'motivated', 'confident', 'peaceful', 'joyful', 'optimistic']
  const negativeWords = ['tired', 'stressed', 'anxious', 'bad', 'exhausted', 'overwhelmed', 'depressed', 'frustrated', 'angry', 'sad', 'worried', 'burnt', 'drained', 'terrible']
  
  // Workout/fitness keywords
  const workoutWords = ['workout', 'exercise', 'gym', 'run', 'running', 'training', 'fitness', 'yoga', 'cardio', 'strength', 'swim', 'bike', 'sport']
  const restWords = ['rest', 'sleep', 'nap', 'relax', 'recovery', 'massage']
  
  // Soul/spiritual keywords  
  const spiritualWords = ['grateful', 'thankful', 'blessed', 'peaceful', 'meditation', 'mindful', 'nature', 'prayer', 'spiritual', 'centered']
  const negativeSpiritualWords = ['disconnected', 'empty', 'meaningless', 'lost', 'isolated']
  
  // Calculate keyword scores
  const positiveScore = words.filter(w => positiveWords.includes(w)).length
  const negativeScore = words.filter(w => negativeWords.includes(w)).length
  const workoutScore = words.filter(w => workoutWords.includes(w)).length
  const restScore = words.filter(w => restWords.includes(w)).length
  const spiritualScore = words.filter(w => spiritualWords.includes(w)).length
  const negSpiritualScore = words.filter(w => negativeSpiritualWords.includes(w)).length
  
  // Determine overall mood
  let mood: 'positive' | 'neutral' | 'negative' = 'neutral'
  if (positiveScore > negativeScore + 1) mood = 'positive'
  if (negativeScore > positiveScore) mood = 'negative'
  
  // Calculate pillar updates with realistic impacts
  const baseMoodImpact = mood === 'positive' ? 4 : mood === 'negative' ? -3 : 0
  
  const pillarUpdates = {
    mind: baseMoodImpact + 
          (negativeWords.some(w => ['stressed', 'anxious', 'overwhelmed', 'frustrated'].includes(w) && words.includes(w)) ? -2 : 0) +
          (positiveWords.some(w => ['confident', 'motivated', 'optimistic'].includes(w) && words.includes(w)) ? 2 : 0),
    
    body: (workoutScore > 0 ? 3 : 0) + 
          (restScore > 0 ? 1 : 0) +
          (negativeWords.some(w => ['tired', 'exhausted', 'drained'].includes(w) && words.includes(w)) ? -2 : 0) +
          (mood === 'positive' ? 1 : mood === 'negative' ? -1 : 0),
    
    soul: (spiritualScore > 0 ? 3 : 0) + 
          (negSpiritualScore > 0 ? -2 : 0) +
          (baseMoodImpact * 0.5) // Soul affected by general mood
  }
  
  // Round to integers and ensure reasonable bounds
  Object.keys(pillarUpdates).forEach(key => {
    pillarUpdates[key as keyof typeof pillarUpdates] = Math.round(Math.max(-5, Math.min(5, pillarUpdates[key as keyof typeof pillarUpdates])))
  })
  
  return {
    mood,
    energy: mood === 'positive' ? Math.min(9, 6 + positiveScore) : mood === 'negative' ? Math.max(2, 6 - negativeScore) : 6,
    stress: mood === 'negative' ? Math.min(9, 4 + negativeScore) : mood === 'positive' ? Math.max(1, 4 - positiveScore) : 4,
    keywords: [...positiveWords, ...negativeWords, ...workoutWords, ...spiritualWords].filter(w => words.includes(w)),
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