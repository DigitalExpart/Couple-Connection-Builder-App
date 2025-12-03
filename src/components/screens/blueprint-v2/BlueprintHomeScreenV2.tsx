import { motion } from 'motion/react';
import { ArrowRight, Heart, Users, Shield, Star, Home, Sparkles, Eye, Share2 } from 'lucide-react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';
import { CategoryIcon } from '../../blueprint-v2/CategoryIcon';

interface BlueprintHomeScreenV2Props {
  onStartAssessment: () => void;
  onViewBlueprint: () => void;
  onShareBlueprint: () => void;
  onBack: () => void;
  hasBlueprint: boolean;
}

export function BlueprintHomeScreenV2({
  onStartAssessment,
  onViewBlueprint,
  onShareBlueprint,
  onBack,
  hasBlueprint
}: BlueprintHomeScreenV2Props) {
  const categories = [
    { name: 'Values', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { name: 'Lifestyle', icon: Home, color: 'from-purple-500 to-indigo-500' },
    { name: 'Deal-Breakers', icon: Shield, color: 'from-red-500 to-orange-500' },
    { name: 'Preferences', icon: Star, color: 'from-amber-500 to-yellow-500' },
    { name: 'Nice-to-Haves', icon: Sparkles, color: 'from-teal-500 to-cyan-500' },
    { name: 'Relationships', icon: Users, color: 'from-violet-500 to-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#3C2B63] mb-4">
            Build Your Match Blueprint™
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understand what you want before choosing who you want.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto space-y-4 mb-16"
        >
          {!hasBlueprint ? (
            <BlueprintButton
              variant="gradient"
              fullWidth
              size="lg"
              icon={<ArrowRight className="w-6 h-6" />}
              onClick={onStartAssessment}
            >
              Start Self-Assessment
            </BlueprintButton>
          ) : (
            <>
              <BlueprintButton
                variant="gradient"
                fullWidth
                size="lg"
                icon={<Eye className="w-6 h-6" />}
                onClick={onViewBlueprint}
              >
                View My Blueprint
              </BlueprintButton>
              
              <BlueprintButton
                variant="lavender-outline"
                fullWidth
                size="lg"
                icon={<Share2 className="w-6 h-6" />}
                onClick={onShareBlueprint}
              >
                Share My Blueprint
              </BlueprintButton>
              
              <BlueprintButton
                variant="ghost"
                fullWidth
                size="lg"
                onClick={onStartAssessment}
              >
                Retake Assessment
              </BlueprintButton>
            </>
          )}
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#3C2B63] text-center mb-8">
            What We'll Explore
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="blueprint-frosted rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-medium text-[#3C2B63]">{category.name}</h3>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 blueprint-frosted rounded-2xl p-8 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-[#3C2B63] mb-3">
            Why Create Your Blueprint?
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>✨ Get clarity on what you truly want in a relationship</p>
            <p>🎯 Make better dating decisions with confidence</p>
            <p>💫 Share your blueprint to find compatible matches</p>
            <p>🔍 Run compatibility scans with potential partners</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
