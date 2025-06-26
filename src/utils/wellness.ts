export function calculateWellnessScore(mind: number, body: number, soul: number): number {
  // Weighted average: Mind 30%, Body 40%, Soul 30%
  return Math.round(mind * 0.3 + body * 0.4 + soul * 0.3)
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export function getScoreMessage(score: number): string {
  if (score >= 80) return 'Excellent! Keep it up!'
  if (score >= 60) return 'Good progress, room to grow'
  return 'Time to focus on your wellness'
}