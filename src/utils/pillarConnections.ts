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

// Generate intelligent cross-pillar insights - CLEAN VERSION WITH MAX 2 INSIGHTS
export const generateCrossPillarInsights = (
  wellnessState: WellnessState
): CrossPillarInsight[] => {
  const insights: CrossPillarInsight[] = []
  const { mind, body, soul } = wellnessState

  // Calculate pillar balance
  const scores = [mind, body, soul]
  const average = scores.reduce((a, b) => a + b, 0) / 3
  const maxScore = Math.max(...scores)
  const minScore = Math.min(...scores)
  const imbalance = maxScore - minScore

  // Identify dominant and weak pillars
  const dominantPillar = mind >= body && mind >= soul ? 'mind' : 
                        body >= soul ? 'body' : 'soul'
  const weakestPillar = mind <= body && mind <= soul ? 'mind' :
                       body <= soul ? 'body' : 'soul'

  // PRIORITY 1: Most important insight - Balance or Synergy
  if (imbalance > 12) {
    // Show balance opportunity for significant imbalances
    insights.push({
      id: 'balance_opportunity',
      type: 'opportunity',
      title: 'Pillar Balance Opportunity',
      message: `Your ${dominantPillar} pillar is your strength! Use it to boost your ${weakestPillar} pillar for better overall wellness.`,
      pillarsAffected: [dominantPillar, weakestPillar] as ('mind' | 'body' | 'soul')[],
      confidenceScore: 0.85,
      actionable: true,
      suggestedAction: getBalanceAction(dominantPillar, weakestPillar),
      icon: '⚖️'
    })
  } else if (body > 80 && mind < 80) {
    // Show body-mind synergy for good fitness
    insights.push({
      id: 'body_mind_synergy',
      type: 'boost',
      title: 'Fitness → Mental Clarity',
      message: 'Your fitness routine is strong! Add meditation after workouts to supercharge your mental clarity.',
      pillarsAffected: ['body', 'mind'],
      confidenceScore: 0.85,
      actionable: true,
      suggestedAction: 'Try 5 minutes of meditation after your next workout',
      icon: '🧘‍♂️'
    })
  } else if (mind > 75 && soul < 75) {
    // Show mind-soul connection for good mental health
    insights.push({
      id: 'mind_soul_connection',
      type: 'boost',
      title: 'Mental Focus → Inner Peace',
      message: 'Your mental clarity is developing! Channel this focus into gratitude practice for deeper fulfillment.',
      pillarsAffected: ['mind', 'soul'],
      confidenceScore: 0.80,
      actionable: true,
      suggestedAction: 'Start a daily gratitude practice',
      icon: '🙏'
    })
  }

  // PRIORITY 2: Achievement or momentum (only if scores are good)
  if (Math.min(mind, body, soul) > 70 && insights.length < 2) {
    insights.push({
      id: 'balanced_wellness',
      type: 'achievement',
      title: 'Balanced Wellness Journey',
      message: 'All three pillars are developing well! You\'re building true holistic wellness.',
      pillarsAffected: ['mind', 'body', 'soul'],
      confidenceScore: 0.90,
      actionable: false,
      icon: '🌟'
    })
  }

  // PRIORITY 3: Trend insight (only if we have less than 2 insights)
  const recentTrends = calculateRecentTrends(wellnessState.trends)
  if (recentTrends.improving.length >= 2 && insights.length < 2) {
    insights.push({
      id: 'upward_momentum',
      type: 'boost',
      title: 'Upward Momentum',
      message: `Your ${recentTrends.improving.join(' and ')} pillars are trending up! Keep this positive momentum going.`,
      pillarsAffected: recentTrends.improving as ('mind' | 'body' | 'soul')[],
      confidenceScore: 0.82,
      actionable: true,
      suggestedAction: 'Maintain your current healthy practices',
      icon: '📈'
    })
  }

  // Limit to maximum 2 insights for clean UI
  return insights.slice(0, 2)
}

// Helper function to suggest balance actions - SINGLE DECLARATION
const getBalanceAction = (strong: string, weak: string): string => {
  const actions: { [key: string]: string } = {
    'mind_body': 'Use your mental focus to establish a consistent exercise routine',
    'mind_soul': 'Apply your concentration skills to meditation or gratitude practice',
    'body_mind': 'Add mindfulness to your workouts - try yoga or mindful running',
    'body_soul': 'Connect with nature during your physical activities',
    'soul_mind': 'Use your spiritual insights to develop mental clarity practices',
    'soul_body': 'Honor your body through gentle, mindful movement'
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