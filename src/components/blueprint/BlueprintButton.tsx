import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BlueprintButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function BlueprintButton({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled = false,
  icon,
  fullWidth = false,
  className = ''
}: BlueprintButtonProps) {
  const baseStyles = "px-6 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#3C2B63] to-[#5A4180] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-transparent text-[#3C2B63] border-2 border-[#A79BC8] hover:bg-[#A79BC8]/10 hover:border-[#3C2B63]",
    tertiary: "bg-transparent text-[#3C2B63] hover:bg-[#A79BC8]/20"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
