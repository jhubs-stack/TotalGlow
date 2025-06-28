// src/utils/pillarConnections.ts
export interface PillarImpact {
  source: 'mind' | 'body' | 'soul'
  target: 'mind' | 'body' | 'soul'
  impact: number // -10 to +10
  reason: string
  actionTaken: string
  timestamp: Date
}

export interface CrossPillarInsight {
  id: string
  type: 'boost' | 'warning' | 'opportunity' | 'achievement'
  title: string
  message: string
  pillarsAffected: ('mind' | 'body' | 'soul')[]
  confidenceScore: number
  actionable: boolean
  suggestedAction?: string
  icon: string
}

export interface WellnessState {
  mind: number
  body: number
  soul: number
  lastUpdated: Date
  recentActivities: string[]
  trends: {
    mind: number[]
    body: number[]
    soul: number[]
  }
}

// Core interconnectivity calculation
export const calculatePillarImpacts = (
  currentState: WellnessState,
  newActivity: string,
  activityPillar: 'mind' | 'body' | 'soul'
): PillarImpact[] => {
  const impacts: PillarImpact[] = []
  const now = new Date()

  // Mind-based activities affecting other pillars
  if (activityPillar === 'mind') {
    if (newActivity.includes('meditation') || newActivity.includes('mindfulness')) {
      impacts.push({
        source: 'mind',
        target: 'body',
        impact: +3,
        reason: 'Meditation reduces cortisol, improving physical recovery',
        actionTaken: newActivity,
        timestamp: now
      })
      impacts.push({
        source: 'mind',
        target: 'soul',
        impact: +2,
        reason: 'Mindfulness practice deepens spiritual awareness',
        actionTaken: newActivity,
        timestamp: now
      })
    }
    
    if (newActivity.includes('stress_relief') || newActivity.includes('breathing')) {
      impacts.push({
        source: 'mind',
        target: 'body',
        impact: +4,
        reason: 'Stress reduction improves sleep quality and energy',
        actionTaken: newActivity,
        timestamp: now
      })
    }
  }

  // Body-based activities affecting other pillars
  if (activityPillar === 'body') {
    if (newActivity.includes('workout') || newActivity.includes('exercise')) {
      impacts.push({
        source: 'body',
        target: 'mind',
        impact: +5,
        reason: 'Exercise releases endorphins, boosting mood and focus',
        actionTaken: newActivity,
        timestamp: now
      })
      impacts.push({
        source: 'body',
        target: 'soul',
        impact: +1,
        reason: 'Physical achievement builds inner confidence',
        actionTaken: newActivity,
        timestamp: now
      })
    }

    if (newActivity.includes('yoga') || newActivity.includes('stretching')) {
      impacts.push({
        source: 'body',
        target: 'mind',
        impact: +3,
        reason: 'Yoga combines movement with mindfulness',
        actionTaken: newActivity,
        timestamp: now
      })
      impacts.push({
        source: 'body',
        target: 'soul',
        impact: +4,
        reason: 'Yoga connects body awareness with spiritual practice',
        actionTaken: newActivity,
        timestamp: now
      })
    }

    if (newActivity.includes('nutrition') || newActivity.includes('healthy_meal')) {
      impacts.push({
        source: 'body',
        target: 'mind',
        impact: +2,
        reason: 'Good nutrition improves cognitive function',
        actionTaken: newActivity,
        timestamp: now
      })
    }
  }

  // Soul-based activities affecting other pillars
  if (activityPillar === 'soul') {
    if (newActivity.includes('gratitude') || newActivity.includes('reflection')) {
      impacts.push({
        source: 'soul',
        target: 'mind',
        impact: +3,
        reason: 'Gratitude practice reduces anxiety and increases optimism',
        actionTaken: newActivity,
        timestamp: now
      })
    }

    if (newActivity.includes('nature') || newActivity.includes('outdoors')) {
      impacts.push({
        source: 'soul',
        target: 'mind',
        impact: +2,
        reason: 'Nature connection reduces mental fatigue',
        actionTaken: newActivity,
        timestamp: now
      })
      impacts.push({
        source: 'soul',
        target: 'body',
        impact: +1,
        reason: 'Time in nature encourages physical activity',
        actionTaken: newActivity,
        timestamp: now
      })
    }

    if (newActivity.includes('compassion') || newActivity.includes('kindness')) {
      impacts.push({
        source: 'soul',
        target: 'mind',
        impact: +4,
        reason: 'Acts of kindness trigger positive neurochemical changes',
        actionTaken: newActivity,
        timestamp: now
      })
    }
  }

  return impacts
}

