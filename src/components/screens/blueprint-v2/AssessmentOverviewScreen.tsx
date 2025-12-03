import { motion } from 'motion/react';
import { ArrowRight, Heart, Shield, Star, Home, Users, Sparkles, Check } from 'lucide-react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';
import { ProgressBar } from '../../blueprint-v2/ProgressBar';

interface AssessmentOverviewScreenProps {
  onStart: () => void;
  onBack: () => void;
  progress?: number;
  completedCategories?: string[];
}

export function AssessmentOverviewScreen({
  onStart,
  onBack,
  progress = 0,
  completedCategories = []
}: AssessmentOverviewScreenProps) {
  const categories = [
    {
      id: 'non-negotiables',
      name: 'Non-Negotiables',
      icon: Shield,
      description: 'Your core must-haves',
      questions: 4,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'deal-breakers',
      name: 'Deal-Breakers',
      icon: Shield,
      description: 'What you absolutely won\'t compromise on',
      questions: 3,
      color: 'from-rose-500 to-red-500'
    },
    {
      id: 'relationship-values',
      name: 'Relationship Values',
      icon: Heart,
      description: 'What matters most to you',
      questions: 5,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'preferences',
      name: 'Preferences',
      icon: Star,
      description: 'Your ideal match qualities',
      questions: 4,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 'nice-to-haves',
      name: 'Nice-to-Haves',
      icon: Sparkles,
      description: 'Bonus qualities you appreciate',
      questions: 3,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle Choices',
      icon: Home,
      description: 'Daily habits and routines',
      questions: 4,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors flex items-center gap-2 mb-4"
          >
            ← Back
          </button>
          {progress > 0 && <ProgressBar progress={progress} />}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3C2B63] mb-3">
            Assessment Overview
          </h1>
          <p className="text-lg text-gray-600">
            {totalQuestions} questions across {categories.length} categories • About 5-7 minutes
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="space-y-4 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isCompleted = completedCategories.includes(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  blueprint-frosted rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer
                  ${isCompleted ? 'border-2 border-green-500' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    {isCompleted ? (
                      <Check className="w-7 h-7 text-white" />
                    ) : (
                      <Icon className="w-7 h-7 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#3C2B63]">
                        {category.name}
                      </h3>
                      {isCompleted && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Complete
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{category.description}</p>
                    <p className="text-xs text-gray-500">{category.questions} questions</p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-md mx-auto"
        >
          <BlueprintButton
            variant="gradient"
            fullWidth
            size="lg"
            icon={<ArrowRight className="w-6 h-6" />}
            onClick={onStart}
          >
            {progress > 0 ? 'Continue Assessment' : 'Begin Assessment'}
          </BlueprintButton>

          <p className="text-center text-sm text-gray-500 mt-4">
            💾 Your progress is automatically saved
          </p>
        </motion.div>
      </div>
    </div>
  );
}
