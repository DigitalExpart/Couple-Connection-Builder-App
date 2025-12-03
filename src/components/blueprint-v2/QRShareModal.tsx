import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Download, Share2 } from 'lucide-react';
import { BlueprintButton } from './BlueprintButton';

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  userName: string;
}

export function QRShareModal({ isOpen, onClose, qrCode, userName }: QRShareModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Title */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3C2B63] to-[#A79BC8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#3C2B63] mb-2">
                  Share Your Blueprint
                </h2>
                <p className="text-sm text-gray-600">
                  {userName}'s Match Blueprint™
                </p>
              </div>

              {/* QR Code Display */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-2xl border-2 border-[#A79BC8] mb-6"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-[#F4F4F6] to-white rounded-xl flex items-center justify-center">
                  {/* Mock QR Code - In production, use a QR code library */}
                  <div className="text-center">
                    <QrCode className="w-32 h-32 text-[#3C2B63] mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-mono">{qrCode}</p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <BlueprintButton
                  variant="gradient"
                  fullWidth
                  icon={<Download className="w-5 h-5" />}
                  onClick={() => {
                    // Download QR code logic
                    console.log('Download QR Code');
                  }}
                >
                  Download QR Code
                </BlueprintButton>
                
                <BlueprintButton
                  variant="lavender-outline"
                  fullWidth
                  icon={<Share2 className="w-5 h-5" />}
                  onClick={() => {
                    // Share logic
                    console.log('Share QR Code');
                  }}
                >
                  Share via Apps
                </BlueprintButton>
              </div>

              {/* Expiry Notice */}
              <p className="text-xs text-center text-gray-500 mt-4">
                Link expires in 72 hours • Upgrade to Premium for extended sharing
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
