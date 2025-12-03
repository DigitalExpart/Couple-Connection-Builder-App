import { motion } from 'motion/react';
import { useEffect } from 'react';
import { ConstellationLoader } from '../../blueprint-v2/ConstellationLoader';

interface BlueprintGenerationScreenV2Props {
  onComplete: () => void;
  duration?: number; // in milliseconds
}

export function BlueprintGenerationScreenV2({
  onComplete,
  duration = 3000
}: BlueprintGenerationScreenV2Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  const steps = [
    'Analyzing your relationship values...',
    'Mapping your compatibility preferences...',
    'Identifying your deal-breakers...',
    'Building your unique blueprint...'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B63] via-[#A79BC8] to-[#FFD88A] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Creating Your Match Blueprint™
        </motion.h1>

        {/* Subtitle with animated steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-white/90 mb-12 h-8"
        >
          {steps.map((step, index) => (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
              transition={{
                duration: 2,
                delay: index * 0.75,
                times: [0, 0.1, 0.9, 1]
              }}
              className="absolute left-0 right-0"
            >
              {step}
            </motion.p>
          ))}
        </motion.div>

        {/* Constellation Animation */}
        <ConstellationLoader />

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-3 h-3 rounded-full bg-white"
            />
          ))}
        </motion.div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 200]
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '10%'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
