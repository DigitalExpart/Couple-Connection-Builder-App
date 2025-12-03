import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';
import { ProgressBar } from '../../blueprint-v2/ProgressBar';
import { ChipSelector } from '../../blueprint-v2/ChipSelector';
import { ImportanceSlider } from '../../blueprint-v2/ImportanceSlider';
import { DealBreakerToggle } from '../../blueprint-v2/DealBreakerToggle';
import { CategoryIcon } from '../../blueprint-v2/CategoryIcon';

export interface BlueprintAnswerV2 {
  questionId: string;
  type: 'chips' | 'slider' | 'dealbreaker';
  value: string[] | number | boolean;
}

export interface BlueprintQuestionV2 {
  id: string;
  category: string;
  categoryType: 'values' | 'lifestyle' | 'communication' | 'relationship-goals' | 'preferences' | 'deal-breakers' | 'personality' | 'career' | 'family' | 'location' | 'interests' | 'energy';
  question: string;
  subtitle?: string;
  explanation?: string;
  type: 'chips' | 'slider' | 'dealbreaker';
  options?: string[];
  multiSelect?: boolean;
  maxSelect?: number;
  columns?: 1 | 2 | 3;
  dealBreakerLabel?: string;
  dealBreakerDescription?: string;
  autoAdvance?: boolean;
}

const BLUEPRINT_QUESTIONS: BlueprintQuestionV2[] = [
  // Core Values
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
    explanation: 'This helps us understand how much spiritual alignment matters to you',
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
    autoAdvance: true,
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
    autoAdvance: true,
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
    autoAdvance: true,
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
    autoAdvance: true,
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
    autoAdvance: true,
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
    autoAdvance: true,
    options: ['Definitely yes', 'Probably yes', 'Not sure', 'Probably not', 'Definitely not']
  },
  {
    id: 'family-2',
    category: 'Family & Future',
    categoryType: 'family',
    question: 'How important is your partner\'s relationship with their family?',
    type: 'slider'
  }
];

interface BlueprintQuestionnaireScreenV2Props {
  onComplete: (answers: BlueprintAnswerV2[]) => void;
  onBack: () => void;
  existingAnswers?: BlueprintAnswerV2[];
  onSaveProgress?: (answers: BlueprintAnswerV2[], progress: number) => void;
  isSelfAssessment?: boolean;
}

export function BlueprintQuestionnaireScreenV2({
  onComplete,
  onBack,
  existingAnswers = [],
  onSaveProgress,
  isSelfAssessment = false
}: BlueprintQuestionnaireScreenV2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, BlueprintAnswerV2>>(
    new Map(existingAnswers.map(a => [a.questionId, a]))
  );
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = BLUEPRINT_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / BLUEPRINT_QUESTIONS.length) * 100;
  const isLastQuestion = currentIndex === BLUEPRINT_QUESTIONS.length - 1;
  const canGoNext = answers.has(currentQuestion.id);

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

    // Auto-save progress if in self-assessment mode
    if (isSelfAssessment && onSaveProgress) {
      const progressPercent = ((currentIndex + 1) / BLUEPRINT_QUESTIONS.length) * 100;
      onSaveProgress(Array.from(newAnswers.values()), progressPercent);
    }

    // Auto-advance for single-select chips if enabled
    if (currentQuestion.autoAdvance && currentQuestion.type === 'chips' && !currentQuestion.multiSelect) {
      setTimeout(() => {
        if (!isLastQuestion) {
          handleNext();
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      onComplete(Array.from(answers.values()));
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

  const handleSkip = () => {
    if (!isLastQuestion) {
      setDirection('forward');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveAndExit = () => {
    if (onSaveProgress) {
      onSaveProgress(Array.from(answers.values()), progress);
    }
    onBack();
  };

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
      <div className="bg-white/80 backdrop-blur-lg shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack} 
              className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {isSelfAssessment && onSaveProgress && (
              <button
                onClick={handleSaveAndExit}
                className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors flex items-center gap-2 text-sm"
              >
                <Save className="w-4 h-4" />
                Save & Continue Later
              </button>
            )}
          </div>
          <ProgressBar progress={progress} />
        </div>
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
              className="blueprint-frosted rounded-3xl shadow-2xl p-8"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <CategoryIcon category={currentQuestion.categoryType} size="md" />
                <div>
                  <p className="text-sm font-medium text-[#A79BC8]">{currentQuestion.category}</p>
                  <p className="text-xs text-gray-500">
                    Question {currentIndex + 1} of {BLUEPRINT_QUESTIONS.length}
                  </p>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-[#3C2B63] mb-2">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-sm text-gray-600 mb-2">{currentQuestion.subtitle}</p>
              )}
              {currentQuestion.explanation && (
                <p className="text-sm text-gray-500 italic mb-6">{currentQuestion.explanation}</p>
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
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-gray-600 hover:text-[#3C2B63] transition-colors"
          >
            Skip
          </button>
          
          <BlueprintButton
            variant="gradient"
            onClick={handleNext}
            disabled={!canGoNext}
            fullWidth
            icon={<ArrowRight className="w-5 h-5" />}
          >
            {isLastQuestion ? 'Complete Blueprint' : 'Next Question'}
          </BlueprintButton>
        </div>
      </div>
    </div>
  );
}
