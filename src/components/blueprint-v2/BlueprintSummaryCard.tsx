import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BlueprintSummaryCardProps {
  title: string;
  icon: ReactNode;
  items: string[];
  variant?: 'default' | 'warning';
}

export function BlueprintSummaryCard({
  title,
  icon,
  items,
  variant = 'default'
}: BlueprintSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        blueprint-frosted rounded-2xl p-6 shadow-lg
        ${variant === 'warning' ? 'border-l-4 border-[#FF6A6A]' : ''}
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-[#3C2B63]">{title}</h3>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-700"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8]" />
            <span className="text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
