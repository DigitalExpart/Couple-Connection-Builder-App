import { motion } from 'motion/react';
import { useState } from 'react';

interface ImportanceSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  label?: string;
  showLabels?: boolean;
}

export function ImportanceSlider({ 
  value, 
  onChange, 
  label,
  showLabels = true 
}: ImportanceSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getLabel = (val: number) => {
    if (val < 33) return 'Low';
    if (val < 67) return 'Medium';
    return 'High';
  };

  const getColor = (val: number) => {
    if (val < 33) return '#A79BC8';
    if (val < 67) return '#3C2B63';
    return '#FFD88A';
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{label}</span>
          <span 
            className="text-sm px-3 py-1 rounded-full"
            style={{ 
              backgroundColor: `${getColor(value)}20`,
              color: getColor(value)
            }}
          >
            {getLabel(value)}
          </span>
        </div>
      )}

      <div className="relative">
        {/* Track */}
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${value}%`,
              backgroundColor: getColor(value),
            }}
            animate={{
              boxShadow: isDragging && value >= 67 
                ? '0 0 24px rgba(255, 216, 138, 0.9), 0 0 12px rgba(255, 216, 138, 0.6)' 
                : value >= 67 
                ? '0 0 16px rgba(255, 216, 138, 0.7), 0 0 8px rgba(255, 216, 138, 0.4)'
                : 'none'
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Slider Input */}
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
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 shadow-lg pointer-events-none"
          style={{
            left: `calc(${value}% - 12px)`,
            borderColor: getColor(value)
          }}
          animate={{
            scale: isDragging ? 1.3 : 1,
            boxShadow: value >= 67 
              ? '0 0 20px rgba(255, 216, 138, 0.6), 0 4px 12px rgba(0,0,0,0.1)' 
              : '0 4px 12px rgba(0,0,0,0.1)'
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Not Important</span>
          <span>Very Important</span>
        </div>
      )}
    </div>
  );
}