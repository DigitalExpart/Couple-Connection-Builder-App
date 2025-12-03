import { motion } from 'motion/react';

interface LanguageSelectorFlagsProps {
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

export function LanguageSelectorFlags({ selectedLanguage, onSelect }: LanguageSelectorFlagsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {languages.map((lang) => {
        const isSelected = selectedLanguage === lang.code;
        
        return (
          <motion.button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-6 rounded-2xl transition-all
              ${isSelected 
                ? 'bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] text-white shadow-xl' 
                : 'bg-white border-2 border-gray-200 hover:border-[#A79BC8]'
              }
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="selected-language"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3C2B63] to-[#A79BC8]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-3">{lang.flag}</div>
              <div className={`font-medium ${isSelected ? 'text-white' : 'text-[#3C2B63]'}`}>
                {lang.name}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
