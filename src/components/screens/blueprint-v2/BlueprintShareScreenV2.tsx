import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, QrCode, Share2, Link2, Check, Clock } from 'lucide-react';
import { BlueprintButton } from '../../blueprint-v2/BlueprintButton';
import { QRShareModal } from '../../blueprint-v2/QRShareModal';

interface BlueprintShareScreenV2Props {
  userName: string;
  blueprintId: string;
  onBack: () => void;
}

export function BlueprintShareScreenV2({
  userName,
  blueprintId,
  onBack
}: BlueprintShareScreenV2Props) {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const shareLink = `https://mymatchiq.app/blueprint/${blueprintId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName}'s Match Blueprint™`,
          text: 'Check out my Match Blueprint™ and see if we\'re compatible!',
          url: shareLink
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F6] via-white to-[#A79BC8]/10">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="text-[#3C2B63] hover:text-[#A79BC8] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#3C2B63] mb-3">
            Share Your Blueprint
          </h1>
          <p className="text-lg text-gray-600">
            Let potential matches see what you're looking for
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="blueprint-frosted rounded-3xl p-8 mb-8 shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#3C2B63] mb-2">
            {userName}'s Match Blueprint™
          </h2>
          
          <p className="text-gray-600 mb-6">
            Complete compatibility profile with values, preferences, and deal-breakers
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4F4F6] rounded-xl text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Expires in 72 hours</span>
          </div>
        </motion.div>

        {/* Share Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 max-w-md mx-auto mb-8"
        >
          <BlueprintButton
            variant="gradient"
            fullWidth
            size="lg"
            icon={copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            onClick={handleCopyLink}
          >
            {copied ? 'Link Copied!' : 'Copy Link'}
          </BlueprintButton>

          <BlueprintButton
            variant="lavender-outline"
            fullWidth
            size="lg"
            icon={<QrCode className="w-5 h-5" />}
            onClick={() => setShowQRModal(true)}
          >
            Show QR Code
          </BlueprintButton>

          {navigator.share && (
            <BlueprintButton
              variant="lavender-outline"
              fullWidth
              size="lg"
              icon={<Share2 className="w-5 h-5" />}
              onClick={handleShare}
            >
              Share via Other Apps
            </BlueprintButton>
          )}
        </motion.div>

        {/* Link Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="blueprint-frosted rounded-2xl p-6 max-w-md mx-auto mb-8"
        >
          <p className="text-sm text-gray-600 mb-2">Your Share Link</p>
          <div className="flex items-center gap-3 p-3 bg-[#F4F4F6] rounded-xl">
            <code className="flex-1 text-sm text-[#3C2B63] truncate font-mono">
              {shareLink}
            </code>
            <button
              onClick={handleCopyLink}
              className="flex-shrink-0 p-2 hover:bg-white rounded-lg transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock className="w-4 h-4 text-amber-600" />
            <p className="text-sm text-amber-800">
              Link expires in <strong>72 hours</strong>
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Premium users can extend link duration and remove expiry
          </p>
        </motion.div>
      </div>

      {/* QR Modal */}
      <QRShareModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        qrCode={blueprintId}
        userName={userName}
      />
    </div>
  );
}
