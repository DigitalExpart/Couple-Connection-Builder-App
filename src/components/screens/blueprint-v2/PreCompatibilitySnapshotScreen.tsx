import { motion } from 'motion/react';
import { ArrowRight, Save, Heart, Users, Target, Zap, AlertTriangle } from 'lucide-react';
import { ScoreCircle } from '../../blueprint-v2/ScoreCircle';
import { ComparisonResultCard } from '../../blueprint-v2/ComparisonResultCard';
import { RedFlagMeter } from '../../blueprint-v2/RedFlagMeter';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';

interface CompatibilityData {
  overallScore: number;
  mindsetAlignment: number;
  lifestyleFit: number;
  relationshipExpectations: number;
  personalityMatch: number;
  dealBreakerClashScore: number;
  redFlags?: Array<{ severity: 'low' | 'medium' | 'high'; description: string }>;
  alignedValues?: string[];
  conflictAreas?: string[];
}

interface PreCompatibilitySnapshotScreenProps {
  userAName: string;
  userBName: string;
  compatibilityData: CompatibilityData;
  onRunFullScan: () => void;
  onSaveComparison: () => void;
  onBack: () => void;
}

export function PreCompatibilitySnapshotScreen({
  userAName,
  userBName,
  compatibilityData,
  onRunFullScan,
  onSaveComparison,
  onBack
}: PreCompatibilitySnapshotScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3C2B63] mb-3">
            Compatibility Snapshot
          </h1>
          <p className="text-lg text-gray-600">
            {userAName} × {userBName}
          </p>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="blueprint-frosted rounded-3xl p-8 text-center mb-8 shadow-xl"
        >
          <h2 className="text-xl font-bold text-[#3C2B63] mb-6">
            Overall Compatibility
          </h2>
          
          <div className="flex justify-center">
            <ScoreCircle score={compatibilityData.overallScore} size={200} />
          </div>

          <p className="text-gray-600 mt-6">
            Based on your Match Blueprints™, you have{' '}
            <strong className="text-[#3C2B63]">
              {compatibilityData.overallScore >= 75 ? 'strong' : 
               compatibilityData.overallScore >= 60 ? 'moderate' : 'limited'}
            </strong>{' '}
            compatibility potential
          </p>
        </motion.div>

        {/* Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-[#3C2B63] mb-6">
            Compatibility Breakdown
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ComparisonResultCard
              title="Mindset Alignment"
              score={compatibilityData.mindsetAlignment}
              icon={<Heart className="w-4 h-4 text-white" />}
              description="How similarly you think about relationships"
            />
            
            <ComparisonResultCard
              title="Lifestyle Fit"
              score={compatibilityData.lifestyleFit}
              icon={<Target className="w-4 h-4 text-white" />}
              description="Daily habits and routine compatibility"
            />
            
            <ComparisonResultCard
              title="Relationship Expectations"
              score={compatibilityData.relationshipExpectations}
              icon={<Users className="w-4 h-4 text-white" />}
              description="Alignment on relationship goals"
            />
            
            <ComparisonResultCard
              title="Personality Match"
              score={compatibilityData.personalityMatch}
              icon={<Zap className="w-4 h-4 text-white" />}
              description="How well your personalities complement"
            />
          </div>
        </motion.div>

        {/* Red Flag Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <RedFlagMeter 
            score={compatibilityData.dealBreakerClashScore}
            label="Deal-Breaker Clash Score"
          />
        </motion.div>

        {/* Aligned Values & Conflicts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Aligned Values */}
          {compatibilityData.alignedValues && compatibilityData.alignedValues.length > 0 && (
            <div className="blueprint-frosted rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-[#3C2B63]">Aligned Values</h3>
              </div>
              <div className="space-y-2">
                {compatibilityData.alignedValues.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conflict Areas */}
          {compatibilityData.conflictAreas && compatibilityData.conflictAreas.length > 0 && (
            <div className="blueprint-frosted rounded-2xl p-6 border-l-4 border-amber-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-[#3C2B63]">Areas to Discuss</h3>
              </div>
              <div className="space-y-2">
                {compatibilityData.conflictAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <BlueprintButton
            variant="gradient"
            fullWidth
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={onRunFullScan}
          >
            Run Full MatchIQ Scan
          </BlueprintButton>

          <BlueprintButton
            variant="lavender-outline"
            fullWidth
            size="lg"
            icon={<Save className="w-5 h-5" />}
            onClick={onSaveComparison}
          >
            Save Comparison
          </BlueprintButton>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8 p-6 bg-gradient-to-br from-[#F4F4F6] to-white rounded-2xl"
        >
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> A full MatchIQ Scan includes in-depth questions and real-time interaction analysis 
            for the most accurate compatibility assessment.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
