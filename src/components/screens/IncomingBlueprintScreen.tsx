import { Heart, ArrowRight, User, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { BlueprintCard } from '../blueprint/BlueprintCard';

interface IncomingBlueprintScreenProps {
  senderName: string;
  onViewBlueprint: () => void;
  onCreateOwn: () => void;
  onContinueAsGuest: () => void;
  blueprintId: string;
}

export function IncomingBlueprintScreen({
  senderName,
  onViewBlueprint,
  onCreateOwn,
  onContinueAsGuest,
  blueprintId
}: IncomingBlueprintScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Animated Heart */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#3C2B63] to-[#5A4180] rounded-3xl flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart className="w-12 h-12 text-[#FFD88A] fill-[#FFD88A]" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Someone Special Shared Their Blueprint!
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-[#3C2B63]">{senderName}</span> wants you to see their ideal match profile
          </motion.p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <BlueprintCard variant="glass" accentColor="purple">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#3C2B63] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#FFD88A]" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">What's a Match Blueprint™?</h4>
                <p className="text-sm text-gray-600">
                  A personalized profile showing someone's relationship values, deal-breakers, 
                  lifestyle preferences, and what they're looking for in a partner.
                </p>
              </div>
            </div>
          </BlueprintCard>
        </motion.div>

        {/* Action Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BlueprintCard variant="elevated" className="cursor-pointer" onClick={onViewBlueprint}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3C2B63] to-[#5A4180] rounded-2xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-[#FFD88A]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">View Their Blueprint</h3>
                  <p className="text-sm text-gray-600">See {senderName}'s match profile</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#A79BC8]" />
              </div>
            </BlueprintCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BlueprintCard variant="glass" className="cursor-pointer" onClick={onCreateOwn}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#FFD88A]/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#FFD88A]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">Create Your Blueprint to Compare</h3>
                  <p className="text-sm text-gray-600">See your compatibility score</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#A79BC8]" />
              </div>
            </BlueprintCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <BlueprintCard variant="glass" className="cursor-pointer" onClick={onContinueAsGuest}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#A79BC8]/20 rounded-2xl flex items-center justify-center">
                  <User className="w-7 h-7 text-[#A79BC8]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">Continue as Guest</h3>
                  <p className="text-sm text-gray-600">Quick view without account</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#A79BC8]" />
              </div>
            </BlueprintCard>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            Link ID: {blueprintId.slice(0, 8)}...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
