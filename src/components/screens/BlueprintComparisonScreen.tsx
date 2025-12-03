import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { BlueprintCard } from '../blueprint/BlueprintCard';
import { ScoreCircle } from '../blueprint/ScoreCircle';
import { CategoryIcon } from '../blueprint/CategoryIcon';

interface BlueprintComparisonScreenProps {
  onBack: () => void;
  onRunFullScan: () => void;
  userAName: string;
  userBName: string;
  compatibilityData: CompatibilityData;
}

export interface CompatibilityData {
  overallScore: number;
  mindsetAlignment: number;
  lifestylefit: number;
  relationshipExpectations: number;
  personalityMatch: number;
  dealBreakerClashScore: number;
  redFlags: RedFlag[];
  alignedValues: string[];
  conflictAreas: string[];
}

interface RedFlag {
  severity: 'high' | 'medium' | 'low';
  description: string;
}

export function BlueprintComparisonScreen({
  onBack,
  onRunFullScan,
  userAName,
  userBName,
  compatibilityData
}: BlueprintComparisonScreenProps) {
  const getCategoryColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getCategoryBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-amber-100';
    return 'bg-red-100';
  };

  const getIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-5 h-5" />;
    if (score >= 40) return <Minus className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  const getOverallAssessment = (score: number) => {
    if (score >= 80) return { text: 'Excellent Match', color: 'emerald', icon: '💚' };
    if (score >= 70) return { text: 'Strong Potential', color: 'blue', icon: '💙' };
    if (score >= 60) return { text: 'Good Compatibility', color: 'cyan', icon: '💛' };
    if (score >= 40) return { text: 'Moderate Match', color: 'amber', icon: '🧡' };
    return { text: 'Low Compatibility', color: 'red', icon: '❤️‍🩹' };
  };

  const assessment = getOverallAssessment(compatibilityData.overallScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 text-white/80 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl mb-2">Compatibility Snapshot</h1>
          <p className="text-white/80">{userAName} × {userBName}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <BlueprintCard variant="elevated">
            <div className="text-center py-6">
              <ScoreCircle 
                score={compatibilityData.overallScore} 
                size="xl"
                label="Overall Compatibility"
              />
              <div className="mt-6">
                <div className="text-4xl mb-2">{assessment.icon}</div>
                <h3 className="text-2xl text-gray-900 mb-2">{assessment.text}</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Based on your Match Blueprints, you have {assessment.text.toLowerCase()} potential
                </p>
              </div>
            </div>
          </BlueprintCard>
        </motion.div>

        {/* Sub-Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl text-gray-900 mb-4">Detailed Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Mindset Alignment', score: compatibilityData.mindsetAlignment, category: 'values' as const },
              { label: 'Lifestyle Fit', score: compatibilityData.lifestylefit, category: 'lifestyle' as const },
              { label: 'Relationship Goals', score: compatibilityData.relationshipExpectations, category: 'relationship-goals' as const },
              { label: 'Personality Match', score: compatibilityData.personalityMatch, category: 'personality' as const }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <BlueprintCard variant="glass">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon category={item.category} size="sm" />
                      <div>
                        <p className="text-sm text-gray-900">{item.label}</p>
                        <div className={`flex items-center gap-1 text-xs ${getCategoryColor(item.score)}`}>
                          {getIcon(item.score)}
                          <span>{item.score}%</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-16 h-16 ${getCategoryBg(item.score)} rounded-xl flex items-center justify-center`}>
                      <span className={`text-2xl ${getCategoryColor(item.score)}`}>
                        {item.score}
                      </span>
                    </div>
                  </div>
                </BlueprintCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deal-Breaker Clash Score */}
        {compatibilityData.dealBreakerClashScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <BlueprintCard variant="elevated" accentColor="red">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#FF6A6A]/20 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-[#FF6A6A]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">Deal-Breaker Alert</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                        style={{ width: `${compatibilityData.dealBreakerClashScore}%` }}
                      />
                    </div>
                    <span className="text-[#FF6A6A]">{compatibilityData.dealBreakerClashScore}%</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You have {compatibilityData.dealBreakerClashScore}% clash rate on non-negotiables. 
                    Consider discussing these areas early.
                  </p>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Red Flags */}
        {compatibilityData.redFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <h3 className="text-lg text-gray-900 mb-4">Areas of Concern</h3>
            <div className="space-y-3">
              {compatibilityData.redFlags.map((flag, index) => (
                <BlueprintCard 
                  key={index}
                  variant="glass"
                  accentColor={flag.severity === 'high' ? 'red' : flag.severity === 'medium' ? 'gold' : 'lavender'}
                >
                  <div className="flex items-start gap-3">
                    <XCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      flag.severity === 'high' ? 'text-[#FF6A6A]' : 
                      flag.severity === 'medium' ? 'text-[#FFD88A]' : 
                      'text-[#A79BC8]'
                    }`} />
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        flag.severity === 'high' ? 'bg-red-100 text-red-700' :
                        flag.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {flag.severity.toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-700 mt-2">{flag.description}</p>
                    </div>
                  </div>
                </BlueprintCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Aligned Values */}
        {compatibilityData.alignedValues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-8"
          >
            <h3 className="text-lg text-gray-900 mb-4">Shared Values</h3>
            <BlueprintCard variant="glass" accentColor="gold">
              <div className="flex flex-wrap gap-2">
                {compatibilityData.alignedValues.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {value}
                  </div>
                ))}
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Conflict Areas */}
        {compatibilityData.conflictAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-8"
          >
            <h3 className="text-lg text-gray-900 mb-4">Areas to Discuss</h3>
            <BlueprintCard variant="glass">
              <ul className="space-y-2">
                {compatibilityData.conflictAreas.map((area, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-3"
        >
          <BlueprintButton
            variant="primary"
            onClick={onRunFullScan}
            fullWidth
          >
            Run Full MatchIQ Scan Together
          </BlueprintButton>

          <BlueprintButton
            variant="secondary"
            onClick={onBack}
            fullWidth
          >
            Save Comparison
          </BlueprintButton>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8"
        >
          <BlueprintCard variant="glass" accentColor="purple">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                💡 <strong>Remember:</strong> This is a preliminary compatibility snapshot based on your Blueprints.
              </p>
              <p>
                For a complete assessment, run a full MatchIQ Scan where you evaluate real interactions and conversations.
              </p>
            </div>
          </BlueprintCard>
        </motion.div>
      </div>
    </div>
  );
}
