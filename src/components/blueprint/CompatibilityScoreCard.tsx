import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CompatibilityScoreCardProps {
  title: string;
  score: number; // 0-100
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function CompatibilityScoreCard({ 
  title, 
  score, 
  icon: Icon, 
  color,
  delay = 0 
}: CompatibilityScoreCardProps) {
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{getScoreLabel(score)}</p>
        </div>
      </div>

      {/* Score Ring */}
      <div className="relative">
        {/* Background Ring */}
        <svg className="w-full" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#F4F4F6"
            strokeWidth="8"
          />
          
          {/* Animated Score Ring */}
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={2 * Math.PI * 50}
            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 50 * (1 - score / 100),
            }}
            transition={{ 
              duration: 1.5, 
              delay: delay + 0.2,
              ease: "easeOut" 
            }}
            transform="rotate(-90 60 60)"
            style={{
              filter: score >= 70 ? `drop-shadow(0 0 6px ${color}60)` : 'none'
            }}
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5, type: "spring" }}
            className="text-center"
          >
            <p className="text-3xl" style={{ color }}>
              {score}
            </p>
            <p className="text-xs text-gray-500">out of 100</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
