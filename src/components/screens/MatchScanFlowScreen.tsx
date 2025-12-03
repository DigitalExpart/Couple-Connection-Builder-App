import { useState } from 'react';
import { ArrowLeft, MessageSquare, Phone, Video, MessageCircle, Zap, Check, Shuffle, Hand } from 'lucide-react';
import { MatchScan, ScanAnswer } from '../../App';
import { QuestionCardFlow } from '../QuestionCardFlow';
import { useLanguage } from '../../contexts/LanguageContext';

interface MatchScanFlowScreenProps {
  onComplete: (scan: MatchScan) => void;
  onBack: () => void;
  existingScan?: MatchScan;
}

type InteractionType = 'text' | 'call' | 'date' | 'video' | 'dm';

const INTERACTION_TYPES = [
  { id: 'text' as InteractionType, name: 'Text/Chat', icon: MessageSquare, color: 'blue' },
  { id: 'call' as InteractionType, name: 'Phone Call', icon: Phone, color: 'purple' },
  { id: 'date' as InteractionType, name: 'First Date', icon: '❤️', color: 'rose', emoji: true },
  { id: 'video' as InteractionType, name: 'Video Call', icon: Video, color: 'pink' },
  { id: 'dm' as InteractionType, name: 'Social Media DM', icon: MessageCircle, color: 'cyan' },
];

