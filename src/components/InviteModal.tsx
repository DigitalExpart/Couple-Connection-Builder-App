import { useState } from 'react';
import { X, Copy, Mail, MessageSquare, Share2, CheckCircle, QrCode } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  partnerName: string;
  userName: string;
  sessionId: string;
}

export function InviteModal({ isOpen, onClose, inviteLink, partnerName, userName, sessionId }: InviteModalProps) {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  if (!isOpen) return null;

  const inviteMessage = `Hey ${partnerName}! 💕\n\nI'd love for us to try MyMatchIQ together - it's a fun compatibility quiz where we each answer questions about each other privately.\n\nJoin me here:\n${inviteLink}\n\nLet's see how well we know each other! 😊`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(`Copy this link:\n${inviteLink}`);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(`Copy this message:\n${inviteMessage}`);
    }
  };

  const handleEmailInvite = () => {
    const subject = encodeURIComponent(`Let's try MyMatchIQ together! 💕`);
    const body = encodeURIComponent(inviteMessage);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 2000);
  };

  const handleSMSInvite = () => {
    const body = encodeURIComponent(inviteMessage);
    // iOS and Android compatible
    const smsUrl = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? `sms:&body=${body}`
      : `sms:?body=${body}`;
    window.location.href = smsUrl;
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MyMatchIQ Dual Scan Invite',
          text: inviteMessage,
          url: inviteLink,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      handleCopyMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl text-gray-900 mb-1">Invite {partnerName}</h3>
            <p className="text-sm text-gray-600">Share your Dual Scan invite</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Preview Message */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 border border-purple-200">
          <div className="flex items-start gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">{userName.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                {inviteMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Share Actions */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm text-gray-700 mb-3">Share via:</h4>

          {/* Web Share API (Mobile) */}
          {navigator.share && (
            <button
              onClick={handleWebShare}
              className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <Share2 className="w-5 h-5" />
              <span>Share with Apps</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            {/* SMS */}
            <button
              onClick={handleSMSInvite}
              className="p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-2xl hover:bg-green-100 transition-all flex flex-col items-center justify-center gap-2"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Text Message</span>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailInvite}
              className="p-4 bg-blue-50 border-2 border-blue-200 text-blue-700 rounded-2xl hover:bg-blue-100 transition-all flex flex-col items-center justify-center gap-2"
            >
              {emailSent ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-sm">Opened!</span>
                </>
              ) : (
                <>
                  <Mail className="w-6 h-6" />
                  <span className="text-sm">Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Copy Options */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm text-gray-700 mb-3">Or copy to share:</h4>

          <button
            onClick={handleCopyMessage}
            className="w-full p-4 bg-white border-2 border-purple-300 text-purple-700 rounded-2xl hover:bg-purple-50 transition-all flex items-center justify-between"
          >
            <span className="text-sm">Copy Full Message</span>
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full p-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-between"
          >
            <span className="text-sm text-left flex-1 truncate mr-2">{inviteLink}</span>
            {copied ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <Copy className="w-5 h-5 flex-shrink-0" />
            )}
          </button>
        </div>

        {/* QR Code Option */}
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-xs text-gray-600">
            💡 Tip: Copy the link and create a QR code at qr-code-generator.com for easy in-person sharing!
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <p className="text-xs text-purple-900 leading-relaxed">
            <strong>How it works:</strong> Once {partnerName} clicks the link and completes their scan, you'll both be able to see your individual results. You can then choose to reveal and compare your answers together! 🎮
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
}
