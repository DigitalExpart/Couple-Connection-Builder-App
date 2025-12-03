import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Lightbulb, Sparkles, Flag, SkipForward } from 'lucide-react';
import { ScanAnswer } from '../App';
import { QuestionCategory } from './screens/MatchScanFlowScreen';
import { useLanguage } from '../contexts/LanguageContext';

interface QuestionCardFlowProps {
  categories: QuestionCategory[];
  personName: string;
  onComplete: (answers: ScanAnswer[], categoriesCompleted: string[]) => void;
  onBack: () => void;
  existingAnswers?: ScanAnswer[];
}

type Rating = 'strong-match' | 'good' | 'neutral' | 'yellow-flag' | 'red-flag';

const RATINGS = [
  { 
    id: 'strong-match' as Rating, 
    label: 'Strong Match', 
    emoji: '❤️', 
    color: 'emerald', 
    bgColor: 'bg-emerald-100', 
    textColor: 'text-emerald-700',
    description: 'Gave thoughtful, detailed response with specific examples'
  },
  { 
    id: 'good' as Rating, 
    label: 'Good Answer', 
    emoji: '👍', 
    color: 'blue', 
    bgColor: 'bg-blue-100', 
    textColor: 'text-blue-700',
    description: 'Answered clearly and positively, showed effort'
  },
  { 
    id: 'neutral' as Rating, 
    label: 'Unclear/Neutral', 
    emoji: '🤔', 
    color: 'gray', 
    bgColor: 'bg-gray-200', 
    textColor: 'text-gray-700',
    description: 'Gave vague or minimal response, avoided details'
  },
  { 
    id: 'yellow-flag' as Rating, 
    label: 'Yellow Flag', 
    emoji: '⚠️', 
    color: 'amber', 
    bgColor: 'bg-amber-100', 
    textColor: 'text-amber-700',
    description: 'Showed concerning behavior or deflected the question'
  },
  { 
    id: 'red-flag' as Rating, 
    label: 'Red Flag', 
    emoji: '🚩', 
    color: 'red', 
    bgColor: 'bg-red-100', 
    textColor: 'text-red-700',
    description: 'Blamed others, got defensive, or showed toxic patterns'
  },
];

