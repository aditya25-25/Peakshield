import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmergencyProvider } from './context/EmergencyContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { OfflineBanner } from './components/common/OfflineBanner';
import { SosModal } from './components/common/SosModal';
import { AuthModal } from './components/common/AuthModal';
import { AmISafeModal } from './components/citizen/AmISafeModal';
import { EmergencyReportModal } from './components/citizen/EmergencyReportModal';
import { OfflineGuideModal } from './components/citizen/OfflineGuideModal';

// Citizen Views
import { LandingPage } from './components/citizen/LandingPage';
import { SafetyDashboard } from './components/citizen/SafetyDashboard';
import { CitizenMap } from './components/citizen/CitizenMap';
import { RouteSafety } from './components/citizen/RouteSafety';
import { AskTheMountainAI } from './components/citizen/AskTheMountainAI';
import { AlertsFeed } from './components/citizen/AlertsFeed';

// Auth Views
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { ProfilePage } from './components/auth/ProfilePage';

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

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['landing', 'home', 'map', 'routes', 'ai', 'alerts', 'profile', 'login', 'signup', 'forgot-password', 'reset-password'].includes(hash)) {
        setCurrentTab(hash);
      } else if (hash.startsWith('rescue-')) {
        setCurrentTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHash);
    if (window.location.hash) {
      handleHash();
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (isCommander && !currentTab.startsWith('rescue-')) {
      setCurrentTab('rescue-dashboard');
    } else if (!isCommander && currentTab.startsWith('rescue-')) {
      setCurrentTab('home');
    }
  }, [isCommander, currentTab]);

  // Auth Standalone Pages
  if (currentTab === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <LoginPage onNavigate={setCurrentTab} />
          </div>
        </main>
        <AuthModal />
      </div>
    );
  }

  if (currentTab === 'signup') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <SignUpPage onNavigate={setCurrentTab} />
          </div>
        </main>
        <AuthModal />
      </div>
    );
  }

  if (currentTab === 'forgot-password') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <ForgotPasswordPage onNavigate={setCurrentTab} />
          </div>
        </main>
        <AuthModal />
      </div>
    );
  }

  if (currentTab === 'reset-password') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <ResetPasswordPage onNavigate={setCurrentTab} />
          </div>
        </main>
        <AuthModal />
      </div>
    );
  }

  if (currentTab === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
        <LandingPage onNavigate={setCurrentTab} />
        <AuthModal />
        <SosModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Offline Status Notice */}
      <OfflineBanner />

      {/* Main Navigation Header */}
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
          {currentTab === 'profile' && <ProfilePage onNavigate={setCurrentTab} />}
        </main>
      )}

      {/* Mobile Bottom Navigation (Only in Citizen Mode) */}
      {!isCommander && currentTab !== 'landing' && <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />}

      {/* Global Interactive Emergency Modals */}
      <SosModal />
      <AuthModal />
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
