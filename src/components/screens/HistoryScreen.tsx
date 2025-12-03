import { ArrowLeft, Search, Filter, Star, Trash2, BarChart2, GitCompare, Home } from 'lucide-react';
import { MatchScan } from '../../App';
import { useState } from 'react';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import { HomeButton } from '../HomeButton';

interface HistoryScreenProps {
  scans: MatchScan[];
  onBack: () => void;
  onViewScan: (scan: MatchScan) => void;
  onDeleteScan: (scanId: string) => void;
  onCompareScans?: (scan1: MatchScan, scan2: MatchScan) => void;
  onNavigateHome?: () => void;
}

export function HistoryScreen({ scans, onBack, onViewScan, onDeleteScan, onCompareScans, onNavigateHome }: HistoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<MatchScan['category'] | 'all'>('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [scanToDelete, setScanToDelete] = useState<MatchScan | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedScans, setSelectedScans] = useState<MatchScan[]>([]);

  const handleToggleCompareMode = () => {
    setCompareMode(!compareMode);
    setSelectedScans([]);
  };

  const handleSelectScan = (scan: MatchScan, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedScans.find(s => s.id === scan.id)) {
      setSelectedScans(selectedScans.filter(s => s.id !== scan.id));
    } else if (selectedScans.length < 2) {
      setSelectedScans([...selectedScans, scan]);
    }
  };

  const handleCompare = () => {
    if (selectedScans.length === 2 && onCompareScans) {
      onCompareScans(selectedScans[0], selectedScans[1]);
    }
  };

  const getCategoryColor = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return 'bg-emerald-100 text-emerald-700';
      case 'worth-exploring': return 'bg-blue-100 text-blue-700';
      case 'mixed-signals': return 'bg-amber-100 text-amber-700';
      case 'caution': return 'bg-orange-100 text-orange-700';
      case 'high-risk': return 'bg-red-100 text-red-700';
    }
  };

  const getCategoryIcon = (category: MatchScan['category']) => {
    switch (category) {
      case 'high-potential': return '🌟';
      case 'worth-exploring': return '✨';
      case 'mixed-signals': return '🤔';
      case 'caution': return '⚠️';
      case 'high-risk': return '🚨';
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

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || scan.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).reverse();

  const stats = {
    total: scans.length,
    highPotential: scans.filter(s => s.category === 'high-potential').length,
    redFlags: scans.filter(s => s.answers.some(a => a.rating === 'red-flag')).length,
    avgScore: scans.length > 0 ? Math.round(scans.reduce((sum, s) => sum + s.score, 0) / scans.length) : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl text-white mb-2">Scan History</h1>
        <p className="text-white/90">Review your past compatibility scans</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="text-2xl text-rose-600 mb-1">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="text-2xl text-emerald-600 mb-1">{stats.highPotential}</div>
            <div className="text-xs text-gray-600">High Match</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="text-2xl text-red-600 mb-1">{stats.redFlags}</div>
            <div className="text-xs text-gray-600">Red Flags</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="text-2xl text-blue-600 mb-1">{stats.avgScore}</div>
            <div className="text-xs text-gray-600">Avg Score</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          {/* Compare Mode Button - Only show if there are 2+ scans */}
          {filteredScans.length >= 2 && onCompareScans && (
            <button
              onClick={handleToggleCompareMode}
              className={`w-full py-3 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                compareMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span>{compareMode ? 'Cancel Compare' : 'Compare Scans'}</span>
            </button>
          )}

          {/* Compare Instructions */}
          {compareMode && (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
              <p className="text-sm text-purple-900">
                Select <strong>2 scans</strong> to compare ({selectedScans.length}/2 selected)
              </p>
              {selectedScans.length === 2 && (
                <button
                  onClick={handleCompare}
                  className="mt-3 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Compare {selectedScans[0].name} vs {selectedScans[1].name}
                </button>
              )}
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filterCategory === 'all'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              All Scans
            </button>
            <button
              onClick={() => setFilterCategory('high-potential')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filterCategory === 'high-potential'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              🌟 High Potential
            </button>
            <button
              onClick={() => setFilterCategory('worth-exploring')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filterCategory === 'worth-exploring'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              ✨ Worth Exploring
            </button>
            <button
              onClick={() => setFilterCategory('high-risk')}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filterCategory === 'high-risk'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              🚨 High Risk
            </button>
          </div>
        </div>

        {/* Scan List */}
        {filteredScans.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">
              {searchTerm || filterCategory !== 'all' ? 'No Matches Found' : 'No Scans Yet'}
            </h3>
            <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
              {searchTerm || filterCategory !== 'all'
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'Start evaluating your connections to build your compatibility history and track your dating journey.'}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transition-all"
              >
                Start First Scan
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredScans.map((scan) => {
              const isSelected = selectedScans.find(s => s.id === scan.id);
              return (
                <div
                  key={scan.id}
                  onClick={(e) => compareMode ? handleSelectScan(scan, e) : onViewScan(scan)}
                  className={`w-full bg-white p-5 rounded-3xl shadow-md hover:shadow-lg transition-all cursor-pointer relative ${
                    isSelected ? 'ring-4 ring-purple-500' : ''
                  }`}
                >
                  {/* Compare Mode Checkbox */}
                  {compareMode && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-purple-500' : 'bg-gray-200'
                      }`}>
                        {isSelected && <span className="text-white text-sm">✓</span>}
                      </div>
                    </div>
                  )}

                  <div className={`flex items-center gap-4 ${compareMode ? 'ml-8' : ''}`}>
                    {/* Score Circle */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl text-rose-700">{scan.score}</div>
                          <div className="text-xs text-rose-600">score</div>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg text-gray-900 truncate">{scan.name}</h3>
                        <span className="text-lg">{getCategoryIcon(scan.category)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs ${getCategoryColor(scan.category)}`}>
                          {getCategoryLabel(scan.category)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{scan.date}</span>
                        <span>•</span>
                        <span>{scan.deck}</span>
                      </div>
                    </div>

                    {/* Actions - Hide in compare mode */}
                    {!compareMode && (
                      <div className="flex flex-col gap-2">
                        <button className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors">
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScanToDelete(scan);
                            setDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (scanToDelete) {
            onDeleteScan(scanToDelete.id);
          }
        }}
        scanName={scanToDelete?.name || ''}
      />

      {/* Home Button */}
      {onNavigateHome && <HomeButton onClick={onNavigateHome} />}
    </div>
  );
}