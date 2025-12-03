import { motion } from 'motion/react';
import { Edit, Share2, BarChart3, Heart, Users, Shield, Star, Home, Sparkles } from 'lucide-react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';
import { ScoreCircle } from '../../blueprint-v2/ScoreCircle';
import { BlueprintSummaryCard } from '../../blueprint-v2/BlueprintSummaryCard';
import { DealBreakerWarningCard } from '../../blueprint-v2/DealBreakerWarningCard';
import { CategoryIcon } from '../../blueprint-v2/CategoryIcon';

interface BlueprintSummaryScreenV2Props {
  userName?: string;
  onShare: () => void;
  onCompare: () => void;
  onEdit: () => void;
  onBack: () => void;
  blueprintData?: any; // In production, type this properly
}

export function BlueprintSummaryScreenV2({
  userName = 'You',
  onShare,
  onCompare,
  onEdit,
  onBack,
  blueprintData
}: BlueprintSummaryScreenV2Props) {
  // Mock data - in production, this comes from blueprintData
  const alignmentScore = 92;
  
  const coreValues = ['Honesty', 'Loyalty', 'Ambition', 'Kindness', 'Family'];
  const relationshipGoals = ['Long-term commitment', 'Marriage within 3 years', 'Open communication', 'Shared decision-making'];
  const boundaries = ['Mutual respect', 'Personal space valued', 'Financial transparency', 'Emotional support'];
  const dealBreakers = ['Smoking', 'Political extremes', 'Dishonesty'];
  const personality = ['Introverted-leaning', 'Deep conversations', 'Quality time focused', 'Thoughtful communication'];
  const lifestyle = ['Health-conscious', 'Weekend traveler', 'Work-life balance', 'Social on weekends'];

  const categories = [
    { name: 'Values', icon: Heart, type: 'values' as const },
    { name: 'Lifestyle', icon: Home, type: 'lifestyle' as const },
    { name: 'Deal-Breakers', icon: Shield, type: 'deal-breakers' as const },
    { name: 'Preferences', icon: Star, type: 'preferences' as const },
    { name: 'Nice-to-Haves', icon: Sparkles, type: 'interests' as const },
    { name: 'Goals', icon: Users, type: 'relationship-goals' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={onEdit}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3C2B63] mb-2">
            {userName}'s Match Blueprint™
          </h1>
          <p className="text-lg text-gray-600">
            Your personalized relationship compatibility profile
          </p>
        </motion.div>

        {/* Alignment Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="blueprint-frosted rounded-3xl p-8 text-center mb-8 shadow-xl"
        >
          <h2 className="text-xl font-bold text-[#3C2B63] mb-6">
            Alignment Profile
          </h2>
          
          <div className="flex justify-center mb-6">
            <ScoreCircle score={alignmentScore} size={180} />
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            This score represents how well-defined and aligned your relationship preferences are.
            Higher scores indicate greater clarity in what you're looking for.
          </p>
        </motion.div>

        {/* Category Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <CategoryIcon 
                  category={category.type} 
                  size="lg"
                  className="mx-auto mb-2"
                />
                <p className="text-xs text-gray-600">{category.name}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detail Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <BlueprintSummaryCard
            title="Core Values"
            icon={<Heart className="w-5 h-5 text-white" />}
            items={coreValues}
          />
          
          <BlueprintSummaryCard
            title="Relationship Goals"
            icon={<Users className="w-5 h-5 text-white" />}
            items={relationshipGoals}
          />
          
          <BlueprintSummaryCard
            title="Boundaries & Non-Negotiables"
            icon={<Shield className="w-5 h-5 text-white" />}
            items={boundaries}
          />
          
          <BlueprintSummaryCard
            title="Personality Highlights"
            icon={<Star className="w-5 h-5 text-white" />}
            items={personality}
          />
        </div>

        <div className="mb-8">
          <BlueprintSummaryCard
            title="Lifestyle Profile"
            icon={<Home className="w-5 h-5 text-white" />}
            items={lifestyle}
          />
        </div>

        {/* Deal-Breakers Card */}
        {dealBreakers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <DealBreakerWarningCard dealBreakers={dealBreakers} />
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <BlueprintButton
            variant="gradient"
            fullWidth
            size="lg"
            icon={<Share2 className="w-5 h-5" />}
            onClick={onShare}
          >
            Share Blueprint
          </BlueprintButton>

          <BlueprintButton
            variant="lavender-outline"
            fullWidth
            size="lg"
            icon={<BarChart3 className="w-5 h-5" />}
            onClick={onCompare}
          >
            Compare With Someone
          </BlueprintButton>
        </motion.div>
      </div>
    </div>
  );
}
