import { X } from 'lucide-react';
import { Logo } from './Logo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-[slideUp_0.3s_ease-out] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header with gradient icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg">
            <Logo size={80} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-gray-900 mb-2">
          About MyMatchIQ
        </h2>

        {/* Version badge */}
        <div className="flex justify-center mb-6">
          <div className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-rose-600" />
            <span className="text-sm text-rose-600">Version 1.0</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          A smart dating compatibility assessment tool to help you make informed decisions about potential matches.
        </p>

        {/* Features list */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-sm text-gray-700">
              30 guided questions across 6 key categories
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-sm text-gray-700">
              5-tier rating system for detailed assessment
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-sm text-gray-700">
              Real-time compatibility scoring and insights
            </p>
          </div>
        </div>

        {/* OK button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}