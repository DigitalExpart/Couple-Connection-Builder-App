import { useState, useEffect } from 'react';
import { ArrowLeft, User, Edit2, Save, X, Heart, Target, Calendar, MapPin, Mail, Phone, Check, Crown, Sparkles, Zap, Globe } from 'lucide-react';
import { UserProfile, SubscriptionTier } from '../../App';
import { LanguageSelector } from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProfileScreenProps {
  profile: UserProfile | null;
  subscriptionTier: SubscriptionTier;
  onBack: () => void;
  onSave: (profile: UserProfile) => void;
  onManageSubscription: () => void;
  onResetAllData: () => void;
}

export function ProfileScreen({ profile, subscriptionTier, onBack, onSave, onManageSubscription, onResetAllData }: ProfileScreenProps) {
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(
    profile || { name: '', age: 25, datingGoal: 'serious', location: '', email: '', phone: '', bio: '' }
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
  // Update profile language when language changes in LanguageSelector
  useEffect(() => {
    if (profile && profile.language !== language) {
      const updatedProfile = { ...profile, language };
      onSave(updatedProfile);
    }
  }, [language]);

  const DATING_GOALS = [
    { id: 'casual', label: t('goal.casual'), icon: '☕', description: t('goal.casualDesc') },
    { id: 'serious', label: t('goal.serious'), icon: '💑', description: t('goal.seriousDesc') },
    { id: 'long-term', label: t('goal.longTerm'), icon: '💕', description: t('goal.longTermDesc') },
    { id: 'marriage', label: t('goal.marriage'), icon: '💍', description: t('goal.marriageDesc') },
  ] as const;

  const handleSave = () => {
    onSave(editedProfile);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setEditedProfile(profile || { name: '', age: 25, datingGoal: 'serious', location: '', email: '', phone: '', bio: '' });
    setIsEditing(false);
  };

  const handleResetData = () => {
    onResetAllData();
    setShowResetModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const currentGoal = DATING_GOALS.find(g => g.id === editedProfile.datingGoal);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">{t('profile.editProfile')}</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm">{t('common.cancel')}</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-rose-600 rounded-xl hover:bg-white/90 transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm">{t('common.save')}</span>
                </button>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-3xl text-white mb-2">{t('profile.title')}</h1>
            <p className="text-white/80">{t('profile.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>{t('profile.savedSuccess')}</span>
          </div>
        </div>
      )}

      <div className="px-6 -mt-24 relative z-10 space-y-6">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <User className="w-16 h-16 text-white" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-rose-200 hover:scale-110 transition-transform">
                <Edit2 className="w-4 h-4 text-rose-600" />
              </button>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl text-gray-900 mb-4">{t('profile.basicInfo')}</h2>
          
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.fullName')}</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="Enter your name"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{editedProfile.name || 'Not set'}</span>
              </div>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.age')}</label>
            {isEditing ? (
              <input
                type="number"
                value={editedProfile.age}
                onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="Enter your age"
                min="18"
                max="99"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{editedProfile.age} {t('profile.yearsOld')}</span>
              </div>
            )}
          </div>
        </div>

        {/* About You Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl text-gray-900 mb-4">{t('profile.aboutYou')}</h2>
          
          {/* Location */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.location')}</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.location || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="City, State"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{editedProfile.location || 'Not set'}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.email')}</label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="your@email.com"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{editedProfile.email || 'Not set'}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.phone')}</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="(555) 123-4567"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-2xl">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{editedProfile.phone || 'Not set'}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">{t('profile.bio')}</label>
            {isEditing ? (
              <textarea
                value={editedProfile.bio || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:border-rose-400 focus:outline-none transition-all resize-none"
                placeholder={t('profile.bioPlaceholder')}
                rows={4}
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-2xl min-h-[100px]">
                <p className="text-gray-900">{editedProfile.bio || 'Not set'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Dating Goal */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="text-xl text-gray-900">{t('profile.datingGoal')}</h2>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              {DATING_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setEditedProfile({ ...editedProfile, datingGoal: goal.id })}
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                    editedProfile.datingGoal === goal.id
                      ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="text-gray-900">{goal.label}</span>
                    {editedProfile.datingGoal === goal.id && (
                      <Check className="w-5 h-5 text-rose-600 ml-auto" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 ml-11">{goal.description}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border-2 border-rose-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{currentGoal?.icon}</span>
                <span className="text-lg text-gray-900">{currentGoal?.label}</span>
              </div>
              <p className="text-sm text-gray-600 ml-14">{currentGoal?.description}</p>
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl text-gray-900">{t('profile.accountActivity')}</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-2xl">
              <div className="text-2xl text-purple-900 mb-1">12</div>
              <div className="text-xs text-purple-700">{t('profile.daysActive')}</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-2xl">
              <div className="text-2xl text-purple-900 mb-1">5</div>
              <div className="text-xs text-purple-700">{t('profile.scans')}</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-2xl">
              <div className="text-2xl text-purple-900 mb-1">87%</div>
              <div className="text-xs text-purple-700">{t('profile.accuracy')}</div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl text-gray-900 mb-4">{t('profile.preferences')}</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900">{t('profile.emailNotifications')}</div>
                  <div className="text-xs text-gray-500">{t('profile.emailNotificationsDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-rose-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">{t('profile.pushNotifications')}</div>
                  <div className="text-xs text-gray-500">{t('profile.pushNotificationsDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-rose-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-900">{t('profile.locationServices')}</div>
                  <div className="text-xs text-gray-500">{t('profile.locationServicesDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-rose-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>

            {/* Language Selector */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-gray-900">{t('profile.language')}</div>
                  <div className="text-xs text-gray-500">{t('profile.languageDesc')}</div>
                </div>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        {!isEditing && (
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl shadow-lg p-6 border border-red-200">
            <h2 className="text-xl text-gray-900 mb-4">{t('profile.accountActions')}</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full p-4 bg-white rounded-2xl border border-gray-200 hover:border-red-300 transition-all text-left"
              >
                <div className="text-gray-900 mb-1">{t('profile.resetData')}</div>
                <div className="text-xs text-gray-500">{t('profile.resetDataDesc')}</div>
              </button>
              
              <button className="w-full p-4 bg-white rounded-2xl border border-red-200 hover:bg-red-50 transition-all text-left">
                <div className="text-red-600 mb-1">{t('profile.deleteAccount')}</div>
                <div className="text-xs text-red-500">{t('profile.deleteAccountDesc')}</div>
              </button>
            </div>
          </div>
        )}

        {/* Subscription Section */}
        {!isEditing && (
          <div className={`rounded-3xl shadow-lg p-6 border-2 ${
            subscriptionTier === 'free'
              ? 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
              : subscriptionTier === 'premium'
              ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'
              : 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-gray-900">{t('profile.subscription')}</h2>
              <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                subscriptionTier === 'free'
                  ? 'bg-gray-200 text-gray-700'
                  : subscriptionTier === 'premium'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
              }`}>
                {subscriptionTier === 'free' ? (
                  <Sparkles className="w-3 h-3" />
                ) : subscriptionTier === 'premium' ? (
                  <Crown className="w-3 h-3" />
                ) : (
                  <Zap className="w-3 h-3" />
                )}
                <span>{t(`sub.${subscriptionTier}`)}</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border-2 mb-4 ${
              subscriptionTier === 'free'
                ? 'bg-white border-gray-200'
                : subscriptionTier === 'premium'
                ? 'bg-white/60 border-rose-300'
                : 'bg-white/60 border-purple-300'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {subscriptionTier === 'free' ? (
                  <>
                    <Sparkles className="w-6 h-6 text-gray-500" />
                    <span className="text-lg text-gray-900">{t('profile.freePlan')}</span>
                  </>
                ) : subscriptionTier === 'premium' ? (
                  <>
                    <Crown className="w-6 h-6 text-rose-600" />
                    <span className="text-lg text-gray-900">{t('profile.premiumPlan')}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 text-purple-600" />
                    <span className="text-lg text-gray-900">{t('profile.exclusivePlan')}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 ml-9">
                {subscriptionTier === 'free' 
                  ? '1 scan/week • Basic score • 3 categories'
                  : subscriptionTier === 'premium'
                  ? 'Unlimited scans • Dual mode • Full breakdown'
                  : 'Everything + AI Coach • Live assistance'
                }
              </p>
            </div>

            <button
              onClick={onManageSubscription}
              className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl hover:shadow-lg transition-all"
            >
              {subscriptionTier === 'free' ? t('profile.upgradePlan') : t('profile.manageSubscription')}
            </button>
          </div>
        )}
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-[slideUp_0.3s_ease-out]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h2 className="text-2xl text-gray-900 mb-2">Reset All Data?</h2>
              <p className="text-gray-600 leading-relaxed">
                This will permanently delete all your match scans and assessment data. This action <strong>cannot</strong> be undone.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <p className="text-sm text-red-800 text-center">
                ⚠️ Your profile information and subscription will not be affected
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:shadow-lg transition-all"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}