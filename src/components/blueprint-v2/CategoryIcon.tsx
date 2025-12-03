import { Heart, Home, Shield, Sparkles, Star, Users } from 'lucide-react';

export type CategoryType = 
  | 'values'
  | 'lifestyle'
  | 'deal-breakers'
  | 'preferences'
  | 'nice-to-haves'
  | 'relationship-goals';

interface CategoryIconProps {
  category: CategoryType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

const categoryConfig: Record<CategoryType, { icon: any; label: string; color: string }> = {
  'values': {
    icon: Heart,
    label: 'Core Values',
    color: '#FF6A6A'
  },
  'lifestyle': {
    icon: Home,
    label: 'Lifestyle',
    color: '#FFD88A'
  },
  'deal-breakers': {
    icon: Shield,
    label: 'Deal-Breakers',
    color: '#FF6A6A'
  },
  'preferences': {
    icon: Star,
    label: 'Preferences',
    color: '#A79BC8'
  },
  'nice-to-haves': {
    icon: Sparkles,
    label: 'Nice-to-Haves',
    color: '#FFD88A'
  },
  'relationship-goals': {
    icon: Users,
    label: 'Relationship Goals',
    color: '#3C2B63'
  }
};

export function CategoryIcon({ 
  category, 
  size = 'md', 
  showLabel = false,
  variant = 'default'
}: CategoryIconProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  const variantClasses = {
    default: `bg-gradient-to-br from-white to-[${config.color}]/10 border-2 border-[${config.color}]/30`,
    filled: `bg-gradient-to-br from-[${config.color}] to-[${config.color}]/80`,
    outlined: `border-2 border-[${config.color}] bg-transparent`
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-2xl flex items-center justify-center
          transition-all duration-300 hover:scale-110 hover:shadow-lg
        `}
        style={{ borderColor: config.color }}
      >
        <Icon 
          size={iconSizes[size]} 
          style={{ color: variant === 'filled' ? '#FFFFFF' : config.color }}
          strokeWidth={2.5}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 text-center font-medium">
          {config.label}
        </p>
      )}
    </div>
  );
}
