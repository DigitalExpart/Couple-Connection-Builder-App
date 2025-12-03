import { ArrowLeft, Sparkles, Share2, Eye, Target, Heart, Home, MessageCircle, Shield, Star, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { BlueprintCard } from '../blueprint/BlueprintCard';

interface BlueprintHomeScreenProps {
  onStartAssessment: () => void;
  onViewBlueprint: () => void;
  onShareBlueprint: () => void;
  onBack: () => void;
  hasBlueprint: boolean;
}

const categories = [
  { id: 'values', name: 'Core Values', icon: Star, color: '#FFD88A' },
  { id: 'lifestyle', name: 'Lifestyle', icon: Home, color: '#A79BC8' },
  { id: 'deal-breakers', name: 'Deal-Breakers', icon: Shield, color: '#FF6A6A' },
  { id: 'communication', name: 'Communication', icon: MessageCircle, color: '#60A5FA' },
  { id: 'preferences', name: 'Preferences', icon: Heart, color: '#F472B6' },
  { id: 'personality', name: 'Personality', icon: Users, color: '#A78BFA' }
];

export function BlueprintHomeScreen({ 
  onStartAssessment, 
  onViewBlueprint, 
  onShareBlueprint,
  onBack,
  hasBlueprint 
}: BlueprintHomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white">
        <div className="px-6 pt-6 pb-8">
          <button onClick={onBack} className="mb-4 text-white/80 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Target className="w-10 h-10 text-[#FFD88A]" />
            </motion.div>
            
            <h1 className="text-3xl mb-3">
              Build Your Match Blueprint™
            </h1>
            <p className="text-lg text-white/80 max-w-md mx-auto">
              Understand what you want before choosing who you want
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">
        {/* Action Cards */}
        <div className="space-y-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <BlueprintCard variant="elevated" className="cursor-pointer" onClick={onStartAssessment}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3C2B63] to-[#5A4180] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#FFD88A]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">
                    {hasBlueprint ? 'Retake Assessment' : 'Start Self-Assessment'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {hasBlueprint 
                      ? 'Update your match preferences and values' 
                      : 'Answer 20 questions to build your blueprint'
                    }
                  </p>
                </div>
                <ArrowLeft className="w-5 h-5 text-[#A79BC8] rotate-180" />
              </div>
            </BlueprintCard>
          </motion.div>

          {hasBlueprint && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <BlueprintCard variant="glass" className="cursor-pointer" onClick={onViewBlueprint}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#A79BC8]/20 rounded-2xl flex items-center justify-center">
                      <Eye className="w-7 h-7 text-[#3C2B63]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">View My Blueprint</h3>
                      <p className="text-sm text-gray-600">See your complete match profile</p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-[#A79BC8] rotate-180" />
                  </div>
                </BlueprintCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <BlueprintCard variant="glass" className="cursor-pointer" onClick={onShareBlueprint}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#FFD88A]/20 rounded-2xl flex items-center justify-center">
                      <Share2 className="w-7 h-7 text-[#FFD88A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">Share My Blueprint</h3>
                      <p className="text-sm text-gray-600">Let matches see your ideal partner profile</p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-[#A79BC8] rotate-180" />
                  </div>
                </BlueprintCard>
              </motion.div>
            </>
          )}
        </div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl text-gray-900 mb-4">What You'll Discover</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: category.color }} />
                  </div>
                  <p className="text-xs text-gray-700">{category.name}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <BlueprintCard variant="glass" accentColor="purple">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#3C2B63] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#FFD88A]" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">Why Build a Blueprint?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD88A] mt-1">•</span>
                    <span>Clarity on what truly matters in a relationship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD88A] mt-1">•</span>
                    <span>Pre-screen compatibility before investing time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD88A] mt-1">•</span>
                    <span>Share with matches to align expectations early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD88A] mt-1">•</span>
                    <span>Make better dating decisions with self-awareness</span>
                  </li>
                </ul>
              </div>
            </div>
          </BlueprintCard>
        </motion.div>
      </div>
    </div>
  );
}
