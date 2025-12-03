import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  animate?: boolean;
}

export function ScoreCircle({ 
  score, 
  size = 'md', 
  label,
  animate = true 
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);

  const sizes = {
    sm: { circle: 60, stroke: 4, text: 'text-lg' },
    md: { circle: 100, stroke: 6, text: 'text-2xl' },
    lg: { circle: 140, stroke: 8, text: 'text-4xl' },
    xl: { circle: 180, stroke: 10, text: 'text-5xl' }
  };

  const config = sizes[size];
  const radius = (config.circle - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (animate) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(current);
        }
      }, 20);
      return () => clearInterval(interval);
    } else {
      setDisplayScore(score);
    }
  }, [score, animate]);

  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return '#FFD88A'; // Warm Gold
    if (score >= 60) return '#A79BC8'; // Soft Lavender
    if (score >= 40) return '#FFD88A'; // Warm Gold
    return '#FF6A6A'; // Soft Red
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: config.circle, height: config.circle }}>
        {/* Background Circle */}
        <svg className="transform -rotate-90" width={config.circle} height={config.circle}>
          <circle
            cx={config.circle / 2}
            cy={config.circle / 2}
            r={radius}
            stroke="#F4F4F6"
            strokeWidth={config.stroke}
            fill="none"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx={config.circle / 2}
            cy={config.circle / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={config.stroke}
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: 'drop-shadow(0 0 8px rgba(255, 216, 138, 0.5))'
            }}
          />
        </svg>
        
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`${config.text} font-bold text-[#3C2B63]`}
          >
            {displayScore}%
          </motion.div>
        </div>
      </div>
      
      {label && (
        <p className="text-sm text-gray-600 text-center">{label}</p>
      )}
    </div>
  );
}
