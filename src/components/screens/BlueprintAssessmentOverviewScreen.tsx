import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { ProgressBar } from '../blueprint/ProgressBar';
import { CategoryIcon } from '../blueprint/CategoryIcon';

interface AssessmentCategory {
  id: string;
  name: string;
  categoryType: 'values' | 'lifestyle' | 'deal-breakers' | 'relationship-goals' | 'communication' | 'preferences' | 'personality' | 'career' | 'family' | 'location';
  questionsCount: number;
  completed: boolean;
  color: string;
}

interface BlueprintAssessmentOverviewScreenProps {
  onStart: () => void;
  onBack: () => void;
  progress: number; // 0-100
  categories: AssessmentCategory[];
}

export function BlueprintAssessmentOverviewScreen({
  onStart,
  onBack,
  progress,
  categories
}: BlueprintAssessmentOverviewScreenProps) {
  const completedCount = categories.filter(c => c.completed).length;

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
          >
            <h1 className="text-3xl mb-3">Assessment Overview</h1>
            <p className="text-lg text-white/80">
              {completedCount} of {categories.length} categories completed
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <ProgressBar progress={progress} showLabel />
        </div>
      </div>

      {/* Category List */}
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={onStart}
              className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Category Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <CategoryIcon type={category.categoryType} color={category.color} size={28} />
                </div>

                {/* Category Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    {category.questionsCount} questions
                  </p>
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {category.completed ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#34D399]" />
                    </motion.div>
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300 group-hover:text-[#A79BC8] transition-colors" />
                  )}
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <div className="max-w-2xl mx-auto">
          <BlueprintButton
            onClick={onStart}
            variant="primary"
            fullWidth
          >
            {progress > 0 ? 'Continue Assessment' : 'Start Assessment'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </BlueprintButton>
        </div>
      </div>
    </div>
  );
}
