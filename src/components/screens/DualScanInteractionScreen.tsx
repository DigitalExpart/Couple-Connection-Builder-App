import { ArrowLeft, MessageSquare, Phone, Video, MessageCircle, Check } from 'lucide-react';

export type InteractionType = 'text' | 'call' | 'date' | 'video' | 'dm';

interface DualScanInteractionScreenProps {
  onBack: () => void;
  onSelectInteraction: (type: InteractionType) => void;
  partnerName: string;
}

const INTERACTION_TYPES = [
  { id: 'text' as InteractionType, name: 'Text/Chat', icon: MessageSquare, color: 'blue', description: 'Messaging back and forth' },
  { id: 'call' as InteractionType, name: 'Phone Call', icon: Phone, color: 'purple', description: 'Voice conversation' },
  { id: 'date' as InteractionType, name: 'First Date', icon: '❤️', color: 'rose', emoji: true, description: 'Meeting in person' },
  { id: 'video' as InteractionType, name: 'Video Call', icon: Video, color: 'pink', description: 'Face-to-face online' },
  { id: 'dm' as InteractionType, name: 'Social Media DM', icon: MessageCircle, color: 'cyan', description: 'Instagram, X, etc.' },
];

export function DualScanInteractionScreen({ onBack, onSelectInteraction, partnerName }: DualScanInteractionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl text-white mb-2">How are you interacting?</h1>
        <p className="text-white/90">Select how you'll be connecting with {partnerName}</p>
      </div>

      <div className="px-6 py-6">
        {/* Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Personalized Questions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We'll tailor the questions based on how you're connecting with {partnerName}
              </p>
            </div>
          </div>
        </div>

        {/* Interaction Type Cards */}
        <div className="space-y-3">
          {INTERACTION_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelectInteraction(type.id)}
              className={`w-full bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all text-left group border-2 border-transparent hover:border-${type.color}-300`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br from-${type.color}-100 to-${type.color}-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {type.emoji ? (
                    <span className="text-2xl">{type.icon}</span>
                  ) : (
                    <type.icon className={`w-7 h-7 text-${type.color}-600`} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-${type.color}-50 flex items-center justify-center group-hover:bg-${type.color}-100 transition-colors`}>
                  <Check className={`w-5 h-5 text-${type.color}-600 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Skip Option */}
        <button
          onClick={() => onSelectInteraction('text')}
          className="w-full mt-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
        >
          Skip - Use Default Questions
        </button>
      </div>
    </div>
  );
}