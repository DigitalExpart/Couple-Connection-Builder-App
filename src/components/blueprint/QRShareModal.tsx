import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { BlueprintButton } from './BlueprintButton';

interface QRShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  expiresIn?: string;
}

export function QRShareModal({ 
  isOpen, 
  onClose, 
  shareUrl,
  expiresIn = '72 hours' 
}: QRShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Match Blueprint™',
          text: 'Check out my Match Blueprint™!',
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  // Generate simple QR code placeholder using SVG
  const generateQRPlaceholder = () => {
    const size = 200;
    const modules = 25;
    const moduleSize = size / modules;
    const pattern = [];
    
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        // Create a pseudo-random but consistent pattern based on shareUrl
        const hash = (shareUrl.charCodeAt(i % shareUrl.length) + i * j) % 2;
        if (hash === 0 || (i < 7 && j < 7) || (i < 7 && j > modules - 8) || (i > modules - 8 && j < 7)) {
          pattern.push({ x: j * moduleSize, y: i * moduleSize });
        }
      }
    }
    
    return pattern;
  };

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#3C2B63] to-[#5A4180] text-white p-6 rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Share2 className="w-8 h-8 text-[#FFD88A]" />
                  </div>
                  <h2 className="text-2xl mb-2">Share Your Blueprint</h2>
                  <p className="text-sm text-white/80">
                    Let others see your ideal match profile
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* QR Code */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <div className="inline-block bg-white p-4 rounded-xl shadow-md">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <rect width="200" height="200" fill="white" />
                      {generateQRPlaceholder().map((pos, i) => (
                        <rect
                          key={i}
                          x={pos.x}
                          y={pos.y}
                          width={8}
                          height={8}
                          fill="#3C2B63"
                        />
                      ))}
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    Scan with phone camera to view blueprint
                  </p>
                </div>

                {/* Share URL */}
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">
                    Share Link
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 truncate">
                      {shareUrl}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="w-12 h-12 flex items-center justify-center bg-[#3C2B63] rounded-xl text-white hover:bg-[#2A1F4A] transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expiry Notice */}
                <div className="bg-[#FFD88A]/10 border border-[#FFD88A]/30 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <span className="text-[#3C2B63]">⏱️</span> Link expires in <strong>{expiresIn}</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Premium users can extend link duration
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {navigator.share && (
                    <BlueprintButton
                      onClick={handleShare}
                      variant="primary"
                      fullWidth
                    >
                      Share via...
                    </BlueprintButton>
                  )}
                  
                  <BlueprintButton
                    onClick={onClose}
                    variant="outline"
                    fullWidth
                  >
                    Done
                  </BlueprintButton>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
