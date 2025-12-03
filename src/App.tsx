import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ScanTypeSelectionScreen } from './components/screens/ScanTypeSelectionScreen';
import { MatchScanFlowScreen } from './components/screens/MatchScanFlowScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { AICoachScreen } from './components/screens/AICoachScreen';
import { StyleGuideScreen } from './components/screens/StyleGuideScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SubscriptionScreen } from './components/screens/SubscriptionScreen';
import { CompareScreen } from './components/screens/CompareScreen';
import { LegalScreen } from './components/screens/LegalScreen';
import { DualScanScreen } from './components/screens/DualScanScreen';
import { DualScanInteractionScreen, InteractionType } from './components/screens/DualScanInteractionScreen';
import { DualScanCategoryScreen } from './components/screens/DualScanCategoryScreen';
import { FloatingHearts } from './components/FloatingHearts';
import { DualScanFlowScreen } from './components/screens/DualScanFlowScreen';
import { DualScanResultsScreen } from './components/screens/DualScanResultsScreen';
import { DualScanAnswer } from './components/screens/DualScanFlowScreen';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { BlueprintHomeScreen } from './components/screens/BlueprintHomeScreen';
import { BlueprintQuestionnaireScreen, BlueprintAnswer } from './components/screens/BlueprintQuestionnaireScreen';
import { BlueprintGenerationScreen } from './components/screens/BlueprintGenerationScreen';
import { BlueprintSummaryScreen } from './components/screens/BlueprintSummaryScreen';
import { BlueprintShareScreen } from './components/screens/BlueprintShareScreen';
import { BlueprintComparisonScreen } from './components/screens/BlueprintComparisonScreen';
import { IncomingBlueprintScreen } from './components/screens/IncomingBlueprintScreen';
import { PreCompatibilitySnapshotScreen } from './components/screens/PreCompatibilitySnapshotScreen';
import { LanguageSelectionScreen } from './components/screens/LanguageSelectionScreen';
import { SelfAssessmentReminderBanner } from './components/SelfAssessmentReminderBanner';
import { AssessmentBlockedModal } from './components/AssessmentBlockedModal';

export type Screen = 
  | 'welcome'
  | 'onboarding'
  | 'dashboard'
  | 'scanTypeSelection'
  | 'matchScan'
  | 'results'
  | 'history'
  | 'aiCoach'
  | 'styleGuide'
  | 'profile'
  | 'subscription'
  | 'compare'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'dualScan'
  | 'dualScanInteraction'
  | 'dualScanCategories'
  | 'dualScanFlow'
  | 'dualScanResults'
  | 'blueprintHome'
  | 'blueprintQuestionnaire'
  | 'blueprintGeneration'
  | 'blueprintSummary'
  | 'blueprintShare'
  | 'blueprintComparison'
  | 'incomingBlueprint'
  | 'preCompatibilitySnapshot'
  | 'languageSelection';

export type SubscriptionTier = 'free' | 'premium' | 'exclusive';

export interface UserProfile {
  name: string;
  age: number;
  datingGoal: 'casual' | 'serious' | 'long-term' | 'marriage';
  language?: 'en' | 'es' | 'fr' | 'de' | 'it';
  location?: string;
  email?: string;
  phone?: string;
  bio?: string;
  // Self-assessment fields
  selfAssessmentComplete?: boolean;
  selfAssessmentProgress?: number; // 0-100
  selfAssessmentAnswers?: BlueprintAnswer[];
  blueprintQRCode?: string;
  lastAssessmentReminder?: string; // ISO timestamp
}

export interface MatchScan {
  id: string;
  name: string;
  date: string;
  score: number;
  category: 'high-potential' | 'worth-exploring' | 'mixed-signals' | 'caution' | 'high-risk';
  interactionType: string;
  deck: string;
  answers: ScanAnswer[];
  categoriesCompleted?: string[];
  notes?: string;
  tags?: string[];
}

