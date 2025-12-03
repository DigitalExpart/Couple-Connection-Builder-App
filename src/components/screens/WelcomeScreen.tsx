import { ArrowRight, Heart, Shield, Sparkles } from 'lucide-react';
import { Logo } from '../Logo';
import { useLanguage } from '../../contexts/LanguageContext';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 w-full max-w-full">
      {/* Animated background hearts - more visible */}
      <div className="absolute top-10 right-10 animate-float-heart">
        <Heart className="w-20 h-20 text-rose-400/50 fill-rose-300/40" />
      </div>
      <div className="absolute top-32 left-8 animate-float-heart" style={{ animationDelay: '1.5s' }}>
        <Heart className="w-16 h-16 text-pink-400/50 fill-pink-300/40" />
      </div>
      <div className="absolute bottom-40 right-16 animate-float-heart" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-20 h-20 text-purple-400/50 fill-purple-300/40" />
      </div>
      <div className="absolute top-1/2 left-12 animate-float-heart" style={{ animationDelay: '2.5s' }}>
        <Heart className="w-14 h-14 text-rose-300/40 fill-rose-200/30" />
      </div>
      <div className="absolute top-64 right-8 animate-heartbeat" style={{ animationDelay: '1s' }}>
        <Heart className="w-10 h-10 text-pink-500/60 fill-pink-400/50" />
      </div>
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center relative z-10 w-full max-w-full">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-gentle-pulse">
          <Logo size={96} />
        </div>
        
        <h1 className="text-5xl text-gray-900 mb-3 max-w-md romantic-title">
          {t('welcome.title')}
        </h1>
        
        <p className="text-sm text-rose-500 romantic-script mb-4" style={{ fontSize: '1.5rem' }}>
          {t('welcome.tagline')}
        </p>
        
        <p className="text-lg text-gray-600 mb-12 max-w-md leading-relaxed">
          {t('welcome.subtitle')}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-4 mb-12 max-w-md w-full">
          <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-rose-600 animate-heartbeat" />
            </div>
            <div className="text-left">
              <h3 className="text-gray-900 mb-1">{t('welcome.smartCompatibility')}</h3>
              <p className="text-sm text-gray-600">{t('welcome.smartCompatibilityDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="text-gray-900 mb-1">{t('welcome.earlyDetection')}</h3>
              <p className="text-sm text-gray-600">{t('welcome.earlyDetectionDesc')}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-pink-600 animate-sparkle" />
            </div>
            <div className="text-left">
              <h3 className="text-gray-900 mb-1">{t('welcome.actionableInsights')}</h3>
              <p className="text-sm text-gray-600">{t('welcome.actionableInsightsDesc')}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 group hover:scale-105"
        >
          <span className="text-lg">{t('welcome.getStarted')}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-sm text-gray-500 mt-6">
          {t('welcome.freeToStart')}
        </p>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="h-32 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
