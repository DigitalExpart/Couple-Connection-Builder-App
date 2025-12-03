import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Flag } from 'lucide-react';
import { QUESTION_CATEGORIES, QuestionCategory } from './MatchScanFlowScreen';

interface DualScanFlowScreenProps {
  sessionId: string;
  role: 'A' | 'B';
  partnerName: string;
  userName: string;
  onComplete: (score: number, answers: DualScanAnswer[]) => void;
  onBack: () => void;
  selectedCategories: string[];
  interactionType: string;
}

export interface DualScanAnswer {
  question: string;
  category: string;
  rating: 'strong-match' | 'good' | 'neutral' | 'yellow-flag' | 'red-flag';
  notes?: string;
}

export function DualScanFlowScreen({ 
  sessionId, 
  role, 
  partnerName, 
  userName,
  onComplete, 
  onBack,
  selectedCategories,
  interactionType
}: DualScanFlowScreenProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<Array<{
    question: string; 
    category: string;
    categoryIcon: string;
    conversationStarter?: string;
  }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DualScanAnswer[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Select 20 random questions from selected categories with their conversation starters
    const allQuestions: Array<{
      question: string; 
      category: string;
      categoryIcon: string;
      conversationStarter?: string;
    }> = [];
    
    QUESTION_CATEGORIES.forEach((categoryData) => {
      if (selectedCategories.includes(categoryData.id)) {
        categoryData.questions.forEach((q, index) => {
          allQuestions.push({ 
            question: q, 
            category: categoryData.name,
            categoryIcon: categoryData.icon,
            conversationStarter: categoryData.conversationStarters?.[index]
          });
        });
      }
    });

    // Shuffle and take 20 (or all if less than 20)
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const questionsToUse = Math.min(20, allQuestions.length);
    setSelectedQuestions(shuffled.slice(0, questionsToUse));
  }, [selectedCategories]);

  const handleRating = (rating: DualScanAnswer['rating']) => {
    const newAnswer: DualScanAnswer = {
      question: selectedQuestions[currentIndex].question,
      category: selectedQuestions[currentIndex].category,
      rating,
      notes: notes.trim() || undefined,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setNotes('');
    setShowNotes(false);

    // Move to next question or complete
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate score
      const score = calculateScore(newAnswers);
      onComplete(score, newAnswers);
    }
  };

  const calculateScore = (answers: DualScanAnswer[]) => {
    const weights = {
      'strong-match': 100,
      'good': 75,
      'neutral': 50,
      'yellow-flag': 25,
      'red-flag': 0,
    };

    const total = answers.reduce((sum, answer) => sum + weights[answer.rating], 0);
    return Math.round(total / answers.length);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'strong-match': return 'from-emerald-500 to-green-500';
      case 'good': return 'from-blue-500 to-cyan-500';
      case 'neutral': return 'from-gray-400 to-gray-500';
      case 'yellow-flag': return 'from-amber-500 to-yellow-500';
      case 'red-flag': return 'from-red-500 to-rose-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentIndex];
  const progress = ((currentIndex + 1) / selectedQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl text-white mb-1">Evaluating {partnerName}</h1>
            <p className="text-white/90 text-sm">Question {currentIndex + 1} of {selectedQuestions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl text-white">{Math.round(progress)}%</div>
            <div className="text-xs text-white/90">Complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-md">
            {currentQuestion.categoryIcon} {currentQuestion.category}
          </span>
        </div>

        {/* Conversation Starter Tip */}
        {currentQuestion.conversationStarter && (
          <div className="mb-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-5 border border-cyan-100 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm text-cyan-900 mb-1">Try saying:</h4>
                <p className="text-sm text-cyan-800 leading-relaxed italic">
                  "{currentQuestion.conversationStarter}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          {/* Rating Options */}
          <div className="space-y-3">
            <button
              onClick={() => handleRating('strong-match')}
              className="w-full p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">💚 Strong Match</div>
                  <div className="text-sm text-white/90">This is definitely a positive sign</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRating('good')}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">💙 Good</div>
                  <div className="text-sm text-white/90">Looking promising</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRating('neutral')}
              className="w-full p-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">🤍 Neutral</div>
                  <div className="text-sm text-white/90">Neither positive nor negative</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRating('yellow-flag')}
              className="w-full p-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">💛 Yellow Flag</div>
                  <div className="text-sm text-white/90">Something to be aware of</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleRating('red-flag')}
              className="w-full p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">🚩 Red Flag</div>
                  <div className="text-sm text-white/90">This is a concern</div>
                </div>
              </div>
            </button>
          </div>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
          >
            {showNotes ? 'Hide Notes' : 'Add Notes (Optional)'}
          </button>

          {/* Notes Input */}
          {showNotes && (
            <div className="mt-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional thoughts..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>

        {/* Skip Info */}
        <div className="text-center text-sm text-gray-600">
          <p>Your answers are private and only visible to you</p>
        </div>
      </div>
    </div>
  );
}