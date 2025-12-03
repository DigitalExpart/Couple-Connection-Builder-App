import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface RedFlagMeterProps {
  score: number; // 0-100, lower is better
  flags?: Array<{ severity: 'low' | 'medium' | 'high'; description: string }>;
  showDetails?: boolean;
}

export function RedFlagMeter({ score, flags = [], showDetails = false }: RedFlagMeterProps) {
  const getSeverityColor = (score: number) => {
    if (score <= 25) return { bg: '#34D399', text: '#059669', label: 'Low Risk' };
    if (score <= 50) return { bg: '#FFD88A', text: '#F59E0B', label: 'Moderate' };
    if (score <= 75) return { bg: '#FB923C', text: '#EA580C', label: 'Elevated' };
    return { bg: '#FF6A6A', text: '#DC2626', label: 'High Risk' };
  };

  const { bg, text, label } = getSeverityColor(score);

  return (
    <div className="space-y-4">
      {/* Meter Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div
              animate={score > 50 ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle 
                className="w-5 h-5" 
                style={{ color: text }}
              />
            </motion.div>
            <span className="text-sm text-gray-700">Deal-Breaker Clash Score</span>
          </div>
          <span 
            className="text-sm px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: `${bg}20`,
              color: text
            }}
          >
            {label}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ 
              width: `${score}%`,
              boxShadow: score > 50 
                ? `0 0 16px ${bg}80, 0 0 8px ${bg}40`
                : 'none'
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              boxShadow: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            style={{ backgroundColor: bg }}
          >
            {/* Shimmer effect for high scores */}
            {score > 50 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0% - Perfect</span>
          <span>100% - Critical</span>
        </div>
      </div>

      {/* Flag Details */}
      {showDetails && flags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <h4 className="text-sm text-gray-700">Detected Issues:</h4>
          {flags.map((flag, index) => {
            const flagColor = flag.severity === 'high' 
              ? '#FF6A6A' 
              : flag.severity === 'medium' 
              ? '#FFD88A' 
              : '#A79BC8';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ backgroundColor: `${flagColor}15` }}
              >
                <motion.div
                  animate={flag.severity === 'high' ? {
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <AlertTriangle 
                    className="w-4 h-4 flex-shrink-0 mt-0.5" 
                    style={{ color: flagColor }}
                  />
                </motion.div>
                <div>
                  <p className="text-xs" style={{ color: flagColor }}>
                    {flag.severity.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-700 mt-0.5">{flag.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
