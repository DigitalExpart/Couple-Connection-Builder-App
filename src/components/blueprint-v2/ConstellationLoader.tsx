import { motion } from 'motion/react';
import { Heart, Users, Shield, Star, Home, Sparkles } from 'lucide-react';

export function ConstellationLoader() {
  const icons = [
    { Icon: Heart, delay: 0, x: -80, y: -60 },
    { Icon: Users, delay: 0.2, x: 80, y: -40 },
    { Icon: Shield, delay: 0.4, x: -60, y: 40 },
    { Icon: Star, delay: 0.6, x: 60, y: 60 },
    { Icon: Home, delay: 0.8, x: 0, y: -80 },
    { Icon: Sparkles, delay: 1, x: 0, y: 80 }
  ];

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Center glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#3C2B63]/20 to-[#FFD88A]/20 blur-3xl"
      />

      {/* Constellation icons */}
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: [0, x, x, 0],
            y: [0, y, y, 0],
            rotate: [0, 180, 360, 0]
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      ))}

      {/* Center icon */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] flex items-center justify-center shadow-2xl"
      >
        <Heart className="w-10 h-10 text-white" />
      </motion.div>

      {/* Connecting lines effect */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.circle
          cx="50%"
          cy="50%"
          r="100"
          fill="none"
          stroke="url(#constellation-gradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C2B63" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A79BC8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