// AI-powered guidance for different question types
const getQuestionGuidance = (question: string): { examples: Record<Rating, string> } => {
  const lowerQuestion = question.toLowerCase();
  
  // Emotional handling questions
  if (lowerQuestion.includes('emotion') || lowerQuestion.includes('stress') || lowerQuestion.includes('difficult')) {
    return {
      examples: {
        'strong-match': 'Shared specific healthy coping strategies (exercise, therapy, journaling) and showed self-awareness',
        'good': 'Acknowledged emotions matter and mentioned talking to friends or taking time to process',
        'neutral': 'Gave vague response like "I just deal with it" or "I don\'t stress much" without explaining how',
        'yellow-flag': 'Avoids discussing emotions, shuts down, or relies heavily on substances/unhealthy coping',
        'red-flag': 'Lashed out at the question, blamed others for their stress, or dismissed emotions entirely'
      }
    };
  }
  
  // Past relationship questions
  if (lowerQuestion.includes('past relationship') || lowerQuestion.includes('ex')) {
    return {
      examples: {
        'strong-match': 'Spoke respectfully about exes, took accountability for their part, and explained growth from experiences',
        'good': 'Kept it brief and neutral, focused on what they learned rather than dwelling on negatives',
        'neutral': 'Gave minimal information or seemed uncomfortable but no clear red flags present',
        'yellow-flag': 'Blamed all exes for problems, showed bitterness, or seems not over a past relationship',
        'red-flag': 'Trash-talked all exes viciously, showed obsession with an ex, or revealed controlling/toxic patterns'
      }
    };
  }
  
  // Boundaries questions
  if (lowerQuestion.includes('boundar') || lowerQuestion.includes('respect')) {
    return {
      examples: {
        'strong-match': 'Immediately respected your boundary, thanked you for communicating it, and honored it consistently',
        'good': 'Accepted your boundary without pushback and has shown respect for it',
        'neutral': 'Acknowledged it but you haven\'t had enough time to see if they\'ll follow through',
        'yellow-flag': 'Questioned your boundary, seemed annoyed or bothered, or "forgot" it multiple times',
        'red-flag': 'Ignored, dismissed, mocked, or deliberately violated your boundary after being clearly told'
      }
    };
  }
  
  // Communication questions
  if (lowerQuestion.includes('communicate') || lowerQuestion.includes('express') || lowerQuestion.includes('listen')) {
    return {
      examples: {
        'strong-match': 'Communicates clearly, asks thoughtful questions, listens actively, and validates your perspective',
        'good': 'Makes good eye contact, responds thoughtfully, and shows genuine interest in conversation',
        'neutral': 'Communication is surface-level or you\'re not sure about their listening skills yet',
        'yellow-flag': 'Interrupts frequently, dominates conversations, or seems distracted when you speak',
        'red-flag': 'Dismisses your opinions, talks over you constantly, or shows complete lack of listening'
      }
    };
  }
  
  // Disagreement/conflict questions
  if (lowerQuestion.includes('disagree') || lowerQuestion.includes('conflict') || lowerQuestion.includes('argument')) {
    return {
      examples: {
        'strong-match': 'Stayed calm, sought to understand your view, communicated respectfully, worked toward resolution',
        'good': 'Can disagree without being disagreeable and shows willingness to compromise',
        'neutral': 'You haven\'t seen them handle disagreement yet or it was too minor to assess',
        'yellow-flag': 'Got defensive, used sarcasm, gave silent treatment, or avoids conflict entirely',
        'red-flag': 'Became aggressive, insulting, or manipulative, refused to take any responsibility'
      }
    };
  }
  
  // Values and lifestyle questions
  if (lowerQuestion.includes('value') || lowerQuestion.includes('priorit') || lowerQuestion.includes('lifestyle')) {
    return {
      examples: {
        'strong-match': 'Their values align closely with yours (family, career, spirituality, health, etc.)',
        'good': 'Most values align with some minor differences that seem manageable',
        'neutral': 'Was vague about their values or you need more clarity on what they prioritize',
        'yellow-flag': 'Core values conflict (kids, religion, lifestyle) but they\'re downplaying the differences',
        'red-flag': 'Major value misalignment they refuse to acknowledge or expects you to change your values'
      }
    };
  }
  
  // Future goals questions
  if (lowerQuestion.includes('future') || lowerQuestion.includes('goal') || lowerQuestion.includes('5 year')) {
    return {
      examples: {
        'strong-match': 'Has clear goals that align with yours and showed realistic plans to achieve them',
        'good': 'Has direction and goals, even if not perfectly aligned or fully formed yet',
        'neutral': 'Seems uncertain or is exploring options, which is honest but not very clear',
        'yellow-flag': 'Has no goals, avoids planning for the future, or their goals directly conflict with yours',
        'red-flag': 'Expects you to sacrifice your goals for theirs or shows no ambition/direction at all'
      }
    };
  }
  
  // Controlling/possessive behavior questions
  if (lowerQuestion.includes('control') || lowerQuestion.includes('possess') || lowerQuestion.includes('jealous')) {
    return {
      examples: {
        'strong-match': 'Shows trust, encourages your independence, and has healthy friendships themselves',
        'good': 'Expresses normal feelings but handles jealousy maturely without controlling behavior',
        'neutral': 'Too early to tell or mentioned slight insecurity but nothing concerning yet',
        'yellow-flag': 'Checks up on you excessively, questions your friendships, or seems overly possessive',
        'red-flag': 'Tries to isolate you, demands passwords, tracks your location, or shows extreme jealousy'
      }
    };
  }
  
  // Dishonesty questions
  if (lowerQuestion.includes('honest') || lowerQuestion.includes('truth') || lowerQuestion.includes('inconsist')) {
    return {
      examples: {
        'strong-match': 'Consistently honest and transparent, their words match their actions perfectly',
        'good': 'Seems honest overall with no major inconsistencies detected',
        'neutral': 'Can\'t fully verify their honesty yet but have no specific reason to doubt them',
        'yellow-flag': 'Caught small lies or exaggerations, noticed their stories don\'t always add up',
        'red-flag': 'Lied about important things, has major inconsistencies, or you caught them in deception'
      }
    };
  }
  
  // Respect/treatment questions
  if (lowerQuestion.includes('respect') || lowerQuestion.includes('treat') || lowerQuestion.includes('speak about')) {
    return {
      examples: {
        'strong-match': 'Treats everyone with kindness and respect, including service workers, exes, and family',
        'good': 'Generally respectful and considerate in how they speak about others',
        'neutral': 'Haven\'t seen enough interactions to properly assess how they treat others',
        'yellow-flag': 'Rude to service workers, gossips meanly, or shows disrespect in subtle ways',
        'red-flag': 'Consistently disrespectful, cruel, or degrading when talking about others'
      }
    };
  }
  
  // Interest/engagement questions
  if (lowerQuestion.includes('interest') || lowerQuestion.includes('engagement') || lowerQuestion.includes('energy')) {
    return {
      examples: {
        'strong-match': 'High energy, fully engaged, asks lots of questions, shows genuine enthusiasm about you',
        'good': 'Good energy and interest, makes effort to keep conversation going',
        'neutral': 'Moderate interest but hard to tell if they\'re just being polite or genuinely interested',
        'yellow-flag': 'Low energy, distracted, checking phone frequently, or giving one-word responses',
        'red-flag': 'Shows no real interest, completely disengaged, rude, or only talks about themselves'
      }
    };
  }
  
  // Authenticity questions
  if (lowerQuestion.includes('authentic') || lowerQuestion.includes('genuine') || lowerQuestion.includes('gut feeling')) {
    return {
      examples: {
        'strong-match': 'Feels genuine and authentic, your gut says this is a great match',
        'good': 'Seems sincere overall with no major red flags in your intuition',
        'neutral': 'You\'re unsure and feel you need more time to properly assess authenticity',
        'yellow-flag': 'Something feels off or inconsistent, trust your intuition on this',
        'red-flag': 'Strong gut feeling that something is wrong, they seem fake, deceptive, or dishonest'
      }
    };
  }
  
  // Default guidance for other questions
  return {
    examples: {
      'strong-match': 'Gave thoughtful response showing maturity, self-awareness, and healthy relationship values',
      'good': 'Provided positive response that shows good compatibility and genuine effort',
      'neutral': 'Response was vague, unclear, avoided specifics, or you need more information',
      'yellow-flag': 'Response raised minor concerns, deflected the question, or showed immature behavior',
      'red-flag': 'Response revealed serious concerns, toxic patterns, or dealbreaker behaviors'
    }
  };
};

