import { Heart, Home, MessageCircle, Target, Star, Shield, Users, Briefcase, Baby, Map, Coffee, Zap } from 'lucide-react';

type CategoryType = 
  | 'values' 
  | 'lifestyle' 
  | 'communication' 
  | 'relationship-goals'
  | 'preferences'
  | 'deal-breakers'
  | 'personality'
  | 'career'
  | 'family'
  | 'location'
  | 'interests'
  | 'energy';

interface CategoryIconProps {
  category: CategoryType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined';
}

const icons = {
  'values': Star,
  'lifestyle': Home,
  'communication': MessageCircle,
  'relationship-goals': Target,
  'preferences': Heart,
  'deal-breakers': Shield,
  'personality': Users,
  'career': Briefcase,
  'family': Baby,
  'location': Map,
  'interests': Coffee,
  'energy': Zap
};

const colors = {
  'values': { bg: 'bg-[#FFD88A]/20', text: 'text-[#FFD88A]', border: 'border-[#FFD88A]' },
  'lifestyle': { bg: 'bg-[#A79BC8]/20', text: 'text-[#A79BC8]', border: 'border-[#A79BC8]' },
  'communication': { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
  'relationship-goals': { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300' },
  'preferences': { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-300' },
  'deal-breakers': { bg: 'bg-[#FF6A6A]/20', text: 'text-[#FF6A6A]', border: 'border-[#FF6A6A]' },
  'personality': { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
  'career': { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300' },
  'family': { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300' },
  'location': { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-300' },
  'interests': { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300' },
  'energy': { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300' }
};

export function CategoryIcon({ category, size = 'md', variant = 'filled' }: CategoryIconProps) {
  const Icon = icons[category];
  const color = colors[category];

  const sizes = {
    sm: { container: 'w-10 h-10', icon: 'w-5 h-5' },
    md: { container: 'w-14 h-14', icon: 'w-7 h-7' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10' }
  };

  return (
    <div 
      className={`${sizes[size].container} rounded-2xl flex items-center justify-center ${
        variant === 'filled' 
          ? `${color.bg} ${color.text}` 
          : `bg-white border-2 ${color.border} ${color.text}`
      }`}
    >
      <Icon className={sizes[size].icon} />
    </div>
  );
}
