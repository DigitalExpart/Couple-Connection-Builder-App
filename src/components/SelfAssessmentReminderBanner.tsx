import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SelfAssessmentReminderBannerProps {
  progress: number; // 0-100
  onComplete: () => void;
  onDismiss: () => void;
}

export function SelfAssessmentReminderBanner({ 
  progress, 
  onComplete, 
  onDismiss 
}: SelfAssessmentReminderBannerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm">
                  Complete your Match Blueprint™ to unlock full scanning capabilities
                </p>
                {progress > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-white h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs whitespace-nowrap">{Math.round(progress)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onComplete}
                className="px-4 py-2 bg-white text-[#3C2B63] rounded-lg text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                {progress > 0 ? 'Continue' : 'Start Now'}
              </button>
              <button
                onClick={onDismiss}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
