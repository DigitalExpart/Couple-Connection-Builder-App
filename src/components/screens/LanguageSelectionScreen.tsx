import { ArrowLeft, Check, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageSelectionScreenProps {
  onBack: () => void;
  onSelect?: (language: 'en' | 'es' | 'fr' | 'de' | 'it') => void;
}

const languages = [
  { 
    code: 'en' as const, 
    name: 'English', 
    nativeName: 'English',
    flag: '🇺🇸',
    color: '#3C2B63'
  },
  { 
    code: 'es' as const, 
    name: 'Spanish', 
    nativeName: 'Español',
    flag: '🇪🇸',
    color: '#FF6A6A'
  },
  { 
    code: 'fr' as const, 
    name: 'French', 
    nativeName: 'Français',
    flag: '🇫🇷',
    color: '#60A5FA'
  },
  { 
    code: 'de' as const, 
    name: 'German', 
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    color: '#FFD88A'
  },
  { 
    code: 'it' as const, 
    name: 'Italian', 
    nativeName: 'Italiano',
    flag: '🇮🇹',
    color: '#34D399'
  }
];

export function LanguageSelectionScreen({ onBack, onSelect }: LanguageSelectionScreenProps) {
  const { language: currentLanguage, setLanguage } = useLanguage();

  const handleSelect = (code: 'en' | 'es' | 'fr' | 'de' | 'it') => {
    setLanguage(code);
    if (onSelect) {
      onSelect(code);
    }
    // Auto-navigate back after selection
    setTimeout(() => {
      onBack();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white">
        <div className="px-6 pt-6 pb-8">
          <button onClick={onBack} className="mb-4 text-white/80 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Globe className="w-10 h-10 text-[#FFD88A]" />
            </motion.div>

            <h1 className="text-3xl mb-3">Choose Your Language</h1>
            <p className="text-lg text-white/80">
              Select your preferred language for the app
            </p>
          </motion.div>
        </div>
      </div>

      {/* Language Options */}
      <div className="px-6 py-8 max-w-2xl mx-auto space-y-4">
        {languages.map((lang, index) => {
          const isSelected = currentLanguage === lang.code;

          return (
            <motion.button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                w-full rounded-2xl p-6 transition-all
                ${isSelected
                  ? 'bg-gradient-to-br from-[#3C2B63] to-[#5A4180] shadow-lg scale-[1.02]'
                  : 'bg-white shadow-md hover:shadow-lg'
                }
              `}
              whileHover={{ scale: isSelected ? 1.02 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                {/* Flag */}
                <div
                  className={`
                    text-5xl flex items-center justify-center w-16 h-16 rounded-xl
                    ${isSelected ? 'bg-white/10' : 'bg-gray-50'}
                  `}
                >
                  {lang.flag}
                </div>

                {/* Language Info */}
                <div className="flex-1 text-left">
                  <h3
                    className={`text-xl mb-1 ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {lang.nativeName}
                  </h3>
                  <p
                    className={`text-sm ${
                      isSelected ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {lang.name}
                  </p>
                </div>

                {/* Check Icon */}
                <div className="flex-shrink-0">
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="w-10 h-10 bg-[#FFD88A] rounded-full flex items-center justify-center"
                    >
                      <Check className="w-6 h-6 text-[#3C2B63]" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="px-6 pb-8"
      >
        <div className="max-w-2xl mx-auto bg-[#A79BC8]/10 border border-[#A79BC8]/30 rounded-2xl p-4">
          <p className="text-sm text-gray-700 text-center">
            <span className="text-[#3C2B63]">✨</span> The entire app experience, including questions and guidance, will be in your selected language
          </p>
        </div>
      </motion.div>
    </div>
  );
}