// Generate intelligent cross-pillar insights
export const generateCrossPillarInsights = (
  wellnessState: WellnessState
): CrossPillarInsight[] => {
  const insights: CrossPillarInsight[] = []
  const { mind, body, soul } = wellnessState

  console.log('🔍 Generating insights for scores:', { mind, body, soul })

  // Calculate pillar balance
  const scores = [mind, body, soul]
  const average = scores.reduce((a, b) => a + b, 0) / 3
  const maxScore = Math.max(...scores)
  const minScore = Math.min(...scores)
  const imbalance = maxScore - minScore

  console.log('📊 Calculated values:', { average, maxScore, minScore, imbalance })

  // Identify dominant and weak pillars
  const dominantPillar = mind >= body && mind >= soul ? 'mind' : 
                        body >= soul ? 'body' : 'soul'
  const weakestPillar = mind <= body && mind <= soul ? 'mind' :
                       body <= soul ? 'body' : 'soul'

  console.log('🎯 Pillars:', { dominantPillar, weakestPillar })

  // 1. Balance Opportunity - Lowered from 20 to 10
  if (imbalance > 10) {
    console.log('✅ Adding balance opportunity insight')
    insights.push({
      id: 'balance_opportunity',
      type: 'opportunity',
      title: 'Balance Opportunity',
      message: `Your ${dominantPillar} pillar (${scores[dominantPillar === 'mind' ? 0 : dominantPillar === 'body' ? 1 : 2]}) is stronger than your ${weakestPillar} pillar (${scores[weakestPillar === 'mind' ? 0 : weakestPillar === 'body' ? 1 : 2]}). Use this strength to boost your weaker area!`,
      pillarsAffected: [dominantPillar, weakestPillar] as ('mind' | 'body' | 'soul')[],
      confidenceScore: 0.85,
      actionable: true,
      suggestedAction: getBalanceAction(dominantPillar, weakestPillar),
      icon: '⚖️'
    })
  } else {
    console.log('❌ Skipping balance opportunity: imbalance =', imbalance)
  }

  // 2. Synergy Boost Opportunities
  if (body > 75 && mind < 80) {
    console.log('✅ Adding body-mind synergy insight')
    insights.push({
      id: 'body_mind_synergy',
      type: 'boost',
      title: 'Fitness → Mental Clarity',
      message: 'Your fitness routine is solid! Add 10 minutes of post-workout meditation to supercharge your mental clarity.',
      pillarsAffected: ['body', 'mind'],
      confidenceScore: 0.78,
      actionable: true,
      suggestedAction: 'Try meditation after your next workout',
      icon: '🧘‍♂️'
    })
  } else {
    console.log('❌ Skipping body-mind synergy: body =', body, 'mind =', mind)
  }

  if (mind > 75 && soul < 75) {
    console.log('✅ Adding mind-soul connection insight')
    insights.push({
      id: 'mind_soul_connection',
      type: 'boost',
      title: 'Mental Focus → Inner Peace',
      message: 'Your mental discipline is developing well! Channel this focus into gratitude practice for deeper spiritual fulfillment.',
      pillarsAffected: ['mind', 'soul'],
      confidenceScore: 0.72,
      actionable: true,
      suggestedAction: 'Start a 5-minute daily gratitude journal',
      icon: '🙏'
    })
  } else {
    console.log('❌ Skipping mind-soul connection: mind =', mind, 'soul =', soul)
  }

  if (soul > 70 && body < 85) {
    console.log('✅ Adding soul-body energy insight')
    insights.push({
      id: 'soul_body_energy',
      type: 'boost', 
      title: 'Inner Peace → Physical Energy',
      message: 'Your spiritual awareness is growing! Use this inner calm to enhance your movement practice.',
      pillarsAffected: ['soul', 'body'],
      confidenceScore: 0.75,
      actionable: true,
      suggestedAction: 'Try yoga or mindful walking',
      icon: '🌱'
    })
  } else {
    console.log('❌ Skipping soul-body energy: soul =', soul, 'body =', body)
  }

  // 3. Warning Signs
  if (mind < 50 && body < 50) {
    console.log('✅ Adding stress warning insight')
    insights.push({
      id: 'stress_warning',
      type: 'warning',
      title: 'Stress Pattern Detected',
      message: 'Both your mental and physical scores are low. This suggests high stress levels affecting multiple areas.',
      pillarsAffected: ['mind', 'body'],
      confidenceScore: 0.88,
      actionable: true,
      suggestedAction: 'Try gentle breathing exercises or a short walk',
      icon: '⚠️'
    })
  } else {
    console.log('❌ Skipping stress warning: mind =', mind, 'body =', body)
  }

  // 4. Achievement Recognition
  if (Math.min(mind, body, soul) > 70) {
    console.log('✅ Adding balanced achievement insight')
    insights.push({
      id: 'balanced_achievement',
      type: 'achievement',
      title: 'Well-Rounded Wellness!',
      message: 'Great progress! All three pillars are in good shape. You\'re building balanced wellness.',
      pillarsAffected: ['mind', 'body', 'soul'],
      confidenceScore: 0.90,
      actionable: false,
      icon: '🌟'
    })
  } else {
    console.log('❌ Skipping balanced achievement: min score =', Math.min(mind, body, soul))
  }

  // 5. Trend-based insights
  const recentTrends = calculateRecentTrends(wellnessState.trends)
  console.log('📈 Recent trends:', recentTrends)
  
  if (recentTrends.improving.length >= 2) {
    console.log('✅ Adding momentum building insight')
    insights.push({
      id: 'momentum_building',
      type: 'boost',
      title: 'Momentum Building',
      message: `Your ${recentTrends.improving.join(' and ')} pillars are on an upward trend! Keep this momentum going.`,
      pillarsAffected: recentTrends.improving as ('mind' | 'body' | 'soul')[],
      confidenceScore: 0.82,
      actionable: true,
      suggestedAction: 'Maintain your current practices',
      icon: '📈'
    })
  } else {
    console.log('❌ Skipping momentum building: improving pillars =', recentTrends.improving.length)
  }

  // 6. Daily momentum insight
  if (average > 70) {
    console.log('✅ Adding daily momentum insight')
    insights.push({
      id: 'daily_momentum',
      type: 'boost',
      title: 'Daily Momentum',
      message: `Your overall wellness (${Math.round(average)}) shows you're building healthy habits. Small daily actions create lasting change!`,
      pillarsAffected: ['mind', 'body', 'soul'],
      confidenceScore: 0.88,
      actionable: true,
      suggestedAction: 'Keep up your consistent daily practices',
      icon: '🔥'
    })
  } else {
    console.log('❌ Skipping daily momentum: average =', average)
  }

  console.log('🎯 Final insights generated:', insights.length, insights.map(i => i.id))
  return insights
}

