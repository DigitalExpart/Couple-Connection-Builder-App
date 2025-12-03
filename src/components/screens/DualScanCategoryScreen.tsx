import { ArrowLeft, Check, Sparkles, Users, User } from 'lucide-react';
import { useState } from 'react';
import { QUESTION_CATEGORIES, QuestionCategory } from './MatchScanFlowScreen';

interface DualScanCategoryScreenProps {
  onBack: () => void;
  onContinue: (selectedCategories: string[], isUnified: boolean) => void;
  partnerName: string;
}

export function DualScanCategoryScreen({ onBack, onContinue, partnerName }: DualScanCategoryScreenProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isUnified, setIsUnified] = useState(true);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const selectAll = () => {
    setSelectedCategories(QUESTION_CATEGORIES.map(cat => cat.id));
  };

  const clearAll = () => {
    setSelectedCategories([]);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: { [key: string]: { bg: string; border: string; text: string; selectedBg: string } } = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', selectedBg: 'bg-gradient-to-br from-purple-500 to-purple-600' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', selectedBg: 'bg-gradient-to-br from-amber-500 to-amber-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', selectedBg: 'bg-gradient-to-br from-blue-500 to-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', selectedBg: 'bg-gradient-to-br from-green-500 to-green-600' },
      rose: { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-700', selectedBg: 'bg-gradient-to-br from-rose-500 to-rose-600' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', selectedBg: 'bg-gradient-to-br from-pink-500 to-pink-600' },
      cyan: { bg: 'bg-cyan-50', border: 'border-cyan-300', text: 'text-cyan-700', selectedBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-300', text: 'text-indigo-700', selectedBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', selectedBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', selectedBg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    };

    return colorMap[color] || colorMap.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-white" />
          <h1 className="text-2xl text-white">Choose Categories</h1>
        </div>
        <p className="text-white/90">What do you want to evaluate about {partnerName}?</p>
      </div>

      <div className="px-6 py-6">
        {/* Category Mode Toggle */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Category Mode</h3>
              <p className="text-sm text-gray-600">How should categories be selected?</p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsUnified(true)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isUnified
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-transparent shadow-lg'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Users className={`w-6 h-6 ${isUnified ? 'text-white' : 'text-purple-600'}`} />
                <div className="text-center">
                  <div className={`text-sm ${isUnified ? 'text-white' : 'text-gray-900'}`}>Unified</div>
                  <div className={`text-xs ${isUnified ? 'text-white/90' : 'text-gray-600'}`}>Same for both</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsUnified(false)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                !isUnified
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-transparent shadow-lg'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <User className={`w-6 h-6 ${!isUnified ? 'text-white' : 'text-purple-600'}`} />
                <div className="text-center">
                  <div className={`text-sm ${!isUnified ? 'text-white' : 'text-gray-900'}`}>Independent</div>
                  <div className={`text-xs ${!isUnified ? 'text-white/90' : 'text-gray-600'}`}>Choose your own</div>
                </div>
              </div>
            </button>
          </div>

          {/* Description */}
          <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            {isUnified ? (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">
                    <strong>Unified Categories</strong>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Both you and {partnerName} will evaluate the <strong>same categories</strong>. This makes it easier to compare your perspectives on the same topics.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">
                    <strong>Independent Categories</strong>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    You and {partnerName} can each <strong>choose different categories</strong> to evaluate. Each person focuses on what matters most to them.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={selectAll}
            className="flex-1 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition-all"
          >
            Select All ({QUESTION_CATEGORIES.length})
          </button>
          <button
            onClick={clearAll}
            className="flex-1 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Clear All
          </button>
        </div>

        {/* Selected Count */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Selected Categories</p>
              <p className="text-sm text-gray-600">
                {selectedCategories.length === 0 
                  ? 'Choose at least 1 category' 
                  : `${selectedCategories.length} ${selectedCategories.length === 1 ? 'category' : 'categories'} selected`}
              </p>
            </div>
            <div className="text-3xl">
              {selectedCategories.length > 0 ? '✅' : '⭕'}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-3 mb-6">
          {QUESTION_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            const colors = getColorClasses(category.color, isSelected);

            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`w-full rounded-2xl p-5 transition-all text-left border-2 ${
                  isSelected
                    ? `${colors.selectedBg} text-white border-transparent shadow-xl scale-[1.02]`
                    : `bg-white ${colors.bg} ${colors.border} hover:shadow-lg`
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl flex-shrink-0 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`${isSelected ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'} leading-relaxed`}>
                      {category.description}
                    </p>
                    <p className={`text-xs mt-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.questions.length} questions
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20' : colors.bg
                  }`}>
                    {isSelected && <Check className="w-5 h-5 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onContinue(selectedCategories, isUnified)}
          disabled={selectedCategories.length === 0}
          className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {selectedCategories.length === 0 
            ? 'Select at least 1 category' 
            : isUnified 
              ? `Continue with ${selectedCategories.length} ${selectedCategories.length === 1 ? 'Category' : 'Categories'} (Unified)`
              : `Continue with ${selectedCategories.length} ${selectedCategories.length === 1 ? 'Category' : 'Categories'} (Independent)`}
        </button>

        {/* Info */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <p className="text-sm text-purple-900 leading-relaxed">
            💡 <strong>Tip:</strong> We recommend selecting at least 3-5 categories for a comprehensive evaluation. You can always do another scan later with different categories!
          </p>
        </div>
      </div>
    </div>
  );
}