// Flatten all questions with category metadata
interface QuestionWithMeta {
  question: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  conversationStarter?: string;
}

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function QuestionCardFlow({ categories, personName, onComplete, onBack, existingAnswers }: QuestionCardFlowProps) {
  // Flatten all questions with conversation starters
  const flattenedQuestions: QuestionWithMeta[] = categories.flatMap(cat => 
    cat.questions.map((q, index) => ({
      question: q,
      categoryId: cat.id,
      categoryName: cat.name,
      categoryIcon: cat.icon,
      conversationStarter: cat.conversationStarters?.[index],
    }))
  );

  // Randomize questions across categories if more than one category selected
  // This makes the assessment feel more natural and conversational
  const allQuestions: QuestionWithMeta[] = categories.length > 1 
    ? shuffleArray(flattenedQuestions)
    : flattenedQuestions;

  // Initialize answers from existing if provided
  const initializeAnswers = () => {
    const answerMap = new Map<number, Rating>();
    if (existingAnswers) {
      existingAnswers.forEach(existingAnswer => {
        const index = allQuestions.findIndex(q => q.question === existingAnswer.question);
        if (index !== -1) {
          answerMap.set(index, existingAnswer.rating);
        }
      });
    }
    return answerMap;
  };

  // Find first unanswered question index
  const findFirstUnanswered = (answerMap: Map<number, Rating>) => {
    for (let i = 0; i < allQuestions.length; i++) {
      if (!answerMap.has(i)) {
        return i;
      }
    }
    return 0; // Default to first if all answered
  };

  const initialAnswers = initializeAnswers();
  const initialIndex = existingAnswers ? findFirstUnanswered(initialAnswers) : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [answers, setAnswers] = useState<Map<number, Rating>>(initialAnswers);
  const [skippedQuestions, setSkippedQuestions] = useState<Set<number>>(new Set());
  const [selectedRating, setSelectedRating] = useState<Rating | null>(
    initialAnswers.get(initialIndex) || null
  );
  const [showGuidance, setShowGuidance] = useState(true);
  const [showFinishModal, setShowFinishModal] = useState(false);

  const progress = ((currentIndex + 1) / allQuestions.length) * 100;
  const answeredCount = answers.size;
  const skippedCount = skippedQuestions.size;
  const totalQuestions = allQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasAnswer = answers.has(currentIndex);
  const isSkipped = skippedQuestions.has(currentIndex);
  
  const currentQuestion = allQuestions[currentIndex];
  const currentGuidance = getQuestionGuidance(currentQuestion.question);

  // Calculate category completion
  const getCategoryProgress = () => {
    const categoryProgress = new Map<string, { answered: number; total: number }>();
    
    categories.forEach(cat => {
      categoryProgress.set(cat.id, { answered: 0, total: cat.questions.length });
    });
    
    allQuestions.forEach((q, idx) => {
      if (answers.has(idx)) {
        const prog = categoryProgress.get(q.categoryId)!;
        prog.answered++;
      }
    });
    
    return categoryProgress;
  };

  const handleSelectRating = (rating: Rating) => {
    setSelectedRating(rating);
    const newAnswers = new Map(answers);
    newAnswers.set(currentIndex, rating);
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (isLastQuestion) {
        handleFinish();
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedRating(answers.get(currentIndex + 1) || null);
      }
    }, 400); // 400ms delay for visual feedback
  };

  const handleNext = () => {
    if (hasAnswer) {
      if (isLastQuestion) {
        handleFinish();
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedRating(answers.get(currentIndex + 1) || null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedRating(answers.get(currentIndex - 1) || null);
    }
  };
  
  const handleSkipQuestion = () => {
    // Add to skipped questions
    const newSkipped = new Set(skippedQuestions);
    newSkipped.add(currentIndex);
    setSkippedQuestions(newSkipped);
    
    // Remove from answers if it was previously answered
    if (answers.has(currentIndex)) {
      const newAnswers = new Map(answers);
      newAnswers.delete(currentIndex);
      setAnswers(newAnswers);
    }
    
    // Move to next question
    if (isLastQuestion) {
      // If on last question and skipping, just finish if we have any answers
      if (answeredCount > 0) {
        handleFinish();
      }
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedRating(answers.get(currentIndex + 1) || null);
    }
  };

  const handleFinishEarly = () => {
    if (answeredCount > 0) {
      setShowFinishModal(true);
    }
  };

  const handleFinish = () => {
    // Convert to ScanAnswer format
    const scanAnswers: ScanAnswer[] = [];
    answers.forEach((rating, index) => {
      scanAnswers.push({
        question: allQuestions[index].question,
        rating: rating,
      });
    });

    // Get completed categories
    const categoryProgress = getCategoryProgress();
    const categoriesCompleted: string[] = [];
    categoryProgress.forEach((prog, catId) => {
      if (prog.answered > 0) {
        const category = categories.find(c => c.id === catId);
        if (category) {
          categoriesCompleted.push(category.name);
        }
      }
    });

    onComplete(scanAnswers, categoriesCompleted);
  };

  // Calculate current score for preview
  const calculateCurrentScore = () => {
    const ratingScores = {
      'strong-match': 100,
      'good': 75,
      'neutral': 50,
      'yellow-flag': 25,
      'red-flag': 0,
    };

    let totalScore = 0;
    answers.forEach((rating) => {
      totalScore += ratingScores[rating];
    });

    return Math.round(totalScore / answeredCount);
  };

  const getCurrentCategory = (score: number): { icon: string; title: string; color: string; gradient: string } => {
    if (score >= 85) return { icon: '💚', title: 'High Potential Match', color: 'emerald', gradient: 'from-emerald-500 to-green-600' };
    if (score >= 65) return { icon: '💙', title: 'Worth Exploring', color: 'blue', gradient: 'from-blue-500 to-cyan-600' };
    if (score >= 45) return { icon: '💛', title: 'Mixed Signals', color: 'amber', gradient: 'from-amber-500 to-orange-600' };
    if (score >= 25) return { icon: '🧡', title: 'Proceed with Caution', color: 'orange', gradient: 'from-orange-500 to-red-500' };
    return { icon: '❤️‍🩹', title: 'High Risk', color: 'red', gradient: 'from-red-500 to-rose-600' };
  };

  const categoryProgress = getCategoryProgress();
  const currentScore = answeredCount > 0 ? calculateCurrentScore() : 0;
  const currentCategory = getCurrentCategory(currentScore);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header with Progress */}
      <div className="bg-white shadow-sm">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center flex-1">
              <h2 className="text-lg text-gray-900">{personName}</h2>
              <p className="text-sm text-gray-500">
                {currentQuestion.categoryIcon} {currentQuestion.categoryName}
              </p>
            </div>
            <button 
              onClick={() => setShowGuidance(!showGuidance)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                showGuidance ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const prog = categoryProgress.get(cat.id)!;
              const isComplete = prog.answered === prog.total;
              const isInProgress = prog.answered > 0 && prog.answered < prog.total;
              const isCurrent = cat.id === currentQuestion.categoryId;
              
              return (
                <div
                  key={cat.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-rose-500 text-white shadow-md'
                      : isComplete
                      ? 'bg-emerald-100 text-emerald-700'
                      : isInProgress
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{prog.answered}/{prog.total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-40">
        <div className="w-full max-w-md mx-auto">
          <div 
            key={currentIndex}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-6 animate-[fadeIn_0.3s_ease-out]"
          >
            {/* Conversation Starter */}
            {currentQuestion.conversationStarter && (
              <div className="mb-6 bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-2xl border border-cyan-100">
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

            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* AI Guidance Header */}
            {showGuidance && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <h4 className="text-sm text-purple-900">AI Rating Guide</h4>
                  </div>
                  <p className="text-xs text-purple-700">Tap to select</p>
                </div>
              </div>
            )}

            {/* Clickable Rating Guide Tabs */}
            {showGuidance ? (
              <div className="space-y-3">
                {RATINGS.map((rating) => (
                  <button
                    key={rating.id}
                    onClick={() => handleSelectRating(rating.id)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left group ${
                      selectedRating === rating.id
                        ? `${rating.bgColor} border-${rating.color}-400 shadow-xl scale-[1.02]`
                        : 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform ${
                        selectedRating === rating.id 
                          ? 'scale-110' 
                          : 'group-hover:scale-105'
                      }`}>
                        {rating.emoji}
                      </div>
                      <div className="flex-1">
                        <div className={`mb-1 flex items-center justify-between ${
                          selectedRating === rating.id ? rating.textColor : 'text-purple-900'
                        }`}>
                          <span>{rating.label}</span>
                          {selectedRating === rating.id && (
                            <Check className={`w-5 h-5 ${rating.textColor} flex-shrink-0`} />
                          )}
                        </div>
                        <div className={`text-xs leading-relaxed ${
                          selectedRating === rating.id ? 'text-gray-700' : 'text-purple-700'
                        }`}>
                          {currentGuidance.examples[rating.id]}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Simple selection when guidance is hidden
              <div className="space-y-3">
                {RATINGS.map((rating) => (
                  <button
                    key={rating.id}
                    onClick={() => handleSelectRating(rating.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4 group ${
                      selectedRating === rating.id
                        ? `${rating.bgColor} border-${rating.color}-400 shadow-lg`
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform ${
                      selectedRating === rating.id 
                        ? 'scale-110' 
                        : 'group-hover:scale-105'
                    }`}>
                      {rating.emoji}
                    </div>
                    <div className="flex-1">
                      <div className={`mb-1 ${selectedRating === rating.id ? rating.textColor : 'text-gray-900'}`}>
                        {rating.label}
                      </div>
                      <div className="text-xs text-gray-600">
                        {rating.description}
                      </div>
                    </div>
                    {selectedRating === rating.id && (
                      <Check className={`w-5 h-5 ${rating.textColor} flex-shrink-0`} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons - Fixed at bottom for mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-8 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40">
            <div className="w-full max-w-md mx-auto space-y-3">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  currentIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous Question</span>
              </button>

              {/* Skip Question Button */}
              <button
                onClick={handleSkipQuestion}
                className="w-full px-6 py-3 bg-white text-amber-700 border-2 border-amber-200 rounded-2xl hover:bg-amber-50 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <SkipForward className="w-5 h-5" />
                <span>Skip Question</span>
              </button>

              {/* Finish Early Button */}
              {answeredCount > 0 && !isLastQuestion && (
                <button
                  onClick={handleFinishEarly}
                  className="w-full px-6 py-3 bg-white text-amber-700 border-2 border-amber-200 rounded-2xl hover:bg-amber-50 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Flag className="w-5 h-5" />
                  <span>Finish Assessment ({answeredCount} answered)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Finish Early Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl text-gray-900 mb-3">Finish Assessment?</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You've answered <strong>{answeredCount} out of {totalQuestions}</strong> questions.
              </p>
            </div>

            {/* Current Compatibility Score */}
            <div className={`bg-gradient-to-br ${currentCategory.gradient} p-6 rounded-3xl mb-6 text-white`}>
              <div className="text-center">
                <p className="text-sm opacity-90 mb-2">Current Compatibility Score</p>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="text-6xl">{currentCategory.icon}</div>
                  <div className="text-7xl">{currentScore}</div>
                </div>
                <h4 className="text-xl mb-2">{currentCategory.title}</h4>
                <p className="text-sm opacity-90">
                  Based on {answeredCount} {answeredCount === 1 ? 'answer' : 'answers'}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200 mb-6">
              <p className="text-xs text-blue-800 leading-relaxed text-center">
                💡 <strong>Tip:</strong> Answering more questions will give you a more accurate and comprehensive compatibility score.
              </p>
            </div>

            {/* Category Completion Status */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <h4 className="text-sm text-gray-700 mb-3">Category Coverage:</h4>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const prog = categoryProgress.get(cat.id)!;
                  const percentage = Math.round((prog.answered / prog.total) * 100);
                  
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>{cat.icon} {cat.name}</span>
                        <span>{prog.answered}/{prog.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-rose-400 to-pink-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
              >
                Keep Going
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                View Full Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}