export interface QuestionCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questions: string[];
  conversationStarters?: string[];
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  { 
    id: 'emotional', 
    name: 'Emotional Maturity', 
    description: 'Assess emotional intelligence and self-awareness',
    icon: '🧠',
    color: 'purple',
    questions: [
      "How do they describe handling difficult emotions or stress?",
      "What do they say about their past relationships?",
      "How do they react when discussing vulnerable topics?",
      "Do they take accountability for their actions?",
      "How do they express their feelings and needs?",
    ],
    conversationStarters: [
      "So, when you're stressed or overwhelmed, what helps you cope?",
      "I'm curious about your past relationships - what did you learn from them?",
      "Can we talk about something a bit deeper? How do you handle vulnerability?",
      "I really respect when people own their mistakes. How do you typically handle it when things don't go as planned?",
      "How do you usually express what you're feeling or what you need?"
    ]
  },
  { 
    id: 'values', 
    name: 'Values & Lifestyle', 
    description: 'Evaluate core values and life priorities',
    icon: '⭐',
    color: 'amber',
    questions: [
      "What do they say they value most in life?",
      "How do they prioritize work, family, and personal time?",
      "What are their views on important life decisions?",
      "How do they spend their free time?",
      "What are their long-term lifestyle goals?",
    ],
    conversationStarters: [
      "What matters most to you in life? Like, what do you really value?",
      "How do you balance work, family time, and your own personal space?",
      "I'd love to hear your perspective on [topic relevant to you both].",
      "What do you like to do when you have free time?",
      "Where do you see your life heading in the next few years?"
    ]
  },
  { 
    id: 'communication', 
    name: 'Communication Style', 
    description: 'Understand how they communicate and connect',
    icon: '💬',
    color: 'blue',
    questions: [
      "How clearly do they express themselves?",
      "Do they listen actively when you speak?",
      "How do they handle disagreements?",
      "Are they comfortable with deeper conversations?",
      "Do they ask thoughtful questions about you?",
    ],
    conversationStarters: [
      "Tell me more about that...",
      "[Share something and observe if they really listen and follow up]",
      "Hey, I noticed we see that differently. How do you feel about it?",
      "Can I ask you something kind of personal?",
      "[Let them lead and see if they ask about your life, interests, feelings]"
    ]
  },
  { 
    id: 'finance', 
    name: 'Finance & Money', 
    description: 'Assess financial responsibility and money values',
    icon: '💰',
    color: 'green',
    questions: [
      "What is their approach to saving and spending money?",
      "How do they handle financial planning and budgeting?",
      "What are their views on sharing financial responsibilities?",
      "Do they have any concerning debt or money issues?",
      "How transparent are they about their financial situation?",
    ],
    conversationStarters: [
      "Are you more of a saver or a spender? I'm trying to figure out my own money habits.",
      "Do you have any financial goals you're working toward?",
      "How do you think couples should handle finances together?",
      "Money can be stressful - are you dealing with any financial challenges right now?",
      "Are you comfortable talking about money stuff?"
    ]
  },
  { 
    id: 'relationship', 
    name: 'Relationship Outlook', 
    description: 'Understand their relationship goals and expectations',
    icon: '💕',
    color: 'rose',
    questions: [
      "What are they looking for in a relationship?",
      "How do they define commitment and exclusivity?",
      "What is their timeline for relationship milestones?",
      "How do they view compromise and partnership?",
      "What role do they want a partner to play in their life?",
    ],
    conversationStarters: [
      "What are you hoping to find in a relationship right now?",
      "When you think about commitment, what does that mean to you?",
      "Do you have a sense of how you see things progressing - like kids, marriage, all that?",
      "What does being a good partner look like to you?",
      "How would you describe the role you want someone to play in your life?"
    ]
  },
  { 
    id: 'intimacy', 
    name: 'Intimacy & Affection', 
    description: 'Evaluate physical and emotional intimacy compatibility',
    icon: '💋',
    color: 'fuchsia',
    questions: [
      "How do they express physical affection?",
      "What are their views on intimacy in relationships?",
      "How comfortable are they discussing intimacy needs?",
      "Do they respect your pace and boundaries around intimacy?",
      "How do they balance emotional and physical connection?",
    ],
    conversationStarters: [
      "I'm a really [affectionate/not super touchy] person - what about you?",
      "What does intimacy mean to you in a relationship?",
      "Can we talk about physical stuff? I want to make sure we're on the same page.",
      "[Set a boundary and observe their reaction]",
      "Do you think emotional connection and physical connection go hand in hand?"
    ]
  },
  { 
    id: 'family', 
    name: 'Family & Background', 
    description: 'Understand family dynamics and future family goals',
    icon: '👨‍👩‍👧‍👦',
    color: 'cyan',
    questions: [
      "How do they describe their relationship with their family?",
      "What role does family play in their life decisions?",
      "What are their views on having children (timing, parenting)?",
      "How do they handle family obligations and boundaries?",
      "Do their family values align with yours?",
    ],
    conversationStarters: [
      "Tell me about your family - are you close with them?",
      "Does your family have a big influence on the decisions you make?",
      "Do you see yourself having kids someday? What's your timeline on that?",
      "How do you handle it when family expectations don't match what you want?",
      "What values did you grow up with that still guide you today?"
    ]
  },
  { 
    id: 'future', 
    name: 'Future Goals', 
    description: 'Check alignment on future plans and aspirations',
    icon: '🎯',
    color: 'emerald',
    questions: [
      "What are their career and personal goals?",
      "What do they say about their ideal future?",
      "Where do they see themselves in 5 years?",
      "How do they approach personal growth and development?",
      "What legacy or impact do they want to create?",
    ],
    conversationStarters: [
      "What are you working toward right now - like career-wise or personally?",
      "If everything went perfectly, what would your life look like in a few years?",
      "Where do you see yourself five years from now?",
      "Are you someone who focuses on personal growth and self-improvement?",
      "What kind of impact do you want to make in the world?"
    ]
  },
  { 
    id: 'safety', 
    name: 'Safety & Red Flags', 
    description: 'Identify potential warning signs early',
    icon: '🚩',
    color: 'red',
    questions: [
      "Do they respect your boundaries?",
      "Are there any controlling or possessive behaviors?",
      "How do they speak about others (exes, friends)?",
      "Do they pressure you for anything?",
      "Is there any dishonesty or inconsistency?",
    ],
    conversationStarters: [
      "[Set a small boundary and observe their reaction]",
      "[Notice if they question who you're with, check your phone, or act possessive]",
      "What went wrong in your past relationships?",
      "[Pay attention if they push for more than you're ready for]",
      "[Watch for inconsistencies in their stories or behaviors]"
    ]
  },
  { 
    id: 'connection', 
    name: 'Connection & Chemistry', 
    description: 'Evaluate overall compatibility and spark',
    icon: '✨',
    color: 'pink',
    questions: [
      "What's their overall energy and engagement level?",
      "Do they show genuine interest in getting to know you?",
      "How authentic do they seem in their responses?",
      "What's your gut feeling about this connection?",
      "Do you feel comfortable and at ease with them?",
    ],
    conversationStarters: [
      "[Observe their energy - are they engaged and present?]",
      "[Notice if they ask questions about you and remember details]",
      "[Trust your instincts - do they feel genuine or performative?]",
      "[Check in with yourself - what is your gut saying?]",
      "[Notice if you can be yourself around them]"
    ]
  },
];

