import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Target, Shield, MessageCircle, Users } from 'lucide-react';

interface BlueprintGenerationScreenProps {
  onComplete: () => void;
}

const icons = [
  { Icon: Heart, color: '#F472B6', delay: 0 },
  { Icon: Star, color: '#FFD88A', delay: 0.2 },
  { Icon: Target, color: '#3C2B63', delay: 0.4 },
  { Icon: Shield, color: '#FF6A6A', delay: 0.6 },
  { Icon: MessageCircle, color: '#60A5FA', delay: 0.8 },
  { Icon: Users, color: '#A78BFA', delay: 1.0 }
];

export function BlueprintGenerationScreen({ onComplete }: BlueprintGenerationScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B63] via-[#5A4180] to-[#A79BC8] flex items-center justify-center px-6">
      <div className="text-center">
        {/* Animated Icon Constellation */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Center Circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Target className="w-12 h-12 text-[#FFD88A]" />
          </motion.div>

          {/* Orbiting Icons */}
          {icons.map(({ Icon, color, delay }, index) => {
            const angle = (index * 360) / icons.length;
            const radius = 100;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0, 1, 1],
                  x: [0, x],
                  y: [0, y]
                }}
                transition={{
                  duration: 1.5,
                  delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{ backgroundColor: `${color}20`, backdropFilter: 'blur(8px)' }}
                >
                  <Icon className="w-8 h-8" style={{ color }} />
                </div>
              </motion.div>
            );
          })}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            {icons.map((_, index) => {
              const angle = (index * 360) / icons.length;
              const nextAngle = ((index + 1) * 360) / icons.length;
              const radius = 100;
              
              const x1 = 128 + Math.cos((angle * Math.PI) / 180) * radius;
              const y1 = 128 + Math.sin((angle * Math.PI) / 180) * radius;
              const x2 = 128 + Math.cos((nextAngle * Math.PI) / 180) * radius;
              const y2 = 128 + Math.sin((nextAngle * Math.PI) / 180) * radius;

              return (
                <motion.line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl text-white mb-4">
            Analyzing Your Blueprint...
          </h2>
          <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
            Creating your personalized Match Blueprint™ based on your answers
          </p>

          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-[#FFD88A] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}
