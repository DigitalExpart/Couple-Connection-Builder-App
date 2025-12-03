import { Home, History, User, Settings, HelpCircle, Menu, X, ChevronRight, Heart, TrendingUp, Clock, Zap, MessageCircle, Play, Bot, Sparkles, Shield, Download, BarChart, Crown, Info, Mail, FileText, LogOut } from 'lucide-react';
import { ScanRecord, UserProfile, SubscriptionTier } from '../../App';
import { Logo } from '../Logo';
import { useState } from 'react';
import { AboutModal } from '../AboutModal';
import logo from 'figma:asset/b9e72e44de24234836cba946da8c4fc15003efc3.png';
import { useLanguage } from '../../contexts/LanguageContext';

interface DashboardScreenProps {
  onStartScan: () => void;
  onNavigate: (screen: 'history' | 'aiCoach' | 'profile' | 'subscription' | 'styleGuide' | 'dualScan' | 'scanTypeSelection' | 'blueprintHome') => void;
  scans: any[];
}

export function DashboardScreen({ onStartScan, onNavigate, scans }: DashboardScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { t, language } = useLanguage();
  
  // Debug: Log language on every render
  console.log('Dashboard rendering with language:', language);

  const getCategoryColor = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return 'bg-emerald-100 text-emerald-700';
      case 'worth-exploring': return 'bg-blue-100 text-blue-700';
      case 'mixed-signals': return 'bg-amber-100 text-amber-700';
      case 'caution': return 'bg-orange-100 text-orange-700';
      case 'high-risk': return 'bg-red-100 text-red-700';
    }
  };

  const getCategoryLabel = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return t('dashboard.categoryHighPotential');
      case 'worth-exploring': return t('dashboard.categoryWorthExploring');
      case 'mixed-signals': return t('dashboard.categoryMixedSignals');
      case 'caution': return t('dashboard.categoryCaution');
      case 'high-risk': return t('dashboard.categoryHighRisk');
    }
  };

  const recentScans = scans.slice(-3).reverse();

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden w-full max-w-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-24 relative overflow-hidden w-full">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating hearts decoration */}
        <div className="absolute top-20 right-8 animate-float-heart">
          <Heart className="w-6 h-6 text-white/20 fill-white/10" />
        </div>
        <div className="absolute top-32 left-12 animate-float-heart" style={{ animationDelay: '1s' }}>
          <Heart className="w-4 h-4 text-white/20 fill-white/10" />
        </div>
        <div className="absolute bottom-16 right-16 animate-float-heart" style={{ animationDelay: '2s' }}>
          <Heart className="w-5 h-5 text-white/20 fill-white/10" />
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-3 hover:scale-105 transition-transform group"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-1 group-hover:bg-white/30 transition-colors">
                <Logo size={48} />
              </div>
              <div className="text-left">
                <h1 className="text-2xl text-white romantic-title">MyMatchIQ</h1>
                <p className="text-white/80 text-sm">{t('dashboard.tagline')}</p>
              </div>
            </button>
            <div className="flex items-center gap-3">
              {/* Debug language indicator */}
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white">
                Lang: {language.toUpperCase()}
              </div>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl text-white mb-1">{scans.length}</div>
              <div className="text-xs text-white/80">{t('dashboard.totalScans')}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl text-white mb-1">
                {scans.filter(s => s.category === 'high-potential' || s.category === 'worth-exploring').length}
              </div>
              <div className="text-xs text-white/80">{t('dashboard.goodMatches')}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl text-white mb-1">
                {scans.filter(s => s.answers.some(a => a.rating === 'red-flag')).length}
              </div>
              <div className="text-xs text-white/80">{t('dashboard.redFlags')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-10 space-y-6">
        {/* Primary CTA */}
        <button
          onClick={() => onNavigate('scanTypeSelection')}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h2 className="text-xl mb-1">{t('dashboard.newScan')}</h2>
              <p className="text-white/90 text-sm">{t('dashboard.newScanDesc')}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7" />
            </div>
          </div>
        </button>

        {/* Recent Scans */}
        {recentScans.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">{t('dashboard.recentScans')}</h3>
              <button 
                onClick={() => onNavigate('history')}
                className="text-sm text-rose-600 hover:text-rose-700"
              >
                {t('dashboard.viewAll')}
              </button>
            </div>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => onNavigate('history')}
                  className="w-full p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-900">{scan.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(scan.category)}`}>
                      {scan.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{scan.date}</span>
                    <span className={`text-xs px-2 py-1 rounded-lg ${getCategoryColor(scan.category)}`}>
                      {getCategoryLabel(scan.category)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <History className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">{t('dashboard.noScansYet')}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {t('dashboard.noScansDesc')}
            </p>
            <button
              onClick={onStartScan}
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all"
            >
              {t('dashboard.startFirstScan')}
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('history')}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
              <History className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-1">{t('dashboard.history')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.historyDesc')}</p>
          </button>

          <button 
            onClick={() => onNavigate('aiCoach')}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-3">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-1">{t('dashboard.aiCoach')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.aiCoachShort')}</p>
          </button>
        </div>

        {/* Blueprint Feature - New! */}
        <button 
          onClick={() => onNavigate('blueprintHome')}
          className="w-full bg-gradient-to-br from-[#3C2B63] to-[#5A4180] p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
            NEW
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white mb-1">Match Blueprint™</h3>
              <p className="text-sm text-white/90">Build your ideal match profile</p>
            </div>
          </div>
        </button>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">{t('dashboard.dailyTip')}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('dashboard.tipText')}
              </p>
            </div>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-3xl border border-rose-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">{t('dashboard.emotionalAlignment')}</h3>
                <p className="text-sm text-gray-600">
                  {t('dashboard.emotionalAlignmentDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-3xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">{t('dashboard.communicationStyle')}</h3>
                <p className="text-sm text-gray-600">
                  {t('dashboard.communicationStyleDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-3xl border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">{t('dashboard.redFlagAwareness')}</h3>
                <p className="text-sm text-gray-600">
                  {t('dashboard.redFlagAwarenessDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Menu Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-2xl animate-[slideInRight_0.3s_ease-out]">
            {/* Drawer Header */}
            <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-1">
                    <Logo size={48} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg text-white">MyMatchIQ</h2>
                    <p className="text-white/80 text-sm">{t('menu.navigateHome')}</p>
                  </div>
                </button>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* User Stats in Header */}
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xl text-white mb-1">{scans.length}</div>
                    <div className="text-xs text-white/80">{t('menu.scans')}</div>
                  </div>
                  <div>
                    <div className="text-xl text-white mb-1">
                      {scans.filter(s => s.category === 'high-potential' || s.category === 'worth-exploring').length}
                    </div>
                    <div className="text-xs text-white/80">{t('menu.matches')}</div>
                  </div>
                  <div>
                    <div className="text-xl text-white mb-1">
                      {scans.reduce((sum, s) => sum + s.answers.length, 0)}
                    </div>
                    <div className="text-xs text-white/80">{t('menu.questions')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2 overflow-y-auto h-[calc(100vh-260px)]">
              {/* Navigation Section */}
              <div className="mb-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">{t('menu.navigation')}</h3>
                
                <button 
                  onClick={() => { onNavigate('welcome'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50 transition-all group border-2 border-rose-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Home className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.welcomeScreen')}</div>
                    <div className="text-xs text-gray-500">{t('menu.welcomeScreenDesc')}</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                    <Logo size={40} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.dashboard')}</div>
                    <div className="text-xs text-gray-500">{t('menu.dashboardDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { onNavigate('history'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <History className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.scanHistory')}</div>
                    <div className="text-xs text-gray-500">{scans.length} {t('menu.totalScans')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { onNavigate('aiCoach'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.aiCoach')}</div>
                    <div className="text-xs text-gray-500">{t('menu.aiCoachDesc')}</div>
                  </div>
                </button>
              </div>

              {/* Tools Section */}
              <div className="mb-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">{t('menu.toolsData')}</h3>
                
                <button 
                  onClick={() => { alert('Export feature coming soon!'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.exportData')}</div>
                    <div className="text-xs text-gray-500">{t('menu.exportDataDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { alert('Stats dashboard coming soon!'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.yourStats')}</div>
                    <div className="text-xs text-gray-500">{t('menu.yourStatsDesc')}</div>
                  </div>
                </button>
              </div>

              {/* Settings Section */}
              <div className="mb-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">{t('menu.settings')}</h3>
                
                <button 
                  onClick={() => { onNavigate('profile'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.profile')}</div>
                    <div className="text-xs text-gray-500">{t('menu.profileDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { onNavigate('subscription'); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Crown className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.subscription')}</div>
                    <div className="text-xs text-gray-500">{t('menu.subscriptionDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { setShowAboutModal(true); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Info className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.aboutHelp')}</div>
                    <div className="text-xs text-gray-500">{t('menu.version')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { setMenuOpen(false); onNavigate('contact'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.contactSupport')}</div>
                    <div className="text-xs text-gray-500">{t('menu.contactSupportDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { setMenuOpen(false); onNavigate('privacy'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.privacyPolicy')}</div>
                    <div className="text-xs text-gray-500">{t('menu.privacyPolicyDesc')}</div>
                  </div>
                </button>

                <button 
                  onClick={() => { setMenuOpen(false); onNavigate('terms'); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-gray-900">{t('menu.terms')}</div>
                    <div className="text-xs text-gray-500">{t('menu.termsDesc')}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent">
              <button 
                onClick={() => { 
                  if (confirm('Are you sure you want to sign out?')) {
                    alert('Sign out feature coming soon!');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('menu.signOut')}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* About Modal */}
      <AboutModal 
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)} 
      />
    </div>
  );
}