import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ComparisonResultCardProps {
  title: string;
  score: number;
  icon: ReactNode;
  description?: string;
}

export function ComparisonResultCard({
  title,
  score,
  icon,
  description
}: ComparisonResultCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-[#FFD88A] to-[#A79BC8]';
    return 'from-[#FF6A6A] to-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="blueprint-frosted rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] flex items-center justify-center">
            {icon}
          </div>
          <h4 className="font-medium text-[#3C2B63]">{title}</h4>
        </div>
        <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
          {score}%
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${getScoreColor(score)} rounded-full`}
        />
      </div>
      
      {description && (
        <p className="text-xs text-gray-600 mt-2">{description}</p>
      )}
    </motion.div>
  );
}
