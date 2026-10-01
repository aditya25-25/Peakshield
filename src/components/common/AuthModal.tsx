import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoginPage } from '../auth/LoginPage';
import { SignUpPage } from '../auth/SignUpPage';
import { ForgotPasswordPage } from '../auth/ForgotPasswordPage';
import { ProfilePage } from '../auth/ProfilePage';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  const handleNavigate = (tab: string) => {
    if (tab === 'login') openAuthModal('login');
    else if (tab === 'signup') openAuthModal('signup');
    else if (tab === 'forgot-password' || tab === 'forgot') openAuthModal('forgot');
    else if (tab === 'profile') openAuthModal('profile');
    else closeAuthModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal View Switcher */}
        <div className="p-2 sm:p-4">
          {authModalTab === 'login' && (
            <LoginPage 
              onNavigate={handleNavigate}
            />
          )}

          {authModalTab === 'signup' && (
            <SignUpPage 
              onNavigate={handleNavigate}
            />
          )}

          {authModalTab === 'forgot' && (
            <ForgotPasswordPage 
              onNavigate={handleNavigate}
            />
          )}

          {(authModalTab === 'profile' || authModalTab === 'mode') && (
            <ProfilePage 
              onNavigate={handleNavigate}
            />
          )}
        </div>

      </div>
    </div>
  );
};
