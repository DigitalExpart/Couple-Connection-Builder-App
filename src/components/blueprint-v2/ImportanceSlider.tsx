import { motion } from 'motion/react';
import { useState } from 'react';

interface ImportanceSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  labels?: { low: string; medium: string; high: string };
  showGlow?: boolean;
}

export function ImportanceSlider({ 
  value, 
  onChange,
  labels = { low: 'Low', medium: 'Medium', high: 'High' },
  showGlow = true
}: ImportanceSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getImportanceLevel = () => {
    if (value < 33) return 'low';
    if (value < 67) return 'medium';
    return 'high';
  };

  const level = getImportanceLevel();
  const isHigh = value >= 67;

  return (
    <div className="w-full space-y-4">
      {/* Slider */}
      <div className="relative pt-2">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider-blueprint"
          style={{
            background: `linear-gradient(to right, 
              #3C2B63 0%, 
              #A79BC8 ${value / 2}%, 
              ${isHigh ? '#FFD88A' : '#A79BC8'} ${value}%, 
              #F4F4F6 ${value}%, 
              #F4F4F6 100%)`
          }}
        />
        
        {/* Gold Glow Effect at High Importance */}
        {showGlow && isHigh && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: 'blur(10px)',
              background: `radial-gradient(circle at ${value}% 50%, rgba(255, 216, 138, 0.8), transparent 60%)`
            }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between text-sm">
        <motion.span
          className={`${level === 'low' ? 'text-[#3C2B63] font-bold' : 'text-gray-500'}`}
          animate={{ scale: level === 'low' ? 1.1 : 1 }}
        >
          {labels.low}
        </motion.span>
        <motion.span
          className={`${level === 'medium' ? 'text-[#A79BC8] font-bold' : 'text-gray-500'}`}
          animate={{ scale: level === 'medium' ? 1.1 : 1 }}
        >
          {labels.medium}
        </motion.span>
        <motion.span
          className={`${level === 'high' ? 'text-[#FFD88A] font-bold' : 'text-gray-500'}`}
          animate={{ scale: level === 'high' ? 1.1 : 1 }}
        >
          {labels.high}
        </motion.span>
      </div>

      {/* Current Value Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs text-gray-600">
          Importance Level: <span className={`
            font-bold
            ${level === 'low' ? 'text-[#3C2B63]' : ''}
            ${level === 'medium' ? 'text-[#A79BC8]' : ''}
            ${level === 'high' ? 'text-[#FFD88A]' : ''}
          `}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

// Custom Slider Styles
const sliderStyles = `
  .slider-blueprint::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3C2B63, #A79BC8);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(60, 43, 99, 0.3);
    transition: transform 0.2s ease;
  }

  .slider-blueprint::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(60, 43, 99, 0.4);
  }

  .slider-blueprint::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3C2B63, #A79BC8);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(60, 43, 99, 0.3);
    transition: transform 0.2s ease;
  }

  .slider-blueprint::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(60, 43, 99, 0.4);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = sliderStyles;
  document.head.appendChild(styleSheet);
}
