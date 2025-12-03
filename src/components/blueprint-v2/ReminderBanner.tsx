import { motion } from 'motion/react';
import { AlertCircle, X, ArrowRight } from 'lucide-react';

interface ReminderBannerProps {
  progress: number;
  onContinue: () => void;
  onDismiss: () => void;
}

export function ReminderBanner({ progress, onContinue, onDismiss }: ReminderBannerProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="blueprint-slide-down bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] text-white shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            
            <div className="flex-1">
              <p className="font-medium mb-2">
                Your Match Blueprint is {progress}% complete
              </p>
              
              {/* Progress Bar */}
              <div className="w-full max-w-xs h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onContinue}
              className="px-5 py-2.5 bg-white text-[#3C2B63] rounded-xl font-medium hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Continue Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={onDismiss}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
