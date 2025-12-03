import { ArrowLeft, Heart, MessageCircle, Users, Calendar, Activity, Palette, Type, Layout, Grid3x3, Zap, ArrowRight } from 'lucide-react';
import { Logo } from '../Logo';

interface StyleGuideScreenProps {
  onBack: () => void;
}

export function StyleGuideScreen({ onBack }: StyleGuideScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-1">
              <Logo size={64} />
            </div>
            <div>
              <h1 className="text-3xl">MyMatchIQ</h1>
              <p className="text-white/90 text-sm mt-1">Heart & Brain Working Together!</p>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            Make smarter dating decisions with clarity, confidence, and psychology-backed insights—before you invest your heart.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Brand Identity */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center">
              <Logo size={24} />
            </div>
            <h2 className="text-2xl text-gray-900">Brand Identity</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <h3 className="text-lg text-gray-900 mb-3">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Help users evaluate compatibility with clarity and confidence, reducing wasted time and detecting red flags early through guided, gamified questioning.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100">
              <h3 className="text-lg text-gray-900 mb-3">Core Values</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  <span>Clarity over confusion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  <span>Psychology-backed insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  <span>Playful but respectful</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">•</span>
                  <span>Safety and trust first</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl text-gray-900">Color Palette</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-3">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-rose-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Rose 500</p>
                  <p className="text-xs text-gray-500 font-mono">#F43F5E</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-pink-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Pink 500</p>
                  <p className="text-xs text-gray-500 font-mono">#EC4899</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-purple-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Purple 500</p>
                  <p className="text-xs text-gray-500 font-mono">#A855F7</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-purple-600 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Purple 600</p>
                  <p className="text-xs text-gray-500 font-mono">#9333EA</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-rose-600 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Rose 600</p>
                  <p className="text-xs text-gray-500 font-mono">#E11D48</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-3">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-emerald-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Strong Match</p>
                  <p className="text-xs text-gray-500 font-mono">#10B981</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-blue-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Good Answer</p>
                  <p className="text-xs text-gray-500 font-mono">#3B82F6</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-gray-400 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Neutral</p>
                  <p className="text-xs text-gray-500 font-mono">#9CA3AF</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-amber-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Yellow Flag</p>
                  <p className="text-xs text-gray-500 font-mono">#F59E0B</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-red-500 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Red Flag</p>
                  <p className="text-xs text-gray-500 font-mono">#EF4444</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-3">Neutrals</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-gray-900 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Gray 900</p>
                  <p className="text-xs text-gray-500 font-mono">#111827</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-gray-600 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Gray 600</p>
                  <p className="text-xs text-gray-500 font-mono">#4B5563</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-gray-400 rounded-2xl shadow-lg"></div>
                  <p className="text-sm text-gray-900">Gray 400</p>
                  <p className="text-xs text-gray-500 font-mono">#9CA3AF</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-gray-100 rounded-2xl shadow-lg border border-gray-200"></div>
                  <p className="text-sm text-gray-900">Gray 100</p>
                  <p className="text-xs text-gray-500 font-mono">#F3F4F6</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-white rounded-2xl shadow-lg border border-gray-200"></div>
                  <p className="text-sm text-gray-900">White</p>
                  <p className="text-xs text-gray-500 font-mono">#FFFFFF</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl text-gray-900">Typography</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-4xl text-gray-900 mb-2">Heading 1 / Display</p>
              <p className="text-sm text-gray-500 font-mono">text-4xl / 36px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-3xl text-gray-900 mb-2">Heading 2</p>
              <p className="text-sm text-gray-500 font-mono">text-3xl / 30px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-2xl text-gray-900 mb-2">Heading 3</p>
              <p className="text-sm text-gray-500 font-mono">text-2xl / 24px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-xl text-gray-900 mb-2">Heading 4</p>
              <p className="text-sm text-gray-500 font-mono">text-xl / 20px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-lg text-gray-900 mb-2">Body Large</p>
              <p className="text-sm text-gray-500 font-mono">text-lg / 18px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-base text-gray-900 mb-2">Body Regular</p>
              <p className="text-sm text-gray-500 font-mono">text-base / 16px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-sm text-gray-900 mb-2">Body Small</p>
              <p className="text-sm text-gray-500 font-mono">text-sm / 14px</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <p className="text-xs text-gray-900 mb-2">Caption / Label</p>
              <p className="text-sm text-gray-500 font-mono">text-xs / 12px</p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl text-gray-900">Core Components</h2>
          </div>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  Primary Button
                </button>
                <button className="px-6 py-3 bg-white text-rose-600 rounded-2xl shadow-md border border-rose-200 hover:shadow-lg transition-all">
                  Secondary Button
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-200 transition-all">
                  Tertiary Button
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-400 rounded-2xl cursor-not-allowed">
                  Disabled Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Cards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                  <h4 className="text-gray-900 mb-2">Standard Card</h4>
                  <p className="text-sm text-gray-600">Clean white background with subtle shadow and rounded corners.</p>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-3xl border border-rose-100">
                  <h4 className="text-gray-900 mb-2">Highlighted Card</h4>
                  <p className="text-sm text-gray-600">Gradient background for emphasis and visual hierarchy.</p>
                </div>
              </div>
            </div>

            {/* Rating Icons */}
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Rating Icons</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                    ❤️
                  </div>
                  <span className="text-sm text-gray-600">Strong Match</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
                    👍
                  </div>
                  <span className="text-sm text-gray-600">Good Answer</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                    🤔
                  </div>
                  <span className="text-sm text-gray-600">Neutral</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">
                    ⚠️
                  </div>
                  <span className="text-sm text-gray-600">Yellow Flag</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
                    🚩
                  </div>
                  <span className="text-sm text-gray-600">Red Flag</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Grid3x3 className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl text-gray-900">Spacing & Layout</h2>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100 space-y-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-3">Border Radius</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-lg shadow-md"></div>
                  <span className="text-sm text-gray-600">rounded-lg / 8px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-md"></div>
                  <span className="text-sm text-gray-600">rounded-xl / 12px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md"></div>
                  <span className="text-sm text-gray-600">rounded-2xl / 16px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-md"></div>
                  <span className="text-sm text-gray-600">rounded-3xl / 24px</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-3">Shadows</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-20 bg-white rounded-2xl shadow-sm"></div>
                <div className="w-32 h-20 bg-white rounded-2xl shadow-md"></div>
                <div className="w-32 h-20 bg-white rounded-2xl shadow-lg"></div>
                <div className="w-32 h-20 bg-white rounded-2xl shadow-xl"></div>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="w-32 text-center">shadow-sm</span>
                <span className="w-32 text-center">shadow-md</span>
                <span className="w-32 text-center">shadow-lg</span>
                <span className="w-32 text-center">shadow-xl</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl text-gray-900">See It In Action</h2>
          </div>

          <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-8 rounded-3xl shadow-xl">
            <h3 className="text-white text-xl mb-3">Experience the Full App</h3>
            <p className="text-white/90 mb-6">
              Navigate through complete user flows including onboarding, match scanning, and results analysis.
            </p>
            <button 
              onClick={() => onBack()}
              className="w-full md:w-auto px-8 py-4 bg-white text-rose-600 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Launch Interactive Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}