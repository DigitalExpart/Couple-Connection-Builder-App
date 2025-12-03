import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  maxSelect?: number;
  columns?: 1 | 2 | 3;
  variant?: 'default' | 'compact';
}

export function ChipSelector({ 
  options, 
  selected, 
  onChange, 
  multiSelect = false,
  maxSelect,
  columns = 2,
  variant = 'default'
}: ChipSelectorProps) {
  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        onChange(selected.filter(s => s !== option));
      } else {
        if (maxSelect && selected.length >= maxSelect) {
          return; // Don't allow more selections
        }
        onChange([...selected, option]);
      }
    } else {
      onChange([option]);
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  };

  const canSelectMore = !maxSelect || selected.length < maxSelect;

  return (
    <div className="w-full">
      {/* Selection Counter */}
      {multiSelect && maxSelect && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <p className="text-sm">
            <span className={`${selected.length === maxSelect ? 'text-[#3C2B63] font-bold' : 'text-gray-900'}`}>
              {selected.length}
            </span>
            <span className="text-gray-500"> / {maxSelect} selected</span>
          </p>
        </motion.div>
      )}
      
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option);
          const isDisabled = !isSelected && !canSelectMore;
          
          return (
            <motion.button
              key={option}
              onClick={() => !isDisabled && toggleOption(option)}
              disabled={isDisabled}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={!isDisabled ? { scale: 1.03, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
              className={`
                relative px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium
                ${variant === 'compact' ? 'py-2' : 'py-3'}
                ${isSelected 
                  ? 'bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] border-[#3C2B63] text-white shadow-lg' 
                  : isDisabled
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-[#A79BC8]/30 text-gray-700 hover:border-[#A79BC8] hover:shadow-md'
                }
              `}
            >
              {/* Bounce Animation on Selection */}
              <motion.span
                className="flex items-center justify-center gap-2"
                animate={isSelected ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                {option}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.span>
              
              {/* Selection Glow Effect */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 0 20px rgba(167, 155, 200, 0.6)'
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
