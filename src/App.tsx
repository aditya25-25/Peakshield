import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OfflineBanner } from './components/common/OfflineBanner';
import { AmISafeModal } from './components/citizen/AmISafeModal';
import { EmergencyReportModal } from './components/citizen/EmergencyReportModal';
import { OfflineGuideModal } from './components/citizen/OfflineGuideModal';

// Citizen Views
import { SafetyDashboard } from './components/citizen/SafetyDashboard';
import { CitizenMap } from './components/citizen/CitizenMap';
import { RouteSafety } from './components/citizen/RouteSafety';
import { AskTheMountainAI } from './components/citizen/AskTheMountainAI';
import { AlertsFeed } from './components/citizen/AlertsFeed';

// Rescue Operations Views
import { CommandLayout } from './components/rescue/CommandLayout';
import { CommandDashboard } from './components/rescue/CommandDashboard';
import { IncidentManagement } from './components/rescue/IncidentManagement';
import { MissingPersonHub } from './components/rescue/MissingPersonHub';
import { AICopilotOps } from './components/rescue/AICopilotOps';
import { AnalyticsView } from './components/rescue/AnalyticsView';
import { EmergencyBriefGenerator } from './components/rescue/EmergencyBriefGenerator';

const PeakShieldMain: React.FC = () => {
  const { isCommander } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');

  // If user switches role to commander, navigate to rescue-dashboard if on a citizen tab
  React.useEffect(() => {
    if (isCommander && !currentTab.startsWith('rescue-')) {
      setCurrentTab('rescue-dashboard');
    } else if (!isCommander && currentTab.startsWith('rescue-')) {
      setCurrentTab('home');
    }
  }, [isCommander]);

  return (
    <div className="min-h-screen bg-alpine-950 text-slate-100 flex flex-col font-sans">
      
      {/* Offline Status Warning Bar */}
      <OfflineBanner />

      {/* Main Top Header */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main View Area */}
      {isCommander ? (
        <CommandLayout currentTab={currentTab} onTabChange={setCurrentTab}>
          {currentTab === 'rescue-dashboard' && <CommandDashboard onNavigate={setCurrentTab} />}
          {currentTab === 'rescue-map' && (
            <div className="h-[calc(100vh-10rem)]">
              <CitizenMap />
            </div>
          )}
          {currentTab === 'rescue-incidents' && <IncidentManagement />}
          {currentTab === 'rescue-missing' && <MissingPersonHub />}
          {currentTab === 'rescue-copilot' && <AICopilotOps />}
          {currentTab === 'rescue-analytics' && <AnalyticsView />}
          {currentTab === 'rescue-brief' && <EmergencyBriefGenerator />}
        </CommandLayout>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {currentTab === 'home' && <SafetyDashboard onNavigate={setCurrentTab} />}
          {currentTab === 'map' && <CitizenMap />}
          {currentTab === 'routes' && <RouteSafety />}
          {currentTab === 'ai' && <AskTheMountainAI />}
          {currentTab === 'alerts' && <AlertsFeed />}
        </main>
      )}

      {/* Mobile Bottom Navigation (Only for Citizen Mode) */}
      {!isCommander && <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />}

      {/* Global Interactive Emergency Modals */}
      <AmISafeModal />
      <EmergencyReportModal />
      <OfflineGuideModal />

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <EmergencyProvider>
        <PeakShieldMain />
      </EmergencyProvider>
    </AuthProvider>
  );
}

export default App;