export function MatchScanFlowScreen({ onComplete, onBack, existingScan }: MatchScanFlowScreenProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'type' | 'name' | 'categories' | 'questions'>(existingScan ? 'questions' : 'type');
  const [interactionType, setInteractionType] = useState<InteractionType | null>(
    existingScan 
      ? INTERACTION_TYPES.find(t => t.name === existingScan.interactionType)?.id || null 
      : null
  );
  const [personName, setPersonName] = useState(existingScan?.name || '');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    existingScan ? QUESTION_CATEGORIES.map(cat => cat.id) : []
  );
  const [isRandomMode, setIsRandomMode] = useState(false);
  
  const RANDOM_QUESTION_COUNT = 15;

  const handleSelectType = (type: InteractionType) => {
    setInteractionType(type);
    setStep('name');
  };

  const handleContinueToCategories = () => {
    if (personName.trim()) {
      setStep('categories');
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const selectAllCategories = () => {
    setSelectedCategoryIds(QUESTION_CATEGORIES.map(cat => cat.id));
  };

  const deselectAllCategories = () => {
    setSelectedCategoryIds([]);
  };

  const handleStartQuestions = () => {
    if (isRandomMode || selectedCategoryIds.length > 0) {
      setStep('questions');
    }
  };
  
  // Generate random questions when in random mode
  const getRandomCategories = () => {
    if (!isRandomMode) {
      return selectedCategories;
    }
    
    // Collect all questions with their category info
    const allQuestionsWithCategory: Array<{ question: string; category: QuestionCategory; categoryName: string }> = [];
    QUESTION_CATEGORIES.forEach(cat => {
      cat.questions.forEach(q => {
        allQuestionsWithCategory.push({
          question: q,
          category: cat,
          categoryName: cat.name
        });
      });
    });
    
    // Shuffle and pick random questions
    const shuffled = allQuestionsWithCategory.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, RANDOM_QUESTION_COUNT);
    
    // Group back into categories
    const categoryMap = new Map<string, QuestionCategory>();
    selectedQuestions.forEach(item => {
      if (!categoryMap.has(item.category.id)) {
        categoryMap.set(item.category.id, {
          ...item.category,
          questions: []
        });
      }
      categoryMap.get(item.category.id)!.questions.push(item.question);
    });
    
    return Array.from(categoryMap.values());
  };

  const selectedCategories = isRandomMode ? getRandomCategories() : QUESTION_CATEGORIES.filter(cat => selectedCategoryIds.includes(cat.id));
  const totalQuestions = isRandomMode ? RANDOM_QUESTION_COUNT : selectedCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  const handleCompleteQuestions = (answers: ScanAnswer[], categoriesCompleted: string[]) => {
    // Calculate score based on ratings
    const ratingScores = {
      'strong-match': 100,
      'good': 75,
      'neutral': 50,
      'yellow-flag': 25,
      'red-flag': 0,
    };

    const totalScore = answers.reduce((sum, answer) => sum + ratingScores[answer.rating], 0);
    const averageScore = Math.round(totalScore / answers.length);

    // Determine category
    let category: MatchScan['category'];
    if (averageScore >= 85) category = 'high-potential';
    else if (averageScore >= 65) category = 'worth-exploring';
    else if (averageScore >= 45) category = 'mixed-signals';
    else if (averageScore >= 25) category = 'caution';
    else category = 'high-risk';

    const scan: MatchScan = {
      id: existingScan?.id || Date.now().toString(),
      name: personName,
      date: existingScan?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score: averageScore,
      category,
      interactionType: INTERACTION_TYPES.find(t => t.id === interactionType)?.name || '',
      deck: 'Complete Assessment',
      answers,
      categoriesCompleted,
    };

    onComplete(scan);
  };

  if (step === 'questions') {
    return (
      <QuestionCardFlow
        categories={selectedCategories}
        personName={personName}
        onComplete={handleCompleteQuestions}
        onBack={onBack}
        existingAnswers={existingScan?.answers}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl text-white mb-2">New Match Scan</h1>
        <p className="text-white/90">
          {step === 'type' && 'Select how you\'re interacting'}
          {step === 'name' && 'Who are you evaluating?'}
          {step === 'categories' && 'Select categories to evaluate'}
        </p>
      </div>

      <div className="px-6 py-8 space-y-4">
        {/* Interaction Type Selection */}
        {step === 'type' && (
          <>
            {INTERACTION_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type.id)}
                  className="w-full bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-${type.color}-100 rounded-2xl flex items-center justify-center`}>
                        {type.emoji ? (
                          <span className="text-2xl">{Icon as string}</span>
                        ) : (
                          <Icon className={`w-7 h-7 text-${type.color}-600`} />
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg text-gray-900">{type.name}</h3>
                      </div>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform rotate-180" />
                  </div>
                </button>
              );
            })}
          </>
        )}

        {/* Name Input */}
        {step === 'name' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-xl text-gray-900 mb-6 text-center">Who are you evaluating?</h2>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Enter their name"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 text-center text-lg mb-6"
                autoFocus
              />
              
              {/* Info about comprehensive assessment */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-100 mb-6">
                <h3 className="text-sm text-purple-900 mb-2">📊 Comprehensive Assessment</h3>
                <p className="text-xs text-purple-700 leading-relaxed mb-3">
                  You'll evaluate {personName || 'them'} across {QUESTION_CATEGORIES.length} key categories with {QUESTION_CATEGORIES.reduce((sum, cat) => sum + cat.questions.length, 0)} total questions:
                </p>
                <div className="space-y-1.5">
                  {QUESTION_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex items-center gap-2 text-xs text-purple-800">
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.name} ({cat.questions.length} questions)</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-purple-700 leading-relaxed mt-3">
                  💡 You can finish early at any time to get results based on answered questions.
                </p>
              </div>
              
              <button
                onClick={handleContinueToCategories}
                disabled={!personName.trim()}
                className={`w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  personName.trim()
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="text-lg">Select Categories</span>
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Category Selection */}
        {step === 'categories' && (
          <div className="max-w-md mx-auto pb-32">
            <div className="bg-white p-8 rounded-3xl shadow-lg mb-6">
              <h2 className="text-xl text-gray-900 mb-3 text-center">{t('categorySelection.title')}</h2>
              <p className="text-sm text-gray-600 text-center mb-6">{t('categorySelection.subtitle')}</p>
              
              {/* Selection Mode Toggle */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-700 mb-3 text-center">{t('randomMode.title')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Manual Selection */}
                  <button
                    onClick={() => setIsRandomMode(false)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      !isRandomMode
                        ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Hand className={`w-5 h-5 ${!isRandomMode ? 'text-rose-600' : 'text-gray-400'}`} />
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        !isRandomMode
                          ? 'bg-rose-500 scale-110'
                          : 'bg-gray-200'
                      }`}>
                        {!isRandomMode && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <h4 className={`text-sm mb-1 ${!isRandomMode ? 'text-rose-900' : 'text-gray-900'}`}>
                      {t('randomMode.manual')}
                    </h4>
                    <p className={`text-xs leading-relaxed ${!isRandomMode ? 'text-rose-700' : 'text-gray-500'}`}>
                      {t('randomMode.manualDesc')}
                    </p>
                  </button>

                  {/* Random Selection */}
                  <button
                    onClick={() => setIsRandomMode(true)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      isRandomMode
                        ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-violet-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Shuffle className={`w-5 h-5 ${isRandomMode ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isRandomMode
                          ? 'bg-purple-500 scale-110'
                          : 'bg-gray-200'
                      }`}>
                        {isRandomMode && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <h4 className={`text-sm mb-1 ${isRandomMode ? 'text-purple-900' : 'text-gray-900'}`}>
                      {t('randomMode.random')}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isRandomMode ? 'text-purple-700' : 'text-gray-500'}`}>
                      {t('randomMode.randomDesc')}
                    </p>
                  </button>
                </div>
              </div>

              {/* Random Mode Info */}
              {isRandomMode && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-100 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shuffle className="w-4 h-4 text-purple-600" />
                    <h3 className="text-sm text-purple-900">{t('randomMode.random')}</h3>
                  </div>
                  <p className="text-xs text-purple-700 leading-relaxed mb-3">
                    {t('randomMode.info').replace('{count}', RANDOM_QUESTION_COUNT.toString())}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-purple-800">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span>{t('randomMode.benefit1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-800">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span>{t('randomMode.benefit2')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-800">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      <span>{t('randomMode.benefit3')}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Manual Mode - Category Selection */}
              {!isRandomMode && (
                <>
                  {/* Quick Actions */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <button
                      onClick={selectAllCategories}
                      className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm rounded-xl hover:shadow-lg transition-all"
                    >
                      {t('categorySelection.selectAll')}
                    </button>
                    <button
                      onClick={deselectAllCategories}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition-all"
                    >
                      {t('categorySelection.clearAll')}
                    </button>
                  </div>
                  
                  {/* Category List */}
                  <div className="space-y-3 mb-6">
                    {QUESTION_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategoryIds.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all text-left group ${
                            isSelected
                              ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelected 
                                ? `bg-${cat.color}-100 scale-105` 
                                : `bg-${cat.color}-50 group-hover:scale-105`
                            }`}>
                              <span className="text-2xl">{cat.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`text-base transition-colors ${
                                  isSelected ? 'text-rose-900' : 'text-gray-900'
                                }`}>{cat.name}</h3>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected
                                    ? 'bg-rose-500 scale-110'
                                    : 'bg-gray-200 group-hover:bg-gray-300'
                                }`}>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-white" />
                                  )}
                                </div>
                              </div>
                              <p className={`text-xs leading-relaxed ${
                                isSelected ? 'text-rose-700' : 'text-gray-500'
                              }`}>{cat.description}</p>
                              <p className={`text-xs mt-1 ${
                                isSelected ? 'text-rose-600' : 'text-gray-400'
                              }`}>{cat.questions.length} {t('categorySelection.questions')}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Info about selected categories */}
                  {selectedCategoryIds.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-2xl border border-purple-100 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm text-purple-900">📊 {t('categorySelection.summary')}</h3>
                        <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg">
                          {selectedCategoryIds.length} {selectedCategoryIds.length === 1 ? t('categorySelection.category') : t('categorySelection.categories')}
                        </span>
                      </div>
                      <p className="text-xs text-purple-700 leading-relaxed">
                        {t('categorySelection.questionsTotal').replace('{count}', totalQuestions.toString())}
                      </p>
                    </div>
                  )}
                </>
              )}
              
              <button
                onClick={handleStartQuestions}
                disabled={!isRandomMode && selectedCategoryIds.length === 0}
                className={`w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  isRandomMode || selectedCategoryIds.length > 0
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="text-lg">
                  {!isRandomMode && selectedCategoryIds.length === 0
                    ? t('categorySelection.selectAtLeastOne')
                    : isRandomMode
                    ? t('randomMode.startRandom')
                    : t('categorySelection.startAssessment').replace('{count}', totalQuestions.toString())}
                </span>
                {(isRandomMode || selectedCategoryIds.length > 0) && <Zap className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}