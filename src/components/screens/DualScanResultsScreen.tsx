import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, AlertTriangle, Heart, Eye, Share2 } from 'lucide-react';
import { DualScanAnswer } from './DualScanFlowScreen';

interface DualScanResultsScreenProps {
  sessionId: string;
  role: 'A' | 'B';
  partnerName: string;
  userName: string;
  score: number;
  answers: DualScanAnswer[];
  onBack: () => void;
  onViewAllScans: () => void;
}

export function DualScanResultsScreen({
  sessionId,
  role,
  partnerName,
  userName,
  score,
  answers,
  onBack,
  onViewAllScans,
}: DualScanResultsScreenProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [otherPersonCompleted, setOtherPersonCompleted] = useState(false);

  useEffect(() => {
    // Check if the other person has completed their scan
    checkOtherPersonStatus();
  }, []);

  const checkOtherPersonStatus = () => {
    try {
      const sessionData = localStorage.getItem(`myMatchIQ_dualSession_${sessionId}`);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const completed = role === 'A' ? session.userBCompleted : session.userACompleted;
        setOtherPersonCompleted(completed);
      }
    } catch (e) {
      console.error('Error checking status:', e);
    }
  };

  const getScoreCategory = (score: number): { label: string; icon: string; color: string } => {
    if (score >= 85) return { label: 'High Potential', icon: '🌟', color: 'text-emerald-600' };
    if (score >= 70) return { label: 'Worth Exploring', icon: '✨', color: 'text-blue-600' };
    if (score >= 55) return { label: 'Mixed Signals', icon: '🤔', color: 'text-amber-600' };
    if (score >= 40) return { label: 'Caution', icon: '⚠️', color: 'text-orange-600' };
    return { label: 'High Risk', icon: '🚨', color: 'text-red-600' };
  };

  const category = getScoreCategory(score);

  const categoryBreakdown = answers.reduce((acc, answer) => {
    if (!acc[answer.category]) {
      acc[answer.category] = {
        total: 0,
        strongMatch: 0,
        good: 0,
        neutral: 0,
        yellowFlag: 0,
        redFlag: 0,
      };
    }
    acc[answer.category].total++;
    if (answer.rating === 'strong-match') acc[answer.category].strongMatch++;
    if (answer.rating === 'good') acc[answer.category].good++;
    if (answer.rating === 'neutral') acc[answer.category].neutral++;
    if (answer.rating === 'yellow-flag') acc[answer.category].yellowFlag++;
    if (answer.rating === 'red-flag') acc[answer.category].redFlag++;
    return acc;
  }, {} as Record<string, any>);

  const redFlags = answers.filter(a => a.rating === 'red-flag');
  const yellowFlags = answers.filter(a => a.rating === 'yellow-flag');
  const strengths = answers.filter(a => a.rating === 'strong-match' || a.rating === 'good');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dual Scans</span>
        </button>
        <h1 className="text-2xl text-white mb-2">Your Results</h1>
        <p className="text-white/90">How you evaluated {partnerName}</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Status Banner */}
        {otherPersonCompleted ? (
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-300 rounded-3xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-900">Both Scans Complete!</h3>
                <p className="text-sm text-emerald-700">
                  {partnerName} has also completed their evaluation
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all mt-3">
              Reveal & Compare Results
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-3xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-amber-900">Waiting for {partnerName}</h3>
                <p className="text-sm text-amber-700">
                  Once they complete their scan, you can reveal and compare!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-gray-900 mb-6">Your Compatibility Score</h2>
          
          {/* Score Circle */}
          <div className="inline-block">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - score / 100)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {score}
                  </div>
                  <div className="text-sm text-gray-500">/ 100</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className={`text-xl ${category.color} mb-2`}>{category.label}</h3>
            <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
              Based on your evaluation of {partnerName} across {answers.length} questions
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl text-emerald-600 mb-1">{strengths.length}</div>
            <div className="text-xs text-gray-600">Strengths</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl text-amber-600 mb-1">{yellowFlags.length}</div>
            <div className="text-xs text-gray-600">Yellow Flags</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <div className="text-2xl text-red-600 mb-1">{redFlags.length}</div>
            <div className="text-xs text-gray-600">Red Flags</div>
          </div>
        </div>

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-4 bg-white text-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          {showDetails ? 'Hide Details' : 'View Detailed Breakdown'}
        </button>

        {/* Detailed Breakdown */}
        {showDetails && (
          <>
            {/* Red Flags */}
            {redFlags.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-gray-900">Red Flags to Consider</h3>
                </div>
                <div className="space-y-3">
                  {redFlags.map((answer, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-2xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">🚩</span>
                        <p className="text-sm text-gray-900 flex-1">{answer.question}</p>
                      </div>
                      <div className="text-xs text-gray-600">{answer.category}</div>
                      {answer.notes && (
                        <div className="mt-2 text-sm text-gray-700 italic">
                          Note: {answer.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yellow Flags */}
            {yellowFlags.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-gray-900">Areas to Explore</h3>
                </div>
                <div className="space-y-3">
                  {yellowFlags.map((answer, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">💛</span>
                        <p className="text-sm text-gray-900 flex-1">{answer.question}</p>
                      </div>
                      <div className="text-xs text-gray-600">{answer.category}</div>
                      {answer.notes && (
                        <div className="mt-2 text-sm text-gray-700 italic">
                          Note: {answer.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {strengths.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-gray-900">Key Strengths</h3>
                </div>
                <div className="space-y-3">
                  {strengths.slice(0, 5).map((answer, idx) => (
                    <div key={idx} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">{answer.rating === 'strong-match' ? '💚' : '💙'}</span>
                        <p className="text-sm text-gray-900 flex-1">{answer.question}</p>
                      </div>
                      <div className="text-xs text-gray-600">{answer.category}</div>
                      {answer.notes && (
                        <div className="mt-2 text-sm text-gray-700 italic">
                          Note: {answer.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Breakdown */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-gray-900 mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).map(([cat, data]: [string, any]) => (
                  <div key={cat} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900">{cat}</span>
                      <span className="text-xs text-gray-600">{data.total} questions</span>
                    </div>
                    <div className="flex gap-1">
                      {data.strongMatch > 0 && (
                        <div 
                          className="h-2 bg-emerald-500 rounded-full"
                          style={{ width: `${(data.strongMatch / data.total) * 100}%` }}
                        />
                      )}
                      {data.good > 0 && (
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(data.good / data.total) * 100}%` }}
                        />
                      )}
                      {data.neutral > 0 && (
                        <div 
                          className="h-2 bg-gray-400 rounded-full"
                          style={{ width: `${(data.neutral / data.total) * 100}%` }}
                        />
                      )}
                      {data.yellowFlag > 0 && (
                        <div 
                          className="h-2 bg-amber-500 rounded-full"
                          style={{ width: `${(data.yellowFlag / data.total) * 100}%` }}
                        />
                      )}
                      {data.redFlag > 0 && (
                        <div 
                          className="h-2 bg-red-500 rounded-full"
                          style={{ width: `${(data.redFlag / data.total) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Privacy Notice */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <p className="text-xs text-purple-900 text-center">
            🔒 Your answers are private. {partnerName} cannot see your responses unless you both choose to reveal them.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onViewAllScans}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            View All Dual Scans
          </button>
        </div>
      </div>
    </div>
  );
}