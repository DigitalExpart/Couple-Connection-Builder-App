import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, SkipForward, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { ProgressBar } from '../blueprint/ProgressBar';
import { ChipSelector } from '../blueprint/ChipSelector';
import { ImportanceSlider } from '../blueprint/ImportanceSlider';
import { DealBreakerToggle } from '../blueprint/DealBreakerToggle';
import { CategoryIcon } from '../blueprint/CategoryIcon';

export interface BlueprintAnswer {
  questionId: string;
  type: 'chips' | 'slider' | 'dealbreaker';
  value: string[] | number | boolean;
}

export interface BlueprintQuestion {
  id: string;
  category: string;
  categoryType: 'values' | 'lifestyle' | 'communication' | 'relationship-goals' | 'preferences' | 'deal-breakers' | 'personality' | 'career' | 'family' | 'location' | 'interests' | 'energy';
  question: string;
  subtitle?: string;
  type: 'chips' | 'slider' | 'dealbreaker';
  options?: string[];
  multiSelect?: boolean;
  maxSelect?: number; // Maximum number of selections allowed for multi-select
  columns?: 1 | 2 | 3;
  dealBreakerLabel?: string;
  dealBreakerDescription?: string;
}

const QUESTIONS: BlueprintQuestion[] = [
  // Values
  {
    id: 'values-1',
    category: 'Core Values',
    categoryType: 'values',
    question: 'What values matter most to you in a partner?',
    subtitle: 'Select all that apply',
    type: 'chips',
    multiSelect: true,
    columns: 2,
    options: ['Honesty', 'Ambition', 'Kindness', 'Loyalty', 'Adventure', 'Stability', 'Family', 'Independence']
  },
  {
    id: 'values-2',
    category: 'Core Values',
    categoryType: 'values',
    question: 'How important is shared religious or spiritual beliefs?',
    type: 'slider'
  },
  // Lifestyle
  {
    id: 'lifestyle-1',
    category: 'Lifestyle',
    categoryType: 'lifestyle',
    question: 'What is your ideal weekend?',
    subtitle: 'Select your top 3',
    type: 'chips',
    multiSelect: true,
    maxSelect: 3,
    columns: 1,
    options: ['Exploring outdoors', 'Relaxing at home', 'Socializing with friends', 'Trying new restaurants', 'Working on projects', 'Traveling']
  },
  {
    id: 'lifestyle-2',
    category: 'Lifestyle',
    categoryType: 'lifestyle',
    question: 'How important is physical fitness in your lifestyle?',
    type: 'slider'
  },
  {
    id: 'lifestyle-3',
    category: 'Lifestyle',
    categoryType: 'lifestyle',
    question: 'Do you drink alcohol?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Never', 'Rarely', 'Socially', 'Regularly']
  },
  // Deal-Breakers
  {
    id: 'dealbreaker-1',
    category: 'Deal-Breakers',
    categoryType: 'deal-breakers',
    question: 'Is smoking a deal-breaker for you?',
    type: 'dealbreaker',
    dealBreakerLabel: 'Smoking',
    dealBreakerDescription: 'Would you date someone who smokes?'
  },
  {
    id: 'dealbreaker-2',
    category: 'Deal-Breakers',
    categoryType: 'deal-breakers',
    question: 'Is having different political views a deal-breaker?',
    type: 'dealbreaker',
    dealBreakerLabel: 'Political Differences',
    dealBreakerDescription: 'Would significantly different political views be a problem?'
  },
  {
    id: 'dealbreaker-3',
    category: 'Deal-Breakers',
    categoryType: 'deal-breakers',
    question: 'Is not wanting children a deal-breaker?',
    type: 'dealbreaker',
    dealBreakerLabel: 'Children',
    dealBreakerDescription: 'Would you date someone who does not want kids?'
  },
  // Relationship Goals
  {
    id: 'relationship-1',
    category: 'Relationship Goals',
    categoryType: 'relationship-goals',
    question: 'What are you looking for?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Casual dating', 'Something serious', 'Long-term relationship', 'Marriage']
  },
  {
    id: 'relationship-2',
    category: 'Relationship Goals',
    categoryType: 'relationship-goals',
    question: 'How important is getting married someday?',
    type: 'slider'
  },
  // Communication
  {
    id: 'communication-1',
    category: 'Communication Style',
    categoryType: 'communication',
    question: 'What communication style do you prefer?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Direct and straightforward', 'Thoughtful and considerate', 'Playful and lighthearted', 'Deep and philosophical']
  },
  {
    id: 'communication-2',
    category: 'Communication Style',
    categoryType: 'communication',
    question: 'How important is daily communication?',
    type: 'slider'
  },
  // Preferences
  {
    id: 'preferences-1',
    category: 'Preferences',
    categoryType: 'preferences',
    question: 'What qualities attract you most?',
    subtitle: 'Select up to 3',
    type: 'chips',
    multiSelect: true,
    maxSelect: 3,
    columns: 2,
    options: ['Humor', 'Intelligence', 'Confidence', 'Empathy', 'Creativity', 'Ambition', 'Spontaneity', 'Reliability']
  },
  {
    id: 'preferences-2',
    category: 'Preferences',
    categoryType: 'preferences',
    question: 'How important is physical attraction?',
    type: 'slider'
  },
  // Personality
  {
    id: 'personality-1',
    category: 'Personality Match',
    categoryType: 'personality',
    question: 'Are you more introverted or extroverted?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Very introverted', 'Somewhat introverted', 'Balanced', 'Somewhat extroverted', 'Very extroverted']
  },
  {
    id: 'personality-2',
    category: 'Personality Match',
    categoryType: 'personality',
    question: 'Do you prefer someone similar or complementary?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Very similar to me', 'Somewhat similar', 'Balanced mix', 'Complementary differences']
  },
  // Career & Location
  {
    id: 'career-1',
    category: 'Practical Factors',
    categoryType: 'career',
    question: 'How important is career ambition?',
    type: 'slider'
  },
  {
    id: 'location-1',
    category: 'Practical Factors',
    categoryType: 'location',
    question: 'How important is living in the same city?',
    type: 'slider'
  },
  // Family
  {
    id: 'family-1',
    category: 'Family & Future',
    categoryType: 'family',
    question: 'Do you want children?',
    type: 'chips',
    multiSelect: false,
    columns: 1,
    options: ['Definitely yes', 'Probably yes', 'Not sure', 'Probably not', 'Definitely not']
  },
  {
    id: 'family-2',
    category: 'Family & Future',
    categoryType: 'family',
    question: 'How important is your partner relationship with their family?',
    type: 'slider'
  }
];