// Helper function to suggest balance actions
const getBalanceAction = (strong: string, weak: string): string => {
  const actions: { [key: string]: string } = {
    'mind_body': 'Use your mental focus to establish a consistent exercise routine',
    'mind_soul': 'Apply your concentration skills to meditation or gratitude practice',
    'body_mind': 'Add mindfulness to your workouts - try yoga or mindful running',
    'body_soul': 'Connect with nature during your physical activities',
    'soul_mind': 'Use your spiritual insights to develop mental clarity practices',
    'soul_body': 'Honor your body as a temple through gentle, mindful movement'
  }
  
  return actions[`${strong}_${weak}`] || 'Focus on bringing balance to all three pillars'
}

// Calculate recent trends
const calculateRecentTrends = (trends: { mind: number[], body: number[], soul: number[] }) => {
  const improving: string[] = []
  const declining: string[] = []
  
  Object.entries(trends).forEach(([pillar, scores]) => {
    if (scores.length >= 3) {
      const recent = scores.slice(-3)
      const trend = recent[2] - recent[0]
      if (trend > 2) improving.push(pillar)
      if (trend < -2) declining.push(pillar)
    }
  })
  
  return { improving, declining }
}

// Apply impacts to wellness state
export const applyPillarImpacts = (
  currentState: WellnessState, 
  impacts: PillarImpact[]
): WellnessState => {
  const newState = { ...currentState }
  
  impacts.forEach(impact => {
    const currentScore = newState[impact.target]
    const newScore = Math.max(0, Math.min(100, currentScore + impact.impact))
    newState[impact.target] = newScore
    
    // Update trends
    newState.trends[impact.target].push(newScore)
    if (newState.trends[impact.target].length > 14) {
      newState.trends[impact.target] = newState.trends[impact.target].slice(-14)
    }
  })
  
  newState.lastUpdated = new Date()
  return newState
}