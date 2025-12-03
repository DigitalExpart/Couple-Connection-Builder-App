import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  variant?: 'default' | 'gradient';
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  progress, 
  showPercentage = true,
  variant = 'gradient',
  height = 'md'
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const variantClasses = {
    default: 'bg-[#A79BC8]',
    gradient: 'bg-gradient-to-r from-[#3C2B63] via-[#A79BC8] to-[#FFD88A]'
  };

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-bold text-[#3C2B63]">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-[#F4F4F6] rounded-full overflow-hidden ${heightClasses[height]}`}>
        <motion.div
          className={`${heightClasses[height]} ${variantClasses[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
