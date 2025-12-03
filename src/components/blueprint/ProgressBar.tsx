import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ 
  progress, 
  showPercentage = true, 
  height = 'md',
  className = '' 
}: ProgressBarProps) {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        {showPercentage && (
          <span className="text-sm text-[#3C2B63]">{Math.round(progress)}%</span>
        )}
      </div>
      <div className={`w-full ${heights[height]} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          className="h-full bg-gradient-to-r from-[#3C2B63] via-[#A79BC8] to-[#FFD88A] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
