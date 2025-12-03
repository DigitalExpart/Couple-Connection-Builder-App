import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BlueprintCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  accentColor?: 'purple' | 'gold' | 'lavender' | 'red';
  onClick?: () => void;
}

export function BlueprintCard({ 
  children, 
  className = '', 
  variant = 'default',
  accentColor,
  onClick 
}: BlueprintCardProps) {
  const baseStyles = "rounded-2xl p-6 transition-all";
  
  const variants = {
    default: "bg-white shadow-md hover:shadow-lg",
    glass: "bg-white/80 backdrop-blur-md shadow-lg border border-white/50",
    elevated: "bg-white shadow-2xl"
  };

  const accents = {
    purple: "border-l-4 border-[#3C2B63]",
    gold: "border-l-4 border-[#FFD88A]",
    lavender: "border-l-4 border-[#A79BC8]",
    red: "border-l-4 border-[#FF6A6A]"
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${accentColor ? accents[accentColor] : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={onClick ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </Component>
  );
}
