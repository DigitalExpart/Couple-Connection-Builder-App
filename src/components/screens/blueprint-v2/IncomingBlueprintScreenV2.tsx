import { motion } from 'motion/react';
import { Heart, Eye, UserPlus, User } from 'lucide-react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';

interface IncomingBlueprintScreenV2Props {
  senderName: string;
  onViewBlueprint: () => void;
  onCreateOwn: () => void;
  onContinueAsGuest: () => void;
}

export function IncomingBlueprintScreenV2({
  senderName,
  onViewBlueprint,
  onCreateOwn,
  onContinueAsGuest
}: IncomingBlueprintScreenV2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C2B63] via-[#A79BC8] to-[#FFD88A] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Heart className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3C2B63] mb-3">
            Someone Shared Their Blueprint!
          </h1>

          <p className="text-xl text-gray-700">
            <strong>{senderName}</strong> wants to see if you're compatible
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#F4F4F6] to-white rounded-2xl p-6 mb-8"
        >
          <h3 className="font-semibold text-[#3C2B63] mb-3">
            What's a Match Blueprint™?
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            It's a comprehensive profile showing someone's relationship values, lifestyle preferences, 
            deal-breakers, and what they're looking for in a partner. View theirs to understand them better, 
            or create your own to see your compatibility score!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <BlueprintButton
            variant="gradient"
            fullWidth
            size="lg"
            icon={<Eye className="w-6 h-6" />}
            onClick={onViewBlueprint}
          >
            View {senderName}'s Blueprint
          </BlueprintButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">For the best experience</span>
            </div>
          </div>

          <BlueprintButton
            variant="lavender-outline"
            fullWidth
            size="lg"
            icon={<UserPlus className="w-6 h-6" />}
            onClick={onCreateOwn}
          >
            Create Your Blueprint to Compare
          </BlueprintButton>

          <button
            onClick={onContinueAsGuest}
            className="w-full py-3 text-gray-600 hover:text-[#3C2B63] transition-colors text-center"
          >
            Continue as Guest
          </button>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-sm font-medium text-gray-700 mb-3">
            Why create your own blueprint?
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8]" />
              <span>See your compatibility score with {senderName}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8]" />
              <span>Get detailed compatibility breakdowns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A79BC8]" />
              <span>Share yours with other matches</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