export interface ScanAnswer {
  question: string;
  rating: 'strong-match' | 'good' | 'neutral' | 'yellow-flag' | 'red-flag';
  notes?: string;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t, setLanguage } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [scans, setScans] = useState<MatchScan[]>([]);
  const [currentScan, setCurrentScan] = useState<MatchScan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dualScanState, setDualScanState] = useState<{
    sessionId: string;
    role: 'A' | 'B';
    partnerName: string;
    currentStep: number;
    answers: DualScanAnswer[];
    score?: number;
    selectedCategories?: string[];
    isUnified?: boolean;
    interactionType?: InteractionType;
  } | null>(null);
  const [continuingScanId, setContinuingScanId] = useState<string | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
  const [compareScans, setCompareScans] = useState<[MatchScan, MatchScan] | null>(null);
  const [blueprintAnswers, setBlueprintAnswers] = useState<BlueprintAnswer[] | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [showAssessmentBlockedModal, setShowAssessmentBlockedModal] = useState(false);
  const [showReminderBanner, setShowReminderBanner] = useState(false);
  
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('myMatchIQ_userProfile');
      const savedTier = localStorage.getItem('myMatchIQ_subscriptionTier');
      const savedScans = localStorage.getItem('myMatchIQ_scans');
      const savedBlueprint = localStorage.getItem('myMatchIQ_blueprint');
      const savedBlueprintId = localStorage.getItem('myMatchIQ_blueprintId');
      
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        
        // Set language from profile if available
        if (profile.language) {
          setLanguage(profile.language);
        }
        
        // Check for dual scan invite in URL
        const urlParams = new URLSearchParams(window.location.search);
        const dualScanId = urlParams.get('dualScan');
        
        if (dualScanId) {
          // Load the dual scan session
          handleDualScanInvite(dualScanId);
        } else {
          // If user has completed onboarding, skip to dashboard
          setCurrentScreen('dashboard');
        }
      } else {
        // Check for dual scan invite even without profile
        const urlParams = new URLSearchParams(window.location.search);
        const dualScanId = urlParams.get('dualScan');
        
        if (dualScanId) {
          // Need to complete onboarding first
          alert('Please complete your profile first before joining a dual scan!');
        }
      }
      
      if (savedTier) {
        setSubscriptionTier(savedTier as SubscriptionTier);
      }
      
      if (savedScans) {
        setScans(JSON.parse(savedScans));
      }
      
      if (savedBlueprint) {
        setBlueprintAnswers(JSON.parse(savedBlueprint));
      }
      
      if (savedBlueprintId) {
        setBlueprintId(savedBlueprintId);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save userProfile to localStorage whenever it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('myMatchIQ_userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Save subscriptionTier to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('myMatchIQ_subscriptionTier', subscriptionTier);
  }, [subscriptionTier]);

  // Save scans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('myMatchIQ_scans', JSON.stringify(scans));
  }, [scans]);

  // Save blueprint answers to localStorage whenever they change
  useEffect(() => {
    if (blueprintAnswers) {
      localStorage.setItem('myMatchIQ_blueprint', JSON.stringify(blueprintAnswers));
    }
  }, [blueprintAnswers]);

  // Save blueprint ID to localStorage whenever it changes
  useEffect(() => {
    if (blueprintId) {
      localStorage.setItem('myMatchIQ_blueprintId', blueprintId);
    }
  }, [blueprintId]);

  const handleCompleteOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('dashboard');
  };

  const handleStartScan = () => {
    setContinuingScanId(null);
    setCurrentScreen('matchScan');
  };

  const handleCompleteScan = (scan: MatchScan) => {
    if (continuingScanId) {
      // Update existing scan
      setScans(prev => prev.map(s => s.id === continuingScanId ? scan : s));
      setContinuingScanId(null);
    } else {
      // Add new scan
      setScans(prev => [...prev, scan]);
    }
    setCurrentScan(scan);
    setCurrentScreen('results');
  };

  const handleContinueAssessment = () => {
    if (currentScan) {
      setContinuingScanId(currentScan.id);
      setCurrentScreen('matchScan');
    }
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleDeleteScan = (scanId: string) => {
    setScans(prev => prev.filter(s => s.id !== scanId));
    // If the deleted scan was the current scan, clear it
    if (currentScan?.id === scanId) {
      setCurrentScan(null);
      setCurrentScreen('dashboard');
    }
  };

  const handleUpdateScan = (scanId: string, updates: Partial<MatchScan>) => {
    setScans(prev => prev.map(s => s.id === scanId ? { ...s, ...updates } : s));
    // If updating the current scan, update it too
    if (currentScan?.id === scanId) {
      setCurrentScan(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleCompareScans = (scan1: MatchScan, scan2: MatchScan) => {
    setCompareScans([scan1, scan2]);
    setCurrentScreen('compare');
  };

  const handleResetAllData = () => {
    setScans([]);
    setCurrentScan(null);
    setContinuingScanId(null);
    setCompareScans(null);
    // Clear localStorage
    localStorage.removeItem('myMatchIQ_scans');
  };

  // Dual scan handlers
  const handleDualScanInvite = (sessionId: string) => {
    try {
      const sessionData = localStorage.getItem(`myMatchIQ_dualSession_${sessionId}`);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        setDualScanState({
          sessionId,
          role: session.createdBy === userProfile?.name ? 'A' : 'B',
          partnerName: session.createdBy === userProfile?.name ? (session.userBName || 'Partner') : session.userAName,
          currentStep: 0,
          answers: [],
        });
        
        setCurrentScreen('dualScan');
      } else {
        // Session doesn't exist yet, show dual scan screen to see it
        setCurrentScreen('dualScan');
      }
    } catch (error) {
      console.error('Error loading dual scan:', error);
      setCurrentScreen('dashboard');
    }
  };

  const handleStartDualScan = (sessionId: string, role: 'A' | 'B', partnerName: string) => {
    setDualScanState({
      sessionId,
      role,
      partnerName,
      currentStep: 1,
      answers: [],
    });
    setCurrentScreen('dualScanInteraction');
  };

  const handleDualScanSelectInteraction = (interactionType: InteractionType) => {
    setDualScanState(prev => ({
      ...prev!,
      currentStep: 2,
      interactionType,
    }));
    setCurrentScreen('dualScanCategories');
  };

  const handleDualScanSelectCategories = (categories: string[], isUnified: boolean) => {
    setDualScanState(prev => ({
      ...prev!,
      currentStep: 3,
      selectedCategories: categories,
      isUnified,
    }));
    
    // Save the category preference to session storage
    if (prev?.sessionId) {
      const sessionKey = `myMatchIQ_dualSession_${prev.sessionId}`;
      const sessionData = localStorage.getItem(sessionKey);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        
        if (isUnified) {
          // Store unified categories for both users
          session.unifiedCategories = categories;
          session.isUnified = true;
        } else {
          // Store individual categories per role
          session.isUnified = false;
          if (prev.role === 'A') {
            session.userACategories = categories;
          } else {
            session.userBCategories = categories;
          }
        }
        
        localStorage.setItem(sessionKey, JSON.stringify(session));
      }
    }
    
    setCurrentScreen('dualScanFlow');
  };

  const handleCompleteDualScan = (score: number, answers: DualScanAnswer[]) => {
    setDualScanState(prev => ({
      ...prev!,
      currentStep: 4,
      score,
      answers,
    }));
    
    // Save to localStorage
    if (prev?.sessionId && prev.role) {
      const storageKey = `myMatchIQ_dualScan_${prev.sessionId}_${prev.role}`;
      localStorage.setItem(storageKey, JSON.stringify({ score, answers, completedAt: new Date().toISOString() }));
      
      // Update session completion status
      const sessionKey = `myMatchIQ_dualSession_${prev.sessionId}`;
      const sessionData = localStorage.getItem(sessionKey);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (prev.role === 'A') {
          session.userACompleted = true;
        } else {
          session.userBCompleted = true;
        }
        localStorage.setItem(sessionKey, JSON.stringify(session));
      }
    }
    
    setCurrentScreen('dualScanResults');
  };

  // Self-assessment handlers
  const generateBlueprintQRCode = (userId: string, answers: BlueprintAnswer[]): string => {
    const data = {
      userId,
      blueprintId: Date.now().toString(),
      timestamp: new Date().toISOString(),
      answerCount: answers.length
    };
    // Generate a unique QR code identifier
    return `MMQ-${btoa(JSON.stringify(data)).substring(0, 12)}`;
  };

  const handleCompleteSelfAssessment = (answers: BlueprintAnswer[]) => {
    if (!userProfile) return;
    
    // Generate QR code
    const qrCode = generateBlueprintQRCode(userProfile.name, answers);
    
    // Generate blueprint ID if doesn't exist
    const newBlueprintId = blueprintId || Date.now().toString();
    setBlueprintId(newBlueprintId);
    
    // Update user profile with completed assessment
    const updatedProfile: UserProfile = {
      ...userProfile,
      selfAssessmentComplete: true,
      selfAssessmentProgress: 100,
      selfAssessmentAnswers: answers,
      blueprintQRCode: qrCode
    };
    
    setUserProfile(updatedProfile);
    setBlueprintAnswers(answers);
    
    // Go to generation screen
    setCurrentScreen('blueprintGeneration');
  };

  const handleSaveSelfAssessmentProgress = (answers: BlueprintAnswer[], progress: number) => {
    if (!userProfile) return;
    
    const updatedProfile: UserProfile = {
      ...userProfile,
      selfAssessmentComplete: false,
      selfAssessmentProgress: progress,
      selfAssessmentAnswers: answers,
      lastAssessmentReminder: new Date().toISOString()
    };
    
    setUserProfile(updatedProfile);
    setBlueprintAnswers(answers);
    
    // Navigation is handled by the component calling onBack()
    // This just saves the progress to the profile
  };

  const checkSelfAssessmentBeforeScan = (): boolean => {
    if (!userProfile?.selfAssessmentComplete) {
      setShowAssessmentBlockedModal(true);
      return false;
    }
    return true;
  };

  // Show reminder banner if assessment is incomplete
  useEffect(() => {
    if (!userProfile) return;
    
    const isIncomplete = !userProfile.selfAssessmentComplete;
    
    // Show banner if incomplete and on dashboard
    if (isIncomplete && currentScreen === 'dashboard') {
      // Check if we should show reminder (not shown in last 24 hours)
      const lastReminder = userProfile.lastAssessmentReminder;
      const shouldShow = !lastReminder || 
        (Date.now() - new Date(lastReminder).getTime() > 24 * 60 * 60 * 1000);
      
      setShowReminderBanner(shouldShow);
    } else {
      setShowReminderBanner(false);
    }
  }, [userProfile, currentScreen]);

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loadingApp')}</p>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return <DashboardScreen onStartScan={handleStartScan} onNavigate={handleNavigate} scans={scans} />;
      case 'scanTypeSelection':
        return (
          <ScanTypeSelectionScreen 
            onBack={() => setCurrentScreen('dashboard')}
            onSelectSingleScan={() => setCurrentScreen('matchScan')}
            onSelectDualScan={() => setCurrentScreen('dualScan')}
          />
        );
      case 'matchScan':
        return (
          <MatchScanFlowScreen 
            onComplete={handleCompleteScan} 
            onBack={() => setCurrentScreen(continuingScanId ? 'results' : 'dashboard')}
            existingScan={continuingScanId ? currentScan : undefined}
          />
        );
      case 'results':
        return (
          <ResultsScreen 
            scan={currentScan!} 
            onBack={() => setCurrentScreen('dashboard')} 
            onContinueAssessment={handleContinueAssessment}
            onUpdateScan={handleUpdateScan}
          />
        );
      case 'history':
        return <HistoryScreen scans={scans} onBack={() => setCurrentScreen('dashboard')} onViewScan={(scan) => { setCurrentScan(scan); setCurrentScreen('results'); }} onDeleteScan={handleDeleteScan} onCompareScans={handleCompareScans} onNavigateHome={() => setCurrentScreen('welcome')} />; 
      case 'aiCoach':
        return <AICoachScreen onBack={() => setCurrentScreen('dashboard')} onNavigateHome={() => setCurrentScreen('welcome')} />; 
      case 'styleGuide':
        return <StyleGuideScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'profile':
        return (
          <ProfileScreen 
            profile={userProfile} 
            subscriptionTier={subscriptionTier}
            onBack={() => setCurrentScreen('dashboard')} 
            onSave={setUserProfile}
            onManageSubscription={() => setCurrentScreen('subscription')}
            onResetAllData={handleResetAllData}
          />
        );
      case 'subscription':
        return <SubscriptionScreen currentTier={subscriptionTier} onBack={() => setCurrentScreen('dashboard')} onSelectTier={setSubscriptionTier} />;
      case 'compare':
        return compareScans ? <CompareScreen scan1={compareScans[0]} scan2={compareScans[1]} onBack={() => setCurrentScreen('history')} /> : <HistoryScreen scans={scans} onBack={() => setCurrentScreen('dashboard')} onViewScan={(scan) => { setCurrentScan(scan); setCurrentScreen('results'); }} onDeleteScan={handleDeleteScan} onCompareScans={handleCompareScans} />;
      case 'dualScan':
        return (
          <DualScanScreen 
            onBack={() => setCurrentScreen('dashboard')} 
            onStartDualScan={handleStartDualScan}
            onStartDualScanFlow={handleStartDualScan}
            userName={userProfile?.name || 'User'}
          />
        );
      case 'dualScanInteraction':
        return dualScanState ? (
          <DualScanInteractionScreen 
            partnerName={dualScanState.partnerName}
            onBack={() => setCurrentScreen('dualScan')}
            onSelectInteraction={handleDualScanSelectInteraction}
          />
        ) : <DashboardScreen onStartScan={handleStartScan} onNavigate={handleNavigate} scans={scans} />;
      case 'dualScanCategories':
        return dualScanState ? (
          <DualScanCategoryScreen 
            partnerName={dualScanState.partnerName}
            onBack={() => setCurrentScreen('dualScanInteraction')}
            onContinue={handleDualScanSelectCategories}
          />
        ) : <DashboardScreen onStartScan={handleStartScan} onNavigate={handleNavigate} scans={scans} />;
      case 'dualScanFlow':
        return dualScanState && dualScanState.selectedCategories.length > 0 ? (
          <DualScanFlowScreen 
            sessionId={dualScanState.sessionId}
            role={dualScanState.role}
            partnerName={dualScanState.partnerName}
            userName={userProfile?.name || 'User'}
            selectedCategories={dualScanState.selectedCategories}
            interactionType={dualScanState.interactionType}
            onComplete={handleCompleteDualScan}
            onBack={() => setCurrentScreen('dualScanCategories')}
          />
        ) : <DashboardScreen onStartScan={handleStartScan} onNavigate={handleNavigate} scans={scans} />;
      case 'dualScanResults':
        return dualScanState ? (
          <DualScanResultsScreen 
            sessionId={dualScanState.sessionId}
            role={dualScanState.role}
            partnerName={dualScanState.partnerName}
            userName={userProfile?.name || 'User'}
            score={dualScanState.score}
            answers={dualScanState.answers}
            onBack={() => setCurrentScreen('dualScan')}
            onViewAllScans={() => setCurrentScreen('dualScan')}
          />
        ) : <DashboardScreen onStartScan={handleStartScan} onNavigate={handleNavigate} scans={scans} />;
      case 'privacy':
        return <LegalScreen type="privacy" onBack={() => setCurrentScreen('dashboard')} />;
      case 'terms':
        return <LegalScreen type="terms" onBack={() => setCurrentScreen('dashboard')} />;
      case 'contact':
        return <LegalScreen type="contact" onBack={() => setCurrentScreen('dashboard')} />;
      case 'blueprintHome':
        return (
          <BlueprintHomeScreen 
            onStartAssessment={() => setCurrentScreen('blueprintQuestionnaire')}
            onViewBlueprint={() => setCurrentScreen('blueprintSummary')}
            onShareBlueprint={() => setCurrentScreen('blueprintShare')}
            onBack={() => setCurrentScreen('dashboard')}
            hasBlueprint={blueprintAnswers !== null}
          />
        );
      case 'blueprintQuestionnaire':
        const isSelfAssessment = !userProfile?.selfAssessmentComplete;
        
        return (
          <BlueprintQuestionnaireScreen 
            onComplete={isSelfAssessment ? handleCompleteSelfAssessment : (answers) => {
              setBlueprintAnswers(answers);
              if (!blueprintId) {
                setBlueprintId(Date.now().toString());
              }
              setCurrentScreen('blueprintGeneration');
            }}
            onBack={() => setCurrentScreen(isSelfAssessment ? 'dashboard' : 'blueprintHome')}
            existingAnswers={userProfile?.selfAssessmentAnswers || blueprintAnswers || []}
            onSaveProgress={isSelfAssessment ? handleSaveSelfAssessmentProgress : undefined}
            isSelfAssessment={isSelfAssessment}
          />
        );
      case 'blueprintGeneration':
        return (
          <BlueprintGenerationScreen 
            onComplete={() => {
              // If this is the initial self-assessment, ensure it's marked complete
              if (userProfile && !userProfile.selfAssessmentComplete) {
                setUserProfile({
                  ...userProfile,
                  selfAssessmentComplete: true,
                  selfAssessmentProgress: 100
                });
              }
              setCurrentScreen('blueprintSummary');
            }}
          />
        );
      case 'blueprintSummary':
        return blueprintAnswers ? (
          <BlueprintSummaryScreen 
            answers={blueprintAnswers}
            onEdit={() => setCurrentScreen('blueprintQuestionnaire')}
            onShare={() => setCurrentScreen('blueprintShare')}
            onCompare={() => setCurrentScreen('blueprintComparison')}
            onBack={() => setCurrentScreen('blueprintHome')}
            userName={userProfile?.name}
          />
        ) : (
          <BlueprintHomeScreen 
            onStartAssessment={() => setCurrentScreen('blueprintQuestionnaire')}
            onViewBlueprint={() => setCurrentScreen('blueprintSummary')}
            onShareBlueprint={() => setCurrentScreen('blueprintShare')}
            onBack={() => setCurrentScreen('dashboard')}
            hasBlueprint={false}
          />
        );
      case 'blueprintShare':
        return (
          <BlueprintShareScreen 
            onBack={() => setCurrentScreen('blueprintSummary')}
            blueprintId={blueprintId || Date.now().toString()}
            userName={userProfile?.name || 'User'}
          />
        );
      case 'blueprintComparison':
        return blueprintAnswers ? (
          <BlueprintComparisonScreen 
            onBack={() => setCurrentScreen('blueprintSummary')}
            onRunFullScan={() => setCurrentScreen('matchScan')}
            userAName={userProfile?.name || 'You'}
            userBName="Potential Match"
            compatibilityData={{
              overallScore: 75,
              mindsetAlignment: 82,
              lifestyleFit: 68,
              relationshipExpectations: 85,
              personalityMatch: 70,
              dealBreakerClashScore: 15,
              redFlags: [
                { severity: 'medium', description: 'Different views on work-life balance' }
              ],
              alignedValues: ['Honesty', 'Family', 'Ambition'],
              conflictAreas: ['Physical fitness priority', 'Social habits']
            }}
          />
        ) : (
          <BlueprintHomeScreen 
            onStartAssessment={() => setCurrentScreen('blueprintQuestionnaire')}
            onViewBlueprint={() => setCurrentScreen('blueprintSummary')}
            onShareBlueprint={() => setCurrentScreen('blueprintShare')}
            onBack={() => setCurrentScreen('dashboard')}
            hasBlueprint={false}
          />
        );
      case 'incomingBlueprint':
        return (
          <IncomingBlueprintScreen 
            senderName="Alex"
            blueprintId={blueprintId || 'demo123'}
            onViewBlueprint={() => setCurrentScreen('blueprintSummary')}
            onCreateOwn={() => setCurrentScreen('blueprintQuestionnaire')}
            onContinueAsGuest={() => setCurrentScreen('blueprintSummary')}
          />
        );
      case 'preCompatibilitySnapshot':
        return (
          <PreCompatibilitySnapshotScreen 
            onBack={() => setCurrentScreen('blueprintSummary')}
            onRunFullScan={() => setCurrentScreen('matchScan')}
            onSaveComparison={() => setCurrentScreen('blueprintComparison')}
            userAName={userProfile?.name || 'You'}
            userBName="Potential Match"
            compatibilityData={{
              overallScore: 75,
              mindsetAlignment: 82,
              lifestyleFit: 68,
              relationshipExpectations: 85,
              personalityMatch: 70,
              dealBreakerClashScore: 15,
              redFlags: [
                { severity: 'medium', description: 'Different views on work-life balance' }
              ],
              alignedValues: ['Honesty', 'Family', 'Ambition'],
              conflictAreas: ['Physical fitness priority', 'Social habits']
            }}
          />
        );
      case 'languageSelection':
        return <LanguageSelectionScreen onBack={() => setCurrentScreen('profile')} />;
      default:
        return <WelcomeScreen onStart={() => setCurrentScreen('onboarding')} />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <FloatingHearts />
      
      {/* Self-Assessment Reminder Banner */}
      {showReminderBanner && userProfile && (
        <SelfAssessmentReminderBanner
          progress={userProfile.selfAssessmentProgress || 0}
          onComplete={() => {
            setShowReminderBanner(false);
            setCurrentScreen('blueprintQuestionnaire');
          }}
          onDismiss={() => {
            setShowReminderBanner(false);
            // Update last reminder time
            setUserProfile({
              ...userProfile,
              lastAssessmentReminder: new Date().toISOString()
            });
          }}
        />
      )}
      
      {/* Assessment Blocked Modal */}
      {showAssessmentBlockedModal && userProfile && (
        <AssessmentBlockedModal
          progress={userProfile.selfAssessmentProgress || 0}
          onComplete={() => {
            setShowAssessmentBlockedModal(false);
            setCurrentScreen('blueprintQuestionnaire');
          }}
          onCancel={() => {
            setShowAssessmentBlockedModal(false);
          }}
        />
      )}
      
      {renderScreen()}
    </div>
  );
}