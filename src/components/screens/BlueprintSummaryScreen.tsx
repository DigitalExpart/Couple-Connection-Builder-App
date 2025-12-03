import { ArrowLeft, Edit, Share2, Users, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { BlueprintCard } from '../blueprint/BlueprintCard';
import { CategoryIcon } from '../blueprint/CategoryIcon';
import { ScoreCircle } from '../blueprint/ScoreCircle';
import { BlueprintAnswer } from './BlueprintQuestionnaireScreen';

interface BlueprintSummaryScreenProps {
  answers: BlueprintAnswer[];
  onEdit: () => void;
  onShare: () => void;
  onCompare: () => void;
  onBack: () => void;
  userName?: string;
}

interface BlueprintProfile {
  coreValues: string[];
  relationshipGoals: string[];
  dealBreakers: string[];
  preferences: string[];
  lifestyleProfile: string[];
  communicationStyle: string;
  personalityType: string;
  compatibilityScore: number;
}

// Helper to generate profile from answers
function generateProfile(answers: BlueprintAnswer[]): BlueprintProfile {
  // Calculate actual completion percentage based on total questions (20)
  const totalQuestions = 20;
  const answeredQuestions = answers.length;
  const completionScore = Math.round((answeredQuestions / totalQuestions) * 100);
  
  const profile: BlueprintProfile = {
    coreValues: [],
    relationshipGoals: [],
    dealBreakers: [],
    preferences: [],
    lifestyleProfile: [],
    communicationStyle: '',
    personalityType: '',
    compatibilityScore: completionScore // Dynamic calculation instead of hardcoded 85
  };

  answers.forEach(answer => {
    if (answer.questionId.startsWith('values-') && Array.isArray(answer.value)) {
      profile.coreValues.push(...answer.value);
    }
    if (answer.questionId.startsWith('relationship-') && Array.isArray(answer.value)) {
      profile.relationshipGoals.push(...answer.value);
    }
    if (answer.questionId.startsWith('dealbreaker-') && answer.value === true) {
      profile.dealBreakers.push(answer.questionId.replace('dealbreaker-', 'Deal-Breaker '));
    }
    if (answer.questionId.startsWith('preferences-') && Array.isArray(answer.value)) {
      profile.preferences.push(...answer.value);
    }
    if (answer.questionId.startsWith('lifestyle-') && Array.isArray(answer.value)) {
      profile.lifestyleProfile.push(...answer.value);
    }
    if (answer.questionId === 'communication-1' && Array.isArray(answer.value)) {
      profile.communicationStyle = answer.value[0] || 'Not specified';
    }
    if (answer.questionId === 'personality-1' && Array.isArray(answer.value)) {
      profile.personalityType = answer.value[0] || 'Not specified';
    }
  });

  return profile;
}

export function BlueprintSummaryScreen({
  answers,
  onEdit,
  onShare,
  onCompare,
  onBack,
  userName = 'Your'
}: BlueprintSummaryScreenProps) {
  const profile = generateProfile(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 text-white/80 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl mb-2">{userName} Match Blueprint™</h1>
          <p className="text-white/80">Your personalized relationship profile</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        {/* Profile Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <BlueprintCard variant="elevated" className="text-center">
            <div className="py-6">
              <ScoreCircle 
                score={profile.compatibilityScore} 
                size="xl"
                label="Blueprint Completeness"
              />
              <p className="text-gray-600 mt-4 max-w-md mx-auto">
                Your blueprint is highly detailed and will help matches understand your ideal relationship
              </p>
            </div>
          </BlueprintCard>
        </motion.div>

        {/* Core Values */}
        {profile.coreValues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <BlueprintCard accentColor="gold">
              <div className="flex items-start gap-4">
                <CategoryIcon category="values" size="md" />
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-3">Core Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.coreValues.map((value, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[#FFD88A]/20 text-[#FFD88A] rounded-xl text-sm border border-[#FFD88A]/30"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Relationship Goals */}
        {profile.relationshipGoals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <BlueprintCard accentColor="purple">
              <div className="flex items-start gap-4">
                <CategoryIcon category="relationship-goals" size="md" />
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-3">Relationship Goals</h3>
                  <ul className="space-y-2">
                    {profile.relationshipGoals.map((goal, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-[#3C2B63] rounded-full"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Deal-Breakers */}
        {profile.dealBreakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <BlueprintCard accentColor="red">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#FF6A6A]/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[#FF6A6A]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">Non-Negotiables</h3>
                  <p className="text-sm text-gray-600 mb-3">These are important boundaries for you</p>
                  <div className="space-y-2">
                    {profile.dealBreakers.map((dealBreaker, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 text-sm text-[#FF6A6A] bg-[#FF6A6A]/10 px-3 py-2 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {dealBreaker}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Preferences */}
        {profile.preferences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <BlueprintCard accentColor="lavender">
              <div className="flex items-start gap-4">
                <CategoryIcon category="preferences" size="md" />
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-3">Attractive Qualities</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.map((pref, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-[#A79BC8]/20 text-[#A79BC8] rounded-xl text-sm border border-[#A79BC8]/30"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Lifestyle Profile */}
        {profile.lifestyleProfile.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <BlueprintCard>
              <div className="flex items-start gap-4">
                <CategoryIcon category="lifestyle" size="md" />
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-3">Lifestyle Highlights</h3>
                  <ul className="space-y-2">
                    {profile.lifestyleProfile.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-[#A79BC8] rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>
        )}

        {/* Communication & Personality */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {profile.communicationStyle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <BlueprintCard variant="glass">
                <div className="text-center">
                  <CategoryIcon category="communication" size="md" variant="outlined" />
                  <h4 className="text-gray-900 mt-3 mb-2">Communication</h4>
                  <p className="text-sm text-gray-600">{profile.communicationStyle}</p>
                </div>
              </BlueprintCard>
            </motion.div>
          )}

          {profile.personalityType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <BlueprintCard variant="glass">
                <div className="text-center">
                  <CategoryIcon category="personality" size="md" variant="outlined" />
                  <h4 className="text-gray-900 mt-3 mb-2">Personality</h4>
                  <p className="text-sm text-gray-600">{profile.personalityType}</p>
                </div>
              </BlueprintCard>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <BlueprintButton
            variant="primary"
            onClick={onShare}
            fullWidth
            icon={<Share2 className="w-5 h-5" />}
          >
            Share My Blueprint
          </BlueprintButton>

          <BlueprintButton
            variant="secondary"
            onClick={onCompare}
            fullWidth
            icon={<Users className="w-5 h-5" />}
          >
            Compare With Someone
          </BlueprintButton>

          <BlueprintButton
            variant="tertiary"
            onClick={onEdit}
            fullWidth
            icon={<Edit className="w-5 h-5" />}
          >
            Edit Blueprint
          </BlueprintButton>
        </motion.div>
      </div>
    </div>
  );
}