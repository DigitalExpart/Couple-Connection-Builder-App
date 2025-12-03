import { useState } from 'react';
import { ArrowLeft, Check, Crown, Sparkles, Zap, Lock, ChevronRight } from 'lucide-react';
import { SubscriptionTier } from '../../App';
import { ConfirmationModal } from '../ConfirmationModal';

interface SubscriptionScreenProps {
  currentTier: SubscriptionTier;
  onBack: () => void;
  onSelectTier: (tier: SubscriptionTier) => void;
}

const FEATURES = {
  free: [
    '1 basic scan per week',
    'Basic compatibility score (0-100)',
    'Choose 3 question categories',
    '15 evaluation questions',
    '5-tier rating system',
    'View basic results',
    'Single scan mode only',
  ],
  premium: [
    'Unlimited Single Match Scans',
    'Full 10-category assessment (50 questions)',
    'Dual Scan mode (evaluate together)',
    'Unified & Independent category modes',
    'Complete scan history with search',
    'Detailed compatibility breakdown',
    'Red flag & yellow flag detection',
    'Category-by-category insights',
    'Compare up to 2 scans side-by-side',
    'Conversation tips & starters',
    'AI-powered rating guidance',
    'Export results to PDF',
    'Priority support',
  ],
  exclusive: [
    'Everything in Premium, plus:',
    'AI Relationship Coach (170+ keywords)',
    '24 coaching categories',
    'Context-aware learning',
    'Personalized advice based on scans',
    'Live date assistance ("Ask AI")',
    'Voice input for questions',
    'Multilingual translation support',
    'Future Potential Forecast',
    'Advanced compatibility analytics',
    'Unlimited Dual Scans',
    'Private session management',
    'Early access to new features',
    'VIP support',
  ],
};

