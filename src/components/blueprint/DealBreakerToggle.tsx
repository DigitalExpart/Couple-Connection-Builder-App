import { motion } from 'motion/react';
import { Shield, X } from 'lucide-react';

interface DealBreakerToggleProps {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
  label: string;
  description?: string;
}

export function DealBreakerToggle({ isOn, onChange, label, description }: DealBreakerToggleProps) {
  return (
    <div className="space-y-4">
      {/* Question Context */}
      <div className="text-center p-4 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-1">{label}</h4>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>

      {/* Toggle with Clear Labels */}
      <div className="flex items-center justify-between gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200">
        <div className="flex-1 text-left">
          <p className={`font-medium transition-colors ${!isOn ? 'text-gray-900' : 'text-gray-400'}`}>
            Not a Deal-Breaker
          </p>
          <p className={`text-sm transition-colors ${!isOn ? 'text-gray-600' : 'text-gray-400'}`}>
            I'm okay with this
          </p>
        </div>

        <motion.button
          onClick={() => onChange(!isOn)}
          className={`
            relative w-20 h-10 rounded-full transition-all flex items-center shadow-lg
            ${isOn ? 'bg-[#FF6A6A]' : 'bg-gray-300'}
          `}
          whileTap={{ scale: 0.95 }}
          animate={isOn ? { boxShadow: '0 0 20px rgba(255, 106, 106, 0.5)' } : {}}
        >
          {/* Thumb */}
          <motion.div
            className="absolute w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
            animate={{
              x: isOn ? 44 : 4
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isOn ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-4 h-4 text-[#FF6A6A]" />
              </motion.div>
            ) : (
              <X className="w-4 h-4 text-gray-400" />
            )}
          </motion.div>
        </motion.button>

        <div className="flex-1 text-right">
          <p className={`font-medium transition-colors ${isOn ? 'text-[#FF6A6A]' : 'text-gray-400'}`}>
            Deal-Breaker
          </p>
          <p className={`text-sm transition-colors ${isOn ? 'text-[#FF6A6A]' : 'text-gray-400'}`}>
            I won't compromise
          </p>
        </div>
      </div>
    </div>
  );
}