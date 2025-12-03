import { ArrowLeft, ArrowRight, Download, Share2, TrendingUp, AlertTriangle, Heart, MessageSquare, Sparkles, Bot, FileText, Tag, Plus, X } from 'lucide-react';
import { MatchScan, Screen } from '../../App';
import { useState } from 'react';

interface ResultsScreenProps {
  scan: MatchScan;
  onBack: () => void;
  onContinueAssessment?: () => void;
  onUpdateScan?: (scanId: string, updates: Partial<MatchScan>) => void;
}

const CATEGORY_INFO = {
  'high-potential': {
    icon: '💚',
    title: 'High Potential Match',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-600',
    description: 'Strong compatibility indicators detected. This person shows excellent alignment with healthy relationship qualities.',
  },
  'worth-exploring': {
    icon: '💙',
    title: 'Worth Exploring',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'Good signs with some areas to explore further. Continue getting to know them while staying mindful.',
  },
  'mixed-signals': {
    icon: '💛',
    title: 'Mixed Signals',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Inconsistent indicators detected. Proceed with caution and trust your instincts.',
  },
  'caution': {
    icon: '🧡',
    title: 'Proceed with Caution',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    description: 'Several concerning patterns identified. Pay close attention to red flags.',
  },
  'high-risk': {
    icon: '❤️‍🩹',
    title: 'High Risk',
    color: 'red',
    gradient: 'from-red-500 to-rose-600',
    description: 'Significant red flags detected. Strongly consider ending this connection.',
  },
};