export function SubscriptionScreen({ currentTier, onBack, onSelectTier }: SubscriptionScreenProps) {
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processingTier, setProcessingTier] = useState<SubscriptionTier | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingTier, setPendingTier] = useState<SubscriptionTier | null>(null);

  const isUpgrade = (tier: SubscriptionTier) => {
    const tierOrder = { free: 0, premium: 1, exclusive: 2 };
    return tierOrder[tier] > tierOrder[currentTier];
  };

  const getConfirmationContent = () => {
    if (!pendingTier) return { title: '', message: '', variant: 'info' as const };

    const isUpgrading = isUpgrade(pendingTier);

    if (isUpgrading) {
      // Upgrade confirmations
      if (pendingTier === 'premium') {
        return {
          title: 'Upgrade to Premium?',
          message: `Unlock unlimited scans, full breakdowns, red flag reports, and more for just ${getPriceDisplay('premium').price}${getPriceDisplay('premium').period}. You'll be charged immediately and can cancel anytime.`,
          variant: 'info' as const,
        };
      } else if (pendingTier === 'exclusive') {
        return {
          title: 'Upgrade to Exclusive?',
          message: `Get everything in Premium plus AI Relationship Coach, live date assistance, and advanced features for ${getPriceDisplay('exclusive').price}${getPriceDisplay('exclusive').period}. You'll be charged immediately and can cancel anytime.`,
          variant: 'info' as const,
        };
      }
    } else {
      // Downgrade confirmations
      if (pendingTier === 'free') {
        const features = currentTier === 'premium' 
          ? 'unlimited scans, red flag reports, scan history, and PDF exports'
          : 'AI Coach, unlimited scans, red flag reports, scan history, and all premium features';
        return {
          title: 'Downgrade to Free?',
          message: `You will lose access to ${features}. Your current plan will remain active until the end of your billing period.`,
          variant: 'warning' as const,
        };
      } else if (pendingTier === 'premium') {
        return {
          title: 'Downgrade to Premium?',
          message: 'You will lose access to AI Relationship Coach, live date assistance, and exclusive features. Your current plan will remain active until the end of your billing period.',
          variant: 'warning' as const,
        };
      }
    }

    return { title: '', message: '', variant: 'info' as const };
  };

  const handleSelectTier = (tier: SubscriptionTier) => {
    if (tier === currentTier) return;
    
    setPendingTier(tier);
    setShowConfirmModal(true);
  };

  const handleConfirmTierChange = () => {
    if (!pendingTier) return;

    setShowConfirmModal(false);
    setProcessingTier(pendingTier);

    // Simulate payment flow
    setTimeout(() => {
      onSelectTier(pendingTier);
      setProcessingTier(null);
      setPendingTier(null);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 1500);
  };

  const handleCancelTierChange = () => {
    setShowConfirmModal(false);
    setPendingTier(null);
  };

  const getPriceDisplay = (tier: 'premium' | 'exclusive') => {
    const prices = {
      premium: { monthly: 7.99, yearly: 79.99 },
      exclusive: { monthly: 14.99, yearly: 149.99 },
    };

    const price = prices[tier][selectedBilling];
    const perMonth = selectedBilling === 'yearly' ? (price / 12).toFixed(2) : price;

    return {
      price: selectedBilling === 'monthly' ? `$${price}` : `$${price}`,
      period: selectedBilling === 'monthly' ? '/month' : '/year',
      save: selectedBilling === 'yearly' ? 'Save 17%' : null,
      perMonth: selectedBilling === 'yearly' ? `$${perMonth}/mo` : null,
    };
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-20 relative overflow-hidden">
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
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm text-white">Current: {currentTier === 'free' ? 'Free' : currentTier === 'premium' ? 'Premium' : 'Exclusive'}</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl text-white mb-2">Choose Your Plan</h1>
            <p className="text-white/90">Find the perfect match with the right tools</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showConfirmation && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Subscription updated successfully!</span>
          </div>
        </div>
      )}

      <div className="px-6 -mt-12 relative z-10 space-y-6">
        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setSelectedBilling('monthly')}
              className={`px-6 py-3 rounded-xl transition-all ${
                selectedBilling === 'monthly'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedBilling('yearly')}
              className={`px-6 py-3 rounded-xl transition-all relative ${
                selectedBilling === 'yearly'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Free Tier */}
        <div className={`bg-white rounded-3xl shadow-lg border-2 transition-all ${
          currentTier === 'free' ? 'border-rose-300' : 'border-gray-200'
        }`}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl text-gray-900 mb-1">Free</h3>
                <p className="text-gray-600">Get started with basics</p>
              </div>
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>

            <div className="mb-6">
              <div className="text-4xl text-gray-900 mb-1">$0</div>
              <div className="text-gray-600">Forever free</div>
            </div>

            <ul className="space-y-3 mb-6">
              {FEATURES.free.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectTier('free')}
              disabled={currentTier === 'free'}
              className={`w-full py-4 rounded-2xl transition-all ${
                currentTier === 'free'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
              }`}
            >
              {currentTier === 'free' ? 'Current Plan' : 'Downgrade to Free'}
            </button>
          </div>
        </div>

        {/* Premium Tier */}
        <div className={`bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl shadow-2xl border-2 transform transition-all ${
          currentTier === 'premium' ? 'border-yellow-400 scale-[1.02]' : 'border-transparent hover:scale-[1.02]'
        }`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl m-1 p-6">
            {currentTier === 'premium' && (
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 mb-4">
                <Crown className="w-3 h-3" />
                Current Plan
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl text-gray-900">Premium</h3>
                  <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-0.5 rounded-lg text-xs">
                    Popular
                  </span>
                </div>
                <p className="text-gray-600">Unlock full compatibility insights</p>
              </div>
              <Crown className="w-8 h-8 text-rose-500" />
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <div className="text-4xl text-gray-900">{getPriceDisplay('premium').price}</div>
                <div className="text-gray-600">{getPriceDisplay('premium').period}</div>
              </div>
              {getPriceDisplay('premium').perMonth && (
                <div className="text-sm text-gray-500">{getPriceDisplay('premium').perMonth} billed annually</div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {FEATURES.premium.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectTier('premium')}
              disabled={currentTier === 'premium' || processingTier === 'premium'}
              className={`w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                currentTier === 'premium'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : processingTier === 'premium'
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg'
              }`}
            >
              {processingTier === 'premium' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : currentTier === 'premium' ? (
                'Current Plan'
              ) : currentTier === 'exclusive' ? (
                'Downgrade to Premium'
              ) : (
                'Upgrade to Premium'
              )}
            </button>
          </div>
        </div>

        {/* Exclusive Tier */}
        <div className={`bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 rounded-3xl shadow-2xl border-2 transform transition-all ${
          currentTier === 'exclusive' ? 'border-yellow-400 scale-[1.02]' : 'border-transparent hover:scale-[1.02]'
        }`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl m-1 p-6">
            {currentTier === 'exclusive' && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 mb-4">
                <Zap className="w-3 h-3" />
                Current Plan
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl text-gray-900">Exclusive</h3>
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-0.5 rounded-lg text-xs">
                    Best Value
                  </span>
                </div>
                <p className="text-gray-600">AI-powered relationship guidance</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <div className="text-4xl text-gray-900">{getPriceDisplay('exclusive').price}</div>
                <div className="text-gray-600">{getPriceDisplay('exclusive').period}</div>
              </div>
              {getPriceDisplay('exclusive').perMonth && (
                <div className="text-sm text-gray-500">{getPriceDisplay('exclusive').perMonth} billed annually</div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {FEATURES.exclusive.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectTier('exclusive')}
              disabled={currentTier === 'exclusive' || processingTier === 'exclusive'}
              className={`w-full py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                currentTier === 'exclusive'
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : processingTier === 'exclusive'
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
              }`}
            >
              {processingTier === 'exclusive' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : currentTier === 'exclusive' ? (
                'Current Plan'
              ) : (
                'Upgrade to Exclusive'
              )}
            </button>
          </div>
        </div>

        {/* Feature Comparison Link */}
        <button className="w-full bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all">
          <span className="text-gray-900">Compare all features</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        {/* FAQ or Trust Badges */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h3 className="text-lg text-gray-900 mb-4">Why upgrade?</h3>
          
          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl">
            <Crown className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <div>
              <h4 className="text-gray-900 mb-1">Unlimited Insights</h4>
              <p className="text-sm text-gray-600">Evaluate as many connections as you need without daily limits</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
            <Zap className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="text-gray-900 mb-1">AI-Powered Guidance</h4>
              <p className="text-sm text-gray-600">Get real-time advice from our relationship AI during your dates</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
            <Check className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="text-gray-900 mb-1">Cancel Anytime</h4>
              <p className="text-sm text-gray-600">No commitments. Pause or cancel your subscription at any time</p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center text-gray-600 text-sm p-4">
          <p>✨ 7-day money-back guarantee</p>
          <p className="text-xs text-gray-500 mt-1">Try risk-free. Cancel within 7 days for a full refund.</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title={getConfirmationContent().title}
        message={getConfirmationContent().message}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleConfirmTierChange}
        onCancel={handleCancelTierChange}
        variant={getConfirmationContent().variant}
      />
    </div>
  );
}