import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BlueprintButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'gradient' | 'lavender-outline' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function BlueprintButton({
  children,
  onClick,
  variant = 'gradient',
  disabled = false,
  fullWidth = false,
  icon,
  size = 'md'
}: BlueprintButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    gradient: `
      bg-gradient-to-r from-[#3C2B63] to-[#A79BC8] text-white
      hover:shadow-lg hover:scale-105
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    'lavender-outline': `
      border-2 border-[#A79BC8] text-[#3C2B63] bg-transparent
      hover:bg-[#A79BC8]/10 hover:border-[#3C2B63]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      text-[#3C2B63] bg-transparent
      hover:bg-[#F4F4F6]
      disabled:opacity-50 disabled:cursor-not-allowed
    `
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        rounded-2xl font-medium transition-all duration-300
        flex items-center justify-center gap-2
      `}
    >
      {icon}
      {children}
    </motion.button>
  );
}
