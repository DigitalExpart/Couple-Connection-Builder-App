import { ArrowLeft, User, Users, Sparkles, Zap, Heart, TrendingUp } from 'lucide-react';

interface ScanTypeSelectionScreenProps {
  onBack: () => void;
  onSelectSingleScan: () => void;
  onSelectDualScan: () => void;
}

export function ScanTypeSelectionScreen({ onBack, onSelectSingleScan, onSelectDualScan }: ScanTypeSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-white" />
          <h1 className="text-2xl text-white">Choose Scan Type</h1>
        </div>
        <p className="text-white/90">How would you like to evaluate compatibility?</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Single Scan Card */}
        <button
          onClick={onSelectSingleScan}
          className="w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 text-left group"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <User className="w-7 h-7 text-rose-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl text-gray-900">Single Scan</h3>
                <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full text-xs">Classic</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Evaluate someone you're interested in by yourself
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Quick & Private</p>
                <p className="text-xs text-gray-600">Answer questions on your own</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-3 h-3 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Instant Results</p>
                <p className="text-xs text-gray-600">Get your compatibility score immediately</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-3 h-3 text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Full Analysis</p>
                <p className="text-xs text-gray-600">Category breakdown, red flags, and insights</p>
              </div>
            </div>
          </div>

          {/* Best For */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100">
            <p className="text-xs text-gray-700">
              <span className="text-rose-700">✨ Best for:</span> First dates, early conversations, or when you want to track your own observations
            </p>
          </div>

          {/* CTA */}
          <div className="mt-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl text-center group-hover:shadow-lg transition-all">
            Start Single Scan →
          </div>
        </button>

        {/* Dual Scan Card */}
        <button
          onClick={onSelectDualScan}
          className="w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 text-left group relative overflow-hidden"
        >
          {/* New Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs shadow-lg">
            NEW ✨
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <div className="flex-1 pr-16">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl text-gray-900">Dual Scan</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Gamified</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Invite your match to evaluate each other together
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Interactive & Fun</p>
                <p className="text-xs text-gray-600">Both answer questions about each other</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Privacy Protected</p>
                <p className="text-xs text-gray-600">See only your own answers until you reveal</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Heart className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Compare & Discuss</p>
                <p className="text-xs text-gray-600">Optionally reveal results and compare together</p>
              </div>
            </div>
          </div>

          {/* Best For */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-xs text-gray-700">
              <span className="text-purple-700">🎮 Best for:</span> Dating someone, deeper connection, or turning compatibility into a shared experience
            </p>
          </div>

          {/* CTA */}
          <div className="mt-4 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl text-center group-hover:shadow-lg transition-all">
            Start Dual Scan →
          </div>
        </button>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Not Sure Which to Choose?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Start with a <strong>Single Scan</strong> for your first few dates, then graduate to <strong>Dual Scan</strong> when you're both ready to share insights together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
