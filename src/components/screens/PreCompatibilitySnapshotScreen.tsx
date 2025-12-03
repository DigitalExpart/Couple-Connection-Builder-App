import { ArrowLeft, Heart, Brain, Home, MessageCircle, Users, Target, Save, Scan } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { CompatibilityScoreCard } from '../blueprint/CompatibilityScoreCard';
import { RedFlagMeter } from '../blueprint/RedFlagMeter';
import { ScoreCircle } from '../blueprint/ScoreCircle';

interface CompatibilityData {
  overallScore: number;
  mindsetAlignment: number;
  lifestyleFit: number;
  relationshipExpectations: number;
  personalityMatch: number;
  dealBreakerClashScore: number;
  redFlags: Array<{ severity: 'low' | 'medium' | 'high'; description: string }>;
  alignedValues: string[];
  conflictAreas: string[];
}

interface PreCompatibilitySnapshotScreenProps {
  onBack: () => void;
  onRunFullScan: () => void;
  onSaveComparison: () => void;
  userAName: string;
  userBName: string;
  compatibilityData: CompatibilityData;
}

export function PreCompatibilitySnapshotScreen({
  onBack,
  onRunFullScan,
  onSaveComparison,
  userAName,
  userBName,
  compatibilityData
}: PreCompatibilitySnapshotScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white">
        <div className="px-6 pt-6 pb-8">
          <button onClick={onBack} className="mb-6 text-white/80 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl mb-3">Pre-Compatibility Snapshot</h1>
            <p className="text-lg text-white/80">
              {userAName} & {userBName}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto pb-32">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="w-48 h-48 mx-auto mb-6">
              <ScoreCircle
                score={compatibilityData.overallScore}
                size={192}
                strokeWidth={16}
                color="#3C2B63"
                showAnimation
              />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">
              Overall Compatibility
            </h2>
            <p className="text-gray-600">
              {compatibilityData.overallScore >= 75 
                ? 'Excellent match potential!' 
                : compatibilityData.overallScore >= 60
                ? 'Good compatibility with some differences'
                : compatibilityData.overallScore >= 40
                ? 'Moderate compatibility, work needed'
                : 'Significant differences detected'}
            </p>
          </div>
        </motion.div>

        {/* Sub-Scores Grid */}
        <div className="mb-8">
          <h3 className="text-xl text-gray-900 mb-4">Compatibility Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            <CompatibilityScoreCard
              title="Mindset Alignment"
              score={compatibilityData.mindsetAlignment}
              icon={Brain}
              color="#3C2B63"
              delay={0.3}
            />
            <CompatibilityScoreCard
              title="Lifestyle Fit"
              score={compatibilityData.lifestyleFit}
              icon={Home}
              color="#A79BC8"
              delay={0.4}
            />
            <CompatibilityScoreCard
              title="Relationship Goals"
              score={compatibilityData.relationshipExpectations}
              icon={Heart}
              color="#F472B6"
              delay={0.5}
            />
            <CompatibilityScoreCard
              title="Personality Match"
              score={compatibilityData.personalityMatch}
              icon={Users}
              color="#60A5FA"
              delay={0.6}
            />
          </div>
        </div>

        {/* Red Flag Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl text-gray-900 mb-4">Risk Assessment</h3>
            <RedFlagMeter
              score={compatibilityData.dealBreakerClashScore}
              flags={compatibilityData.redFlags}
              showDetails
            />
          </div>
        </motion.div>

        {/* Aligned Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#34D399]" />
              Shared Values
            </h3>
            <div className="flex flex-wrap gap-2">
              {compatibilityData.alignedValues.map((value, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="px-4 py-2 bg-[#34D399]/10 text-[#059669] rounded-full text-sm"
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conflict Areas */}
        {compatibilityData.conflictAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#FFD88A]" />
                Areas to Discuss
              </h3>
              <div className="flex flex-wrap gap-2">
                {compatibilityData.conflictAreas.map((area, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                    className="px-4 py-2 bg-[#FFD88A]/10 text-[#B8860B] rounded-full text-sm"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <BlueprintButton
            onClick={onSaveComparison}
            variant="outline"
            fullWidth
          >
            <Save className="w-5 h-5 mr-2" />
            Save
          </BlueprintButton>
          <BlueprintButton
            onClick={onRunFullScan}
            variant="primary"
            fullWidth
          >
            <Scan className="w-5 h-5 mr-2" />
            Full MatchIQ Scan
          </BlueprintButton>
        </div>
      </div>
    </div>
  );
}
