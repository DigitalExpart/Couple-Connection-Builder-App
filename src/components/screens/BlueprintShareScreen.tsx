import { ArrowLeft, Copy, QrCode, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { BlueprintButton } from '../blueprint/BlueprintButton';
import { BlueprintCard } from '../blueprint/BlueprintCard';
import { QRShareModal } from '../blueprint/QRShareModal';

interface BlueprintShareScreenProps {
  onBack: () => void;
  blueprintId: string;
  userName: string;
}

export function BlueprintShareScreen({ 
  onBack, 
  blueprintId,
  userName 
}: BlueprintShareScreenProps) {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const shareLink = `https://mymatchiq.app/blueprint/${blueprintId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s Match Blueprint`,
          text: `Check out my Match Blueprint on MyMatchIQ!`,
          url: shareLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

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
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center">
            <Share2 className="w-8 h-8 text-[#FFD88A]" />
          </div>
          <h1 className="text-3xl mb-2">Share Your Blueprint</h1>
          <p className="text-white/80">Let potential matches see what you're looking for</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-2xl mx-auto">
        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <BlueprintCard variant="elevated" accentColor="purple">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3C2B63] to-[#5A4180] rounded-2xl flex items-center justify-center text-2xl text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg text-gray-900">{userName}'s Blueprint</h3>
                <p className="text-sm text-gray-600">Complete Match Profile</p>
              </div>
            </div>

            <div className="bg-[#F4F4F6] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Core Values</span>
                <span className="text-[#FFD88A]">✓ Defined</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Relationship Goals</span>
                <span className="text-[#FFD88A]">✓ Defined</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deal-Breakers</span>
                <span className="text-[#FF6A6A]">✓ Set</span>
              </div>
            </div>
          </BlueprintCard>
        </motion.div>

        {/* Share Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-gray-900 mb-3">Share Link</h3>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border-2 border-[#A79BC8]/30 rounded-2xl px-4 py-3 text-sm text-gray-700 overflow-hidden">
              <div className="truncate">{shareLink}</div>
            </div>
            <button
              onClick={handleCopy}
              className="w-12 h-12 bg-white border-2 border-[#A79BC8]/30 hover:border-[#A79BC8] rounded-2xl flex items-center justify-center transition-all"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-[#A79BC8]" />
              )}
            </button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-green-600 mt-2"
            >
              Link copied to clipboard!
            </motion.p>
          )}
        </motion.div>

        {/* QR Code Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <button 
            onClick={() => setShowQRModal(true)}
            className="w-full"
          >
            <BlueprintCard variant="glass" className="transition-all hover:shadow-lg">
              <div className="text-center py-6">
                <div className="w-40 h-40 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center border-4 border-[#A79BC8]/20">
                  <QrCode className="w-32 h-32 text-[#3C2B63]" />
                </div>
                <h4 className="text-gray-900 mb-2">Scan to View Blueprint</h4>
                <p className="text-sm text-gray-600">Tap to view QR code</p>
              </div>
            </BlueprintCard>
          </button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <BlueprintButton
            variant="primary"
            onClick={handleShare}
            fullWidth
            icon={<Share2 className="w-5 h-5" />}
          >
            Share via Other Apps
          </BlueprintButton>

          <BlueprintButton
            variant="secondary"
            onClick={handleCopy}
            fullWidth
            icon={<Copy className="w-5 h-5" />}
          >
            Copy Link
          </BlueprintButton>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          {/* Expiry Notice */}
          <BlueprintCard variant="glass" accentColor="gold">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⏱️</div>
              <div>
                <h4 className="text-gray-900 mb-1">Link Expires in 72 Hours</h4>
                <p className="text-sm text-gray-600">
                  Premium users can extend link duration or create permanent links
                </p>
              </div>
            </div>
          </BlueprintCard>

          <BlueprintCard variant="glass" accentColor="lavender">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#A79BC8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5 text-[#A79BC8]" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">Why Share Your Blueprint?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#A79BC8] mt-1">•</span>
                    <span>Set clear expectations from the start</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A79BC8] mt-1">•</span>
                    <span>Attract matches who align with your values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A79BC8] mt-1">•</span>
                    <span>Save time by filtering incompatible matches early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#A79BC8] mt-1">•</span>
                    <span>Build trust through transparency</span>
                  </li>
                </ul>
              </div>
            </div>
          </BlueprintCard>
        </motion.div>
      </div>

      {/* QR Share Modal */}
      <QRShareModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        shareLink={shareLink}
      />
    </div>
  );
}