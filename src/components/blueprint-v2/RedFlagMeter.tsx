import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface RedFlagMeterProps {
  score: number; // 0-100, where higher is more flags
  label?: string;
}

export function RedFlagMeter({ score, label = 'Red Flag Level' }: RedFlagMeterProps) {
  const getColor = () => {
    if (score < 20) return { from: '#10B981', to: '#059669', text: 'Low Risk' };
    if (score < 50) return { from: '#FFD88A', to: '#F59E0B', text: 'Moderate' };
    return { from: '#FF6A6A', to: '#DC2626', text: 'High Risk' };
  };

  const colors = getColor();

  return (
    <div className="blueprint-frosted rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={score > 50 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle 
              className="w-5 h-5" 
              style={{ color: colors.from }}
            />
          </motion.div>
          <span className="font-medium text-[#3C2B63]">{label}</span>
        </div>
        <span 
          className="text-lg font-bold"
          style={{ color: colors.from }}
        >
          {colors.text}
        </span>
      </div>

      {/* Meter Bar */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to right, #10B981 0%, #FFD88A 50%, #FF6A6A 100%)'
          }}
        />
        
        {/* Indicator */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2"
          style={{ borderColor: colors.from }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full h-full rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}
