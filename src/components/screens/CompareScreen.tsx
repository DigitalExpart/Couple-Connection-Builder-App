import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, XCircle, Minus } from 'lucide-react';
import { MatchScan } from '../../App';

interface CompareScreenProps {
  scan1: MatchScan;
  scan2: MatchScan;
  onBack: () => void;
}

export function CompareScreen({ scan1, scan2, onBack }: CompareScreenProps) {
  const getCategoryColor = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return 'from-emerald-500 to-green-600';
      case 'worth-exploring': return 'from-blue-500 to-cyan-600';
      case 'mixed-signals': return 'from-amber-500 to-orange-600';
      case 'caution': return 'from-orange-500 to-red-500';
      case 'high-risk': return 'from-red-500 to-rose-600';
    }
  };

  const getCategoryLabel = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return 'High Potential';
      case 'worth-exploring': return 'Worth Exploring';
      case 'mixed-signals': return 'Mixed Signals';
      case 'caution': return 'Caution';
      case 'high-risk': return 'High Risk';
    }
  };

  const calculateRatings = (scan: MatchScan) => {
    const counts = {
      'strong-match': 0,
      'good': 0,
      'neutral': 0,
      'yellow-flag': 0,
      'red-flag': 0,
    };
    scan.answers.forEach(answer => {
      counts[answer.rating]++;
    });
    return counts;
  };

  const ratings1 = calculateRatings(scan1);
  const ratings2 = calculateRatings(scan2);

  const comparisonMetrics = [
    { 
      label: 'Overall Score', 
      value1: scan1.score, 
      value2: scan2.score, 
      format: (v: number) => `${v}%`,
      higherIsBetter: true 
    },
    { 
      label: 'Strong Matches', 
      value1: ratings1['strong-match'], 
      value2: ratings2['strong-match'],
      format: (v: number) => v.toString(),
      higherIsBetter: true 
    },
    { 
      label: 'Yellow Flags', 
      value1: ratings1['yellow-flag'], 
      value2: ratings2['yellow-flag'],
      format: (v: number) => v.toString(),
      higherIsBetter: false 
    },
    { 
      label: 'Red Flags', 
      value1: ratings1['red-flag'], 
      value2: ratings2['red-flag'],
      format: (v: number) => v.toString(),
      higherIsBetter: false 
    },
    { 
      label: 'Questions Answered', 
      value1: scan1.answers.length, 
      value2: scan2.answers.length,
      format: (v: number) => v.toString(),
      higherIsBetter: true 
    },
  ];

  const getComparisonIcon = (value1: number, value2: number, higherIsBetter: boolean) => {
    if (value1 === value2) return <Minus className="w-5 h-5 text-gray-400" />;
    if (higherIsBetter) {
      return value1 > value2 
        ? <CheckCircle className="w-5 h-5 text-emerald-500" />
        : <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return value1 < value2 
        ? <CheckCircle className="w-5 h-5 text-emerald-500" />
        : <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl text-white mb-2">Compare Scans</h1>
        <p className="text-white/90">Side-by-side comparison to help you decide</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Scan Headers */}
        <div className="grid grid-cols-2 gap-4">
          {/* Scan 1 */}
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${getCategoryColor(scan1.category)} flex items-center justify-center shadow-lg`}>
                <div className="text-center">
                  <div className="text-2xl text-white">{scan1.score}</div>
                  <div className="text-xs text-white/80">score</div>
                </div>
              </div>
              <h3 className="text-gray-900 mb-1">{scan1.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{scan1.date}</p>
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(scan1.category)} text-white text-xs rounded-full`}>
                {getCategoryLabel(scan1.category)}
              </div>
            </div>
          </div>

          {/* Scan 2 */}
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${getCategoryColor(scan2.category)} flex items-center justify-center shadow-lg`}>
                <div className="text-center">
                  <div className="text-2xl text-white">{scan2.score}</div>
                  <div className="text-xs text-white/80">score</div>
                </div>
              </div>
              <h3 className="text-gray-900 mb-1">{scan2.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{scan2.date}</p>
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(scan2.category)} text-white text-xs rounded-full`}>
                {getCategoryLabel(scan2.category)}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg text-gray-900">Key Metrics</h3>
          </div>
          <div className="space-y-4">
            {comparisonMetrics.map((metric, index) => (
              <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="text-sm text-gray-600 mb-3 text-center">{metric.label}</div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* Left value */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getComparisonIcon(metric.value1, metric.value2, metric.higherIsBetter)}
                      <span className={`text-xl ${
                        metric.value1 === metric.value2 ? 'text-gray-700' :
                        (metric.higherIsBetter && metric.value1 > metric.value2) || 
                        (!metric.higherIsBetter && metric.value1 < metric.value2)
                          ? 'text-emerald-600' 
                          : 'text-gray-700'
                      }`}>
                        {metric.format(metric.value1)}
                      </span>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <span className="text-xs text-gray-400">VS</span>
                  </div>

                  {/* Right value */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-xl ${
                        metric.value1 === metric.value2 ? 'text-gray-700' :
                        (metric.higherIsBetter && metric.value2 > metric.value1) || 
                        (!metric.higherIsBetter && metric.value2 < metric.value1)
                          ? 'text-emerald-600' 
                          : 'text-gray-700'
                      }`}>
                        {metric.format(metric.value2)}
                      </span>
                      {getComparisonIcon(metric.value2, metric.value1, metric.higherIsBetter)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
              💡
            </div>
            <div>
              <h3 className="text-purple-900 mb-2">Our Analysis</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {scan1.score > scan2.score + 10 ? (
                  <>
                    <strong>{scan1.name}</strong> shows stronger compatibility indicators overall. 
                    They have {ratings1['red-flag'] === 0 ? 'no red flags' : `${ratings1['red-flag']} red flag(s)`} compared to {scan2.name}'s {ratings2['red-flag']}.
                  </>
                ) : scan2.score > scan1.score + 10 ? (
                  <>
                    <strong>{scan2.name}</strong> shows stronger compatibility indicators overall. 
                    They have {ratings2['red-flag'] === 0 ? 'no red flags' : `${ratings2['red-flag']} red flag(s)`} compared to {scan1.name}'s {ratings1['red-flag']}.
                  </>
                ) : (
                  <>
                    Both connections show similar compatibility levels. Consider other factors like emotional connection, 
                    shared values, and how you feel when you're with each person.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tags Comparison */}
        {(scan1.tags && scan1.tags.length > 0) || (scan2.tags && scan2.tags.length > 0) ? (
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-lg text-gray-900 mb-4">Tags</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-2">{scan1.name}</p>
                <div className="flex flex-wrap gap-2">
                  {scan1.tags && scan1.tags.length > 0 ? (
                    scan1.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No tags</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-2">{scan2.name}</p>
                <div className="flex flex-wrap gap-2">
                  {scan2.tags && scan2.tags.length > 0 ? (
                    scan2.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
