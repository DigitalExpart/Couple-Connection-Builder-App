import { ArrowLeft, Users, Link as LinkIcon, Copy, CheckCircle, Play, Eye, EyeOff, Send, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InviteModal } from '../InviteModal';
import { useLanguage } from '../../contexts/LanguageContext';

interface DualScanSession {
  id: string;
  createdBy: string;
  createdAt: string;
  userACompleted: boolean;
  userBCompleted: boolean;
  userAName: string;
  userBName?: string;
  revealed: boolean;
  inviteSentAt?: string;
  lastReminderAt?: string;
}

interface DualScanScreenProps {
  onBack: () => void;
  onStartDualScan: (sessionId: string, role: 'A' | 'B', partnerName: string) => void;
  onStartDualScanFlow: (sessionId: string, role: 'A' | 'B', partnerName: string) => void;
  userName: string;
}

export function DualScanScreen({ onBack, onStartDualScan, onStartDualScanFlow, userName }: DualScanScreenProps) {
  const [sessions, setSessions] = useState<DualScanSession[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedSessionForInvite, setSelectedSessionForInvite] = useState<DualScanSession | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('myMatchIQ_dualSession_'));
    const loadedSessions: DualScanSession[] = [];
    
    keys.forEach(key => {
      try {
        const session = JSON.parse(localStorage.getItem(key) || '');
        loadedSessions.push(session);
      } catch (e) {
        console.error('Error loading session:', e);
      }
    });
    
    setSessions(loadedSessions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const createSession = () => {
    if (!partnerName.trim()) return;

    const sessionId = `ds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: DualScanSession = {
      id: sessionId,
      createdBy: userName,
      createdAt: new Date().toISOString(),
      userACompleted: false,
      userBCompleted: false,
      userAName: userName,
      userBName: partnerName.trim(),
      revealed: false,
    };

    localStorage.setItem(`myMatchIQ_dualSession_${sessionId}`, JSON.stringify(session));
    const updatedSessions = [session, ...sessions];
    setSessions(updatedSessions);
    setPartnerName('');
    setShowCreateModal(false);
    
    // Automatically open invite modal for new session
    setSelectedSessionForInvite(session);
    setShowInviteModal(true);
  };

  const getInviteLink = (sessionId: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?dualScan=${sessionId}`;
  };

  const copyInviteLink = async (sessionId: string) => {
    const link = getInviteLink(sessionId);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(sessionId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert(`Copy this link:\n${link}`);
    }
  };

  const getSessionStatus = (session: DualScanSession) => {
    if (session.revealed) return { text: t('dualScan.revealed'), color: 'bg-purple-100 text-purple-700' };
    if (session.userACompleted && session.userBCompleted) return { text: t('dualScan.bothComplete'), color: 'bg-emerald-100 text-emerald-700' };
    if (session.userACompleted) return { text: t('dualScan.waitingForPartner'), color: 'bg-amber-100 text-amber-700' };
    return { text: t('dualScan.inProgress'), color: 'bg-blue-100 text-blue-700' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('dualScan.back')}</span>
        </button>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-white" />
          <h1 className="text-2xl text-white">{t('dualScan.title')}</h1>
        </div>
        <p className="text-white/90">{t('dualScan.subtitle')}</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 border border-purple-200">
          <h3 className="text-gray-900 mb-3 flex items-center gap-2">
            <span>🎮</span>
            <span>{t('dualScan.howItWorks')}</span>
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-600">1.</span>
              <span>{t('dualScan.step1')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">2.</span>
              <span>{t('dualScan.step2')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">3.</span>
              <span>{t('dualScan.step3')}</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600">4.</span>
              <span>{t('dualScan.step4')}</span>
            </li>
          </ol>
        </div>

        {/* Create New Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" />
          <span>{t('dualScan.createNew')}</span>
        </button>

        {/* Sessions List */}
        <div className="space-y-3">
          <h3 className="text-gray-900">{t('dualScan.yourScans')}</h3>
          
          {sessions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center shadow-md">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-gray-600 text-sm">
                {t('dualScan.noScans')}
              </p>
            </div>
          ) : (
            sessions.map(session => {
              const status = getSessionStatus(session);
              const isCreator = session.createdBy === userName;
              
              return (
                <div key={session.id} className="bg-white rounded-3xl p-5 shadow-md space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900">
                          {isCreator ? `${t('common.you')} ${t('common.and')} ${session.userBName}` : `${session.userAName} ${t('common.and')} ${t('common.you')}`}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${status.color}`}>
                      {status.text}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{session.userAName}</span>
                        {session.userACompleted && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div className="text-sm text-gray-900">
                        {session.userACompleted ? t('dualScan.completed') : t('dualScan.notStarted')}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{session.userBName || t('dualScan.partner')}</span>
                        {session.userBCompleted && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div className="text-sm text-gray-900">
                        {session.userBCompleted ? t('dualScan.completed') : t('dualScan.notStarted')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {isCreator && !session.userACompleted && (
                      <button
                        onClick={() => onStartDualScanFlow(session.id, 'A', session.userBName || t('dualScan.partner'))}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>{t('dualScan.startYourScan')}</span>
                      </button>
                    )}
                    
                    {!isCreator && !session.userBCompleted && (
                      <button
                        onClick={() => onStartDualScanFlow(session.id, 'B', session.userAName)}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>{t('dualScan.startYourScan')}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedSessionForInvite(session);
                        setShowInviteModal(true);
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t('dualScan.invite')}</span>
                    </button>

                    {session.userACompleted && session.userBCompleted && (
                      <button
                        className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        {session.revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-gray-900 mb-4">{t('dualScan.createModal')}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t('dualScan.partnerName')}</label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder={t('dualScan.enterName')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  autoFocus
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-xs text-purple-900">
                  {t('dualScan.modalInfo').replace('{partner}', partnerName || t('dualScan.partner').toLowerCase())}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setPartnerName('');
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                {t('dualScan.cancel')}
              </button>
              <button
                onClick={createSession}
                disabled={!partnerName.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('dualScan.createShare')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && selectedSessionForInvite && (
        <InviteModal
          isOpen={showInviteModal}
          onClose={() => {
            setShowInviteModal(false);
            setSelectedSessionForInvite(null);
          }}
          inviteLink={getInviteLink(selectedSessionForInvite.id)}
          partnerName={selectedSessionForInvite.userBName || 'Partner'}
          userName={userName}
          sessionId={selectedSessionForInvite.id}
        />
      )}
    </div>
  );
}