// src/components/CrossPillarInsights.tsx
'use client'
import { useState, useEffect } from 'react'
import { CrossPillarInsight, WellnessState, generateCrossPillarInsights } from '@/utils/pillarConnections'

interface CrossPillarInsightsProps {
  wellnessState: WellnessState
  isMinimized?: boolean
}

export default function CrossPillarInsights({ wellnessState, isMinimized = false }: CrossPillarInsightsProps) {
  const [insights, setInsights] = useState<CrossPillarInsight[]>([])
  const [selectedInsight, setSelectedInsight] = useState<CrossPillarInsight | null>(null)

  useEffect(() => {
    const generatedInsights = generateCrossPillarInsights(wellnessState)
    setInsights(generatedInsights)
  }, [wellnessState])

  if (insights.length === 0) return null

  if (isMinimized) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{insights[0].icon}</span>
            <span className="text-sm font-medium text-gray-800">{insights[0].title}</span>
          </div>
          <span className="text-xs text-blue-600 font-medium">
            {insights.length} insight{insights.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Pillar Connections</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          AI Insights
        </div>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard 
            key={insight.id} 
            insight={insight}
            onClick={() => setSelectedInsight(insight)}
          />
        ))}
      </div>

      {/* Detailed insight modal */}
      {selectedInsight && (
        <InsightModal 
          insight={selectedInsight}
          onClose={() => setSelectedInsight(null)}
        />
      )}
    </div>
  )
}

// Individual insight card component
function InsightCard({ insight, onClick }: { 
  insight: CrossPillarInsight
  onClick: () => void 
}) {
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'boost': return 'from-green-500/10 to-emerald-500/10 border-green-200/50'
      case 'warning': return 'from-red-500/10 to-orange-500/10 border-red-200/50'
      case 'opportunity': return 'from-blue-500/10 to-purple-500/10 border-blue-200/50'
      case 'achievement': return 'from-yellow-500/10 to-orange-500/10 border-yellow-200/50'
      default: return 'from-gray-500/10 to-gray-500/10 border-gray-200/50'
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case 'boost': return 'text-green-700'
      case 'warning': return 'text-red-700'
      case 'opportunity': return 'text-blue-700'
      case 'achievement': return 'text-yellow-700'
      default: return 'text-gray-700'
    }
  }

  return (
    <div 
      className={`bg-gradient-to-r ${getInsightColor(insight.type)} backdrop-blur-sm rounded-xl p-4 border cursor-pointer active:scale-98 transition-all`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{insight.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold ${getTextColor(insight.type)}`}>
              {insight.title}
            </h4>
            <div className="flex space-x-1">
              {insight.pillarsAffected.map((pillar) => (
                <span key={pillar} className="text-xs">
                  {pillar === 'mind' ? '🧠' : pillar === 'body' ? '💪' : '✨'}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {insight.message}
          </p>
          {insight.actionable && insight.suggestedAction && (
            <div className="mt-2 text-xs text-gray-500 italic">
              💡 {insight.suggestedAction}
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-500">
                {Math.round(insight.confidenceScore * 100)}% confident
              </span>
            </div>
            <span className="text-xs text-gray-400">Tap for details</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Detailed insight modal
function InsightModal({ insight, onClose }: {
  insight: CrossPillarInsight
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{insight.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800">
                {insight.title}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">How your pillars connect:</h4>
              <p className="text-gray-600 leading-relaxed">
                {insight.message}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Affects:</span>
              <div className="flex space-x-2">
                {insight.pillarsAffected.map((pillar) => (
                  <div key={pillar} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                    <span className="text-sm">
                      {pillar === 'mind' ? '🧠' : pillar === 'body' ? '💪' : '✨'}
                    </span>
                    <span className="text-xs font-medium capitalize">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {insight.actionable && insight.suggestedAction && (
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-medium text-blue-800 mb-2">Suggested Action:</h4>
                <p className="text-blue-700 text-sm">
                  {insight.suggestedAction}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Confidence: {Math.round(insight.confidenceScore * 100)}%</span>
              <span className="capitalize">{insight.type} insight</span>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium active:scale-95 transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Real-time connection indicator
export function PillarConnectionIndicator({ 
  sourcePillar, 
  targetPillar, 
  impact 
}: { 
  sourcePillar: 'mind' | 'body' | 'soul'
  targetPillar: 'mind' | 'body' | 'soul'
  impact: number 
}) {
  const getIcon = (pillar: string) => {
    return pillar === 'mind' ? '🧠' : pillar === 'body' ? '💪' : '✨'
  }

  const getImpactColor = (impact: number) => {
    if (impact > 0) return 'text-green-600'
    if (impact < 0) return 'text-red-600'
    return 'text-gray-400'
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span>{getIcon(sourcePillar)}</span>
      <span className="text-gray-400">→</span>
      <span>{getIcon(targetPillar)}</span>
      <span className={`font-medium ${getImpactColor(impact)}`}>
        {impact > 0 ? '+' : ''}{impact}
      </span>
    </div>
  )
}