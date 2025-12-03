import { Lock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AssessmentBlockedModalProps {
  progress: number; // 0-100
  onComplete: () => void;
  onCancel: () => void;
}

export function AssessmentBlockedModal({ 
  progress, 
  onComplete, 
  onCancel 
}: AssessmentBlockedModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
      >
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl text-gray-900 mb-3">
            Complete Your Match Blueprint™
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Before assessing others, we need to understand who you are. Your Match Blueprint™ helps us provide accurate compatibility insights.
          </p>

          {/* Progress */}
          {progress > 0 ? (
            <div className="bg-gradient-to-br from-[#F4F4F6] to-white rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-[#3C2B63]" />
                <p className="text-sm text-gray-700">You've already started!</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-gray-700">{Math.round(progress)}%</span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#F4F4F6] to-white rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                ⏱️ Takes about 5 minutes
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onComplete}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {progress > 0 ? 'Continue Blueprint' : 'Start My Blueprint'}
            </button>
            <button
              onClick={onCancel}
              className="w-full py-3 px-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
