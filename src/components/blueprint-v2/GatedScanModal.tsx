import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, X } from 'lucide-react';
import { BlueprintButton } from './BlueprintButton';
import { ProgressBar } from './ProgressBar';

interface GatedScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueAssessment: () => void;
  progress: number;
}

export function GatedScanModal({
  isOpen,
  onClose,
  onContinueAssessment,
  progress
}: GatedScanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-[#3C2B63] text-center mb-3"
              >
                Complete Your Blueprint First
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-center mb-6"
              >
                To unlock compatibility scanning, finish creating your Match Blueprint™. 
                This helps us provide accurate compatibility insights.
              </motion.p>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#F4F4F6] to-white rounded-2xl p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Your Progress
                  </span>
                  <span className="text-lg font-bold text-[#3C2B63]">
                    {Math.round(progress)}%
                  </span>
                </div>
                
                <ProgressBar progress={progress} />

                {progress > 0 && (
                  <p className="text-xs text-gray-600 mt-3 text-center">
                    Great start! You're {Math.round(progress)}% done. Keep going! 🎯
                  </p>
                )}
              </motion.div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 space-y-2"
              >
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Why complete your blueprint?
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8] mt-1.5 flex-shrink-0" />
                    <span>Get accurate compatibility scores with others</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8] mt-1.5 flex-shrink-0" />
                    <span>Understand what you truly want in a relationship</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8] mt-1.5 flex-shrink-0" />
                    <span>Share your blueprint with potential matches</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8] mt-1.5 flex-shrink-0" />
                    <span>Make better dating decisions with clarity</span>
                  </div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <BlueprintButton
                  variant="gradient"
                  fullWidth
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={onContinueAssessment}
                >
                  {progress > 0 ? 'Continue Blueprint' : 'Start My Blueprint'}
                </BlueprintButton>

                <button
                  onClick={onClose}
                  className="w-full py-3 text-gray-600 hover:text-[#3C2B63] transition-colors"
                >
                  Not Now
                </button>
              </motion.div>

              {/* Time Indicator */}
              {progress === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs text-center text-gray-500 mt-4"
                >
                  ⏱️ Takes about 5-7 minutes
                </motion.p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
