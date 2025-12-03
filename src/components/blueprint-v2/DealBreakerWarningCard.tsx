import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface DealBreakerWarningCardProps {
  dealBreakers: string[];
}

export function DealBreakerWarningCard({ dealBreakers }: DealBreakerWarningCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="blueprint-frosted rounded-2xl p-6 border-2 border-[#FF6A6A] bg-gradient-to-br from-[#FF6A6A]/5 to-transparent"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 rounded-xl bg-[#FF6A6A]/20 flex items-center justify-center"
        >
          <AlertTriangle className="w-5 h-5 text-[#FF6A6A]" />
        </motion.div>
        <h3 className="text-lg font-semibold text-[#FF6A6A]">Deal-Breakers Active</h3>
      </div>
      
      <div className="space-y-2">
        {dealBreakers.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-700"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF6A6A] blueprint-pulse" />
            <span className="text-sm">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
