import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
}

export function ScoreCircle({ 
  score, 
  size = 'lg', 
  showLabel = true, 
  label,
  animate = true 
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  const sizes = {
    sm: { width: 80, stroke: 6, text: 'text-2xl', label: 'text-xs' },
    md: { width: 120, stroke: 8, text: 'text-4xl', label: 'text-sm' },
    lg: { width: 160, stroke: 10, text: 'text-6xl', label: 'text-base' },
    xl: { width: 200, stroke: 12, text: 'text-7xl', label: 'text-lg' }
  };

  const { width, stroke, text: textClass, label: labelClass } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  // Gradient color based on score
  const getGradient = () => {
    if (score >= 80) return ['#10B981', '#34D399']; // Green
    if (score >= 60) return ['#3B82F6', '#60A5FA']; // Blue
    if (score >= 40) return ['#F59E0B', '#FBBF24']; // Amber
    if (score >= 20) return ['#F97316', '#FB923C']; // Orange
    return ['#EF4444', '#F87171']; // Red
  };

  const [color1, color2] = getGradient();

  useEffect(() => {
    if (!animate) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = score / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setDisplayScore(Math.min(Math.round(currentStep * stepValue), score));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score, animate]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={width} height={width}>
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="#F4F4F6"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={`url(#gradient-${score})`}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`${textClass} bg-gradient-to-br from-[#3C2B63] to-[#5A4180] bg-clip-text text-transparent`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {displayScore}
          </motion.div>
        </div>
      </div>

      {/* Label */}
      {showLabel && label && (
        <motion.p
          className={`${labelClass} text-gray-600 mt-3 text-center`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}