interface BlueprintQuestionnaireScreenProps {
  initialAnswers?: BlueprintAnswer[];
  onComplete: (answers: BlueprintAnswer[]) => void;
  onSaveProgress?: (answers: BlueprintAnswer[], progress: number) => void; // New prop for saving progress
  onBack: () => void;
}

export function BlueprintQuestionnaireScreen({
  initialAnswers = [],
  onComplete,
  onSaveProgress,
  onBack
}: BlueprintQuestionnaireScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, BlueprintAnswer>>(() => {
    const map = new Map();
    initialAnswers.forEach(answer => {
      map.set(answer.questionId, answer);
    });
    return map;
  });
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = QUESTIONS[currentIndex];
  const answeredCount = answers.size;
  const totalQuestions = QUESTIONS.length;
  const progress = (answeredCount / totalQuestions) * 100; // Based on answered count, not index
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions; // NEW: Check if all answered
  const canGoNext = answers.has(currentQuestion.id);

  // Auto-record default answer for dealbreaker questions if not already answered
  useEffect(() => {
    if (currentQuestion.type === 'dealbreaker' && !answers.has(currentQuestion.id)) {
      // Auto-record default "Not a Deal-Breaker" (false)
      const newAnswers = new Map(answers);
      newAnswers.set(currentQuestion.id, {
        questionId: currentQuestion.id,
        type: 'dealbreaker',
        value: false // Default to "Not a Deal-Breaker"
      });
      setAnswers(newAnswers);
    }
  }, [currentIndex, currentQuestion.id, currentQuestion.type]);

  const getCurrentAnswer = () => {
    const answer = answers.get(currentQuestion.id);
    return answer?.value;
  };

  const handleAnswer = (value: string[] | number | boolean) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestion.id, {
      questionId: currentQuestion.id,
      type: currentQuestion.type,
      value
    });
    setAnswers(newAnswers);
    // Auto-save removed - only save when user explicitly clicks "Save & Continue Later"
  };

  const handleNext = () => {
    if (!canGoNext) return;
    
    // Check if all questions are answered
    if (allQuestionsAnswered) {
      onComplete(Array.from(answers.values()));
      return; // Stop here, don't navigate
    }
    
    // Otherwise, go to next question
    if (isLastQuestion) {
      // On last question but not all answered - find first unanswered
      handleSkipToUnanswered();
    } else {
      setDirection('forward');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection('backward');
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const handleSaveAndExit = () => {
    if (onSaveProgress) {
      const currentProgress = ((currentIndex + 1) / QUESTIONS.length) * 100;
      onSaveProgress(Array.from(answers.values()), currentProgress);
    }
    onBack();
  };

  const handleSkipToUnanswered = () => {
    // Find next unanswered question from current position
    for (let i = currentIndex + 1; i < QUESTIONS.length; i++) {
      if (!answers.has(QUESTIONS[i].id)) {
        setDirection('forward');
        setCurrentIndex(i);
        return;
      }
    }
    // If no unanswered ahead, search from beginning
    for (let i = 0; i < currentIndex; i++) {
      if (!answers.has(QUESTIONS[i].id)) {
        setDirection(i < currentIndex ? 'backward' : 'forward');
        setCurrentIndex(i);
        return;
      }
    }
  };

  const hasUnansweredQuestions = () => {
    return answeredCount < totalQuestions;
  };

  const getUnansweredQuestions = () => {
    return QUESTIONS.filter(q => !answers.has(q.id));
  };

  const [showMissingList, setShowMissingList] = useState(false);

  const slideVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <ProgressBar progress={progress} />
        
        {/* Progress Summary */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-semibold text-[#663399]">{answeredCount}</span> of {totalQuestions} answered
          </span>
          {answeredCount < totalQuestions ? (
            <button
              onClick={() => setShowMissingList(!showMissingList)}
              className="text-[#A79BC8] hover:text-[#663399] transition-colors flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {totalQuestions - answeredCount} remaining
            </button>
          ) : (
            <span className="text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Complete!
            </span>
          )}
        </div>
        
        {/* Missing Questions List */}
        {showMissingList && answeredCount < totalQuestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Unanswered Questions</h3>
              <button
                onClick={() => setShowMissingList(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {getUnansweredQuestions().map((q, index) => {
                const questionIndex = QUESTIONS.findIndex(quest => quest.id === q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(questionIndex);
                      setDirection(questionIndex > currentIndex ? 'forward' : 'backward');
                      setShowMissingList(false);
                    }}
                    className="w-full text-left p-3 bg-white rounded-lg hover:bg-amber-100 transition-colors border border-amber-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                        #{questionIndex + 1}
                      </span>
                      <CategoryIcon category={q.categoryType} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{q.category}</p>
                        <p className="text-sm text-gray-900 truncate">{q.question}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Question Card */}
      <div className="flex-1 overflow-hidden flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <CategoryIcon category={currentQuestion.categoryType} size="md" />
                <div>
                  <p className="text-sm text-[#A79BC8]">{currentQuestion.category}</p>
                  <p className="text-xs text-gray-500">Question {currentIndex + 1} of {QUESTIONS.length}</p>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl text-gray-900 mb-2">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-sm text-gray-600 mb-6">{currentQuestion.subtitle}</p>
              )}

              {/* Answer Input */}
              <div className="mt-8">
                {currentQuestion.type === 'chips' && currentQuestion.options && (
                  <ChipSelector
                    options={currentQuestion.options}
                    selected={(getCurrentAnswer() as string[]) || []}
                    onChange={(selected) => handleAnswer(selected)}
                    multiSelect={currentQuestion.multiSelect}
                    maxSelect={currentQuestion.maxSelect}
                    columns={currentQuestion.columns}
                  />
                )}

                {currentQuestion.type === 'slider' && (
                  <ImportanceSlider
                    value={(getCurrentAnswer() as number) || 50}
                    onChange={(value) => handleAnswer(value)}
                    showLabels={true}
                  />
                )}

                {currentQuestion.type === 'dealbreaker' && (
                  <DealBreakerToggle
                    isOn={(getCurrentAnswer() as boolean) || false}
                    onChange={(value) => handleAnswer(value)}
                    label={currentQuestion.dealBreakerLabel || ''}
                    description={currentQuestion.dealBreakerDescription}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <BlueprintButton
            variant="primary"
            onClick={handleNext}
            disabled={!canGoNext}
            fullWidth
            icon={<ArrowRight className="w-5 h-5" />}
          >
            {allQuestionsAnswered ? 'Complete Assessment' : 'Next Question'}
          </BlueprintButton>
          
          {/* Show Skip to Unanswered button only if current question is answered AND there are unanswered questions */}
          {canGoNext && hasUnansweredQuestions() && (
            <button
              onClick={handleSkipToUnanswered}
              className="w-full mt-3 py-2 text-sm text-[#A79BC8] hover:text-[#663399] transition-colors flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Skip to next unanswered question
            </button>
          )}
          
          {onSaveProgress && (
            <BlueprintButton
              variant="secondary"
              onClick={handleSaveAndExit}
              fullWidth
              className="mt-4"
            >
              Save & Continue Later
            </BlueprintButton>
          )}
        </div>
      </div>
    </div>
  );
}