export function ResultsScreen({ scan, onBack, onContinueAssessment, onUpdateScan }: ResultsScreenProps) {
  const categoryInfo = CATEGORY_INFO[scan.category];
  const [notes, setNotes] = useState(scan.notes || '');
  const [tags, setTags] = useState<string[]>(scan.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleSaveNotes = () => {
    if (onUpdateScan) {
      onUpdateScan(scan.id, { notes });
    }
    setIsEditingNotes(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      if (onUpdateScan) {
        onUpdateScan(scan.id, { tags: updatedTags });
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(t => t !== tagToRemove);
    setTags(updatedTags);
    if (onUpdateScan) {
      onUpdateScan(scan.id, { tags: updatedTags });
    }
  };

  // Calculate breakdown scores
  const ratingCounts = {
    'strong-match': 0,
    'good': 0,
    'neutral': 0,
    'yellow-flag': 0,
    'red-flag': 0,
  };

  scan.answers.forEach(answer => {
    ratingCounts[answer.rating]++;
  });

  const hasRedFlags = ratingCounts['red-flag'] > 0;
  const hasYellowFlags = ratingCounts['yellow-flag'] > 0;

  // Create breakdown categories
  const breakdownScores = [
    { label: 'Emotional Alignment', score: scan.score >= 80 ? 90 : scan.score >= 60 ? 70 : scan.score >= 40 ? 50 : 30, color: 'emerald' },
    { label: 'Communication Fit', score: scan.score >= 80 ? 85 : scan.score >= 60 ? 65 : scan.score >= 40 ? 45 : 25, color: 'blue' },
    { label: 'Values Match', score: scan.score >= 80 ? 88 : scan.score >= 60 ? 68 : scan.score >= 40 ? 48 : 28, color: 'purple' },
    { label: 'Lifestyle Harmony', score: scan.score >= 80 ? 87 : scan.score >= 60 ? 67 : scan.score >= 40 ? 47 : 27, color: 'pink' },
    { label: 'Future Goals', score: scan.score >= 80 ? 86 : scan.score >= 60 ? 66 : scan.score >= 40 ? 46 : 26, color: 'indigo' },
    { label: 'Safety & Stability', score: hasRedFlags ? 20 : hasYellowFlags ? 60 : 95, color: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20 overflow-x-hidden w-full max-w-full">
      {/* Header */}
      <div className={`bg-gradient-to-br ${categoryInfo.gradient} px-6 pt-12 pb-24 relative overflow-hidden w-full`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          <button onClick={onBack} className="flex items-center gap-2 text-white mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="text-center">
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h1 className="text-3xl text-white mb-2">{scan.name}</h1>
            <p className="text-white/90 mb-2">{scan.interactionType}</p>
            {scan.categoriesCompleted && scan.categoriesCompleted.length > 0 && (
              <p className="text-sm text-white/80 mb-6">
                {scan.answers.length} questions • {scan.categoriesCompleted.length} categories assessed
              </p>
            )}
            
            {/* Score Circle */}
            <div className="inline-block">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - scan.score / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-white">{scan.score}</div>
                    <div className="text-xs text-white/80">SCORE</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                {categoryInfo.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-10 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-white px-4 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2 text-gray-700">
            <Download className="w-5 h-5" />
            <span className="text-xs">Export</span>
          </button>
          <button className="bg-white px-4 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2 text-gray-700">
            <Share2 className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </button>
          {onContinueAssessment && (
            <button 
              onClick={onContinueAssessment}
              className="bg-white px-4 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2 text-gray-700"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="text-xs">Edit</span>
            </button>
          )}
        </div>

        {/* Continue Assessment CTA - Show if not all questions answered */}
        {onContinueAssessment && scan.answers.length < 30 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-3xl border-2 border-blue-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-blue-900 mb-2">Want a More Complete Picture?</h3>
                <p className="text-sm text-blue-700 leading-relaxed mb-1">
                  You've answered <strong>{scan.answers.length} of 30</strong> questions across {scan.categoriesCompleted?.length || 0} categories.
                </p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Continue the assessment to get more accurate insights and explore additional compatibility areas.
                </p>
              </div>
            </div>
            <button
              onClick={onContinueAssessment}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span className="text-lg">Continue Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Recommendation */}
        <div className={`${categoryInfo.bg} p-6 rounded-3xl border-2 border-${scan.category === 'high-risk' ? 'red' : scan.category === 'caution' ? 'orange' : scan.category === 'mixed-signals' ? 'amber' : 'blue'}-200`}>
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 text-2xl`}>
              💡
            </div>
            <div>
              <h3 className={`${categoryInfo.text} mb-2`}>Our Recommendation</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {categoryInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg text-gray-900">Compatibility Breakdown</h3>
          </div>
          <div className="space-y-4">
            {breakdownScores.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-900">{item.score}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 transition-all duration-1000 ease-out`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Concerns */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-3xl border border-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-emerald-600" />
              <h3 className="text-gray-900">Strengths</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {ratingCounts['strong-match'] > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>{ratingCounts['strong-match']} strong compatibility indicators</span>
                </li>
              )}
              {ratingCounts['good'] > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">•</span>
                  <span>{ratingCounts['good']} positive responses</span>
                </li>
              )}
              {ratingCounts['strong-match'] === 0 && ratingCounts['good'] === 0 && (
                <li className="text-gray-500 italic">Limited positive indicators detected</li>
              )}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border border-amber-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-gray-900">Watch For</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {ratingCounts['yellow-flag'] > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>{ratingCounts['yellow-flag']} yellow flag{ratingCounts['yellow-flag'] > 1 ? 's' : ''} noted</span>
                </li>
              )}
              {ratingCounts['red-flag'] > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-red-700">{ratingCounts['red-flag']} red flag{ratingCounts['red-flag'] > 1 ? 's' : ''} detected</span>
                </li>
              )}
              {ratingCounts['neutral'] > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{ratingCounts['neutral']} unclear/neutral response{ratingCounts['neutral'] > 1 ? 's' : ''}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Red Flag Report */}
        {hasRedFlags && (
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-3xl border-2 border-red-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                🚩
              </div>
              <div>
                <h3 className="text-red-700 mb-2">Red Flags Detected</h3>
                <p className="text-sm text-gray-700 mb-4">
                  The following concerns were identified during this scan. Consider these seriously before proceeding:
                </p>
                <ul className="space-y-2">
                  {scan.answers
                    .filter(a => a.rating === 'red-flag')
                    .map((answer, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{answer.question}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg text-gray-900">Suggested Next Steps</h3>
          </div>
          <div className="space-y-3">
            {scan.category === 'high-potential' && (
              <>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Continue building emotional connection through deeper conversations</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Observe consistency between their words and actions over time</span>
                </div>
              </>
            )}
            {(scan.category === 'worth-exploring' || scan.category === 'mixed-signals') && (
              <>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Ask clarifying questions about areas of concern</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Take time to observe patterns before deepening commitment</span>
                </div>
              </>
            )}
            {(scan.category === 'caution' || scan.category === 'high-risk') && (
              <>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Trust your instincts and maintain strong boundaries</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MessageSquare className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Consider whether this aligns with your relationship goals</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg text-gray-900">Private Notes</h3>
          </div>
          {isEditingNotes ? (
            <div className="space-y-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your thoughts, observations, or anything you want to remember about this person..."
                className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 text-sm leading-relaxed"
                rows={5}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNotes}
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-md transition-all"
                >
                  Save Notes
                </button>
                <button
                  onClick={() => {
                    setNotes(scan.notes || '');
                    setIsEditingNotes(false);
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {notes ? (
                <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">{notes}</p>
              ) : (
                <p className="text-sm text-gray-400 italic mb-3">No notes yet. Click "Add Note" to record your thoughts.</p>
              )}
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>{notes ? 'Edit Note' : 'Add Note'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg text-gray-900">Tags</h3>
          </div>
          <div className="space-y-3">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag();
                  }
                }}
                placeholder="e.g., Bumble, Hinge, Met IRL..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 text-sm"
              />
              <button
                onClick={handleAddTag}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-md transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Tag this scan to organize and find it later (e.g., dating app name, how you met, etc.)
            </p>
          </div>
        </div>

        {/* AI Coach CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-6 rounded-3xl shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-white mb-1">Need Guidance?</h3>
              <p className="text-white/90 text-sm mb-4">
                Talk to our AI Coach for personalized advice based on this scan
              </p>
              <p className="text-xs text-white/70">
                Available with Exclusive subscription
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}