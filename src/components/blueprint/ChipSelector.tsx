import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  columns?: 1 | 2 | 3;
  maxSelect?: number; // Maximum number of selections allowed
}

export function ChipSelector({ 
  options, 
  selected, 
  onChange, 
  multiSelect = false,
  columns = 2,
  maxSelect
}: ChipSelectorProps) {
  const toggleOption = (option: string) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        onChange(selected.filter(s => s !== option));
      } else {
        // Check if we've reached the max selection limit
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
    <div>
      {/* Selection Counter */}
      {multiSelect && maxSelect && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            <span className={`${selected.length === maxSelect ? 'text-[#3C2B63]' : 'text-gray-900'}`}>
              {selected.length}
            </span>
            <span className="text-gray-500"> / {maxSelect} selected</span>
          </p>
        </div>
      )}
      
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const isDisabled = !isSelected && !canSelectMore;
          
          return (
            <motion.button
              key={option}
              onClick={() => toggleOption(option)}
              disabled={isDisabled}
              className={`
                relative px-4 py-3 rounded-xl border-2 transition-all text-sm
                ${isSelected 
                  ? 'bg-[#3C2B63] border-[#3C2B63] text-white shadow-lg' 
                  : isDisabled
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-[#A79BC8]/30 text-gray-700 hover:border-[#A79BC8] hover:shadow-md'
                }
              `}
              whileHover={!isDisabled ? { scale: 1.03 } : {}}
              whileTap={!isDisabled ? { scale: 0.97 } : {}}
              animate={isSelected ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {option}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}