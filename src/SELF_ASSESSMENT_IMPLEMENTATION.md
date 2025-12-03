# Self-Assessment Integration - Implementation Guide

## Completed Changes

### 1. Updated Data Models
- ✅ Extended `UserProfile` interface in `/App.tsx` with self-assessment fields:
  - `selfAssessmentComplete?: boolean`
  - `selfAssessmentProgress?: number`
  - `selfAssessmentAnswers?: BlueprintAnswer[]`
  - `blueprintQRCode?: string`
  - `lastAssessmentReminder?: string`

### 2. New Components Created
- ✅ `/components/SelfAssessmentReminderBanner.tsx` - Banner reminder for incomplete assessments
- ✅ `/components/AssessmentBlockedModal.tsx` - Modal that blocks scanning until assessment is complete

### 3. Updated Components
- ✅ `BlueprintQuestionnaireScreen` - Added:
  - `onSaveProgress` prop for incremental saving
  - `isSelfAssessment` flag to show "Save & Continue Later" button
  - Auto-save progress on each answer
- ✅ `ChipSelector` - Enhanced with:
  - `maxSelect` prop to limit selections
  - Visual counter showing "X / Y selected"
  - Disabled state for options when limit reached
  - Updated ideal weekend question to require top 3 selections

## Remaining Implementation Tasks

### 1. Add Self-Assessment Handlers in App.tsx

```typescript
// Add these handler functions after existing handlers:

// Generate unique QR code for user's blueprint
const generateBlueprintQRCode = (userId: string, answers: BlueprintAnswer[]): string => {
  const data = {
    userId,
    blueprintId: Date.now().toString(),
    timestamp: new Date().toISOString(),
    answerCount: answers.length
  };
  // In production, this would generate a real QR code
  // For now, return a unique identifier
  return `MMQ-${btoa(JSON.stringify(data)).substring(0, 12)}`;
};

// Handle self-assessment completion
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

// Handle saving progress (when user clicks "Save & Continue Later")
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
  
  // Return to dashboard
  setCurrentScreen('dashboard');
};

// Check if self-assessment is required before allowing scans
const checkSelfAssessmentBeforeScan = (): boolean => {
  if (!userProfile?.selfAssessmentComplete) {
    setShowAssessmentBlockedModal(true);
    return false;
  }
  return true;
};
```

### 2. Update Scan Initialization Logic

Update `handleStartScan` to check for completed self-assessment:

```typescript
const handleStartScan = () => {
  // Check if self-assessment is complete
  if (!checkSelfAssessmentBeforeScan()) {
    return; // Block scan
  }
  
  setContinuingScanId(null);
  setCurrentScreen('matchScan');
};
```

### 3. Add Reminder Banner Logic

Add useEffect to show reminder banner:

```typescript
// Show reminder banner if assessment is incomplete
useEffect(() => {
  if (!userProfile) return;
  
  const isIncomplete = !userProfile.selfAssessmentComplete;
  const hasProgress = (userProfile.selfAssessmentProgress || 0) > 0;
  
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
```

### 4. Render Conditional UI Elements

Add to the return statement in `AppContent`:

```typescript
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
```

### 5. Update Blueprint Questionnaire Screen Case

Update the blueprint questionnaire case to support self-assessment mode:

```typescript
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
```

### 6. Update Profile Screen

Update ProfileScreen to display self-assessment status and QR code:

- Add section showing self-assessment completion status
- Display QR code if assessment is complete
- Add button to view/edit blueprint
- Show progress bar if assessment is incomplete

### 7. Add Self-Assessment Step to Onboarding

Option A: Add as final onboarding step
Option B: Show prompt after onboarding with "Start Now" or "Skip for Now" options

### 8. Update Blueprint Generation Screen

When self-assessment completes, update the BlueprintGenerationScreen handler:

```typescript
case 'blueprintGeneration':
  return (
    <BlueprintGenerationScreen 
      onComplete={() => {
        // If this is the initial self-assessment, mark it as complete
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
```

## Testing Checklist

- [ ] New user completes onboarding → prompted for self-assessment
- [ ] User starts assessment → progress saves automatically
- [ ] User clicks "Save & Continue Later" → returns to dashboard with progress saved
- [ ] User tries to scan without completing → blocked with modal
- [ ] User completes assessment → QR code generated and saved
- [ ] Reminder banner shows after 24 hours if incomplete
- [ ] User can dismiss reminder → doesn't show again for 24 hours
- [ ] Completed assessment shows in Profile with QR code
- [ ] User can edit completed assessment without losing QR code
- [ ] "Ideal weekend" question requires exactly 3 selections
- [ ] Progress bar updates correctly
- [ ] All data persists in localStorage

## Future Enhancements

1. Push notifications for assessment reminders (requires service worker)
2. Email reminders for web users
3. Analytics tracking for assessment completion rates
4. A/B testing different reminder frequencies
5. Gamification rewards for completing assessment
6. Share assessment results to social media
7. Download QR code as PNG/PDF
8. Print-friendly QR code view
