import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  role: UserRole;
  isCommander: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup' | 'forgot' | 'profile' | 'mode';
  setRole: (role: UserRole) => void;
  login: (email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, phone?: string, emergencyContact?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  continueAsGuest: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  openAuthModal: (tab?: 'login' | 'signup' | 'forgot' | 'profile' | 'mode') => void;
  closeAuthModal: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Trekker Aditya',
  email: 'aditya.trekker@peakshield.org',
  phone: '+91-98712-34567',
  emergencyContact: '+91-94120-88990 (Spouse / Family)',
  role: 'citizen',
  currentSector: 'Kedarnath Valley Sector 3 (3,583m)',
  medicalNotes: 'Asthmatic inhaler carried • Blood Group O+',
  isGuest: false,
  authToken: 'ps-tok-demo-101',
};

const GUEST_USER: UserProfile = {
  id: 'guest-anon',
  name: 'Guest Traveler',
  email: '',
  phone: 'Not provided',
  emergencyContact: 'Not configured',
  role: 'citizen',
  currentSector: 'Garhwal Alpine Region',
  medicalNotes: 'None listed',
  isGuest: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('peakshield_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup' | 'forgot' | 'profile' | 'mode'>('login');

  const role = user?.role || 'citizen';
  const isCommander = role === 'commander';
  const isGuest = user?.isGuest ?? false;
  const isAuthenticated = !!user && !user.isGuest;

  useEffect(() => {
    if (user) {
      localStorage.setItem('peakshield_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('peakshield_user');
    }
  }, [user]);

  const setRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const login = async (email: string, password: string, userRole: UserRole = 'citizen'): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 350));

    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const userName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Trekker User';
    const capitalized = userName.charAt(0).toUpperCase() + userName.slice(1);

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: capitalized,
      email: email.trim().toLowerCase(),
      phone: '+91-98712-34567',
      emergencyContact: '+91-94120-88990',
      role: userRole,
      currentSector: 'Kedarnath Valley Sector 3 (3,583m)',
      medicalNotes: 'Blood Group O+ • No known drug allergies',
      isGuest: false,
      authToken: 'ps-tok-' + Math.random().toString(36).substring(2, 9),
    };

    setUser(newUser);
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    phone: string = '+91-98712-34567',
    emergencyContact: string = '+91-94120-88990'
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((res) => setTimeout(res, 400));

    if (!name.trim()) {
      return { success: false, error: 'Full Name is required.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please provide a valid email address.' };
    }
    if (!password || password.length < 8) {
      return { success: false, error: 'Password must contain at least 8 characters.' };
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || '+91-98712-34567',
      emergencyContact: emergencyContact.trim() || '+91-94120-88990',
      role: 'citizen',
      currentSector: 'Kedarnath Valley Sector 3 (3,583m)',
      medicalNotes: 'Standard Emergency Safety Profile',
      isGuest: false,
      authToken: 'ps-tok-' + Math.random().toString(36).substring(2, 9),
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('peakshield_user');
    setUser(GUEST_USER);
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((res) => setTimeout(res, 350));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid registered email address.' };
    }
    return {
      success: true,
      message: 'Password Reset Session Initialized: Token [PS-RESET-DEMO-2026] has been created for ' + email + '. You can now update your password directly.',
    };
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((res) => setTimeout(res, 350));
    if (!token.trim()) {
      return { success: false, message: 'Invalid or expired reset token.' };
    }
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'New password must contain at least 8 characters.' };
    }
    return {
      success: true,
      message: 'Password successfully updated. You can now log in with your updated credentials.',
    };
  };

  const continueAsGuest = () => {
    setUser(GUEST_USER);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const openAuthModal = (tab: 'login' | 'signup' | 'forgot' | 'profile' | 'mode' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        role,
        isCommander,
        isAuthModalOpen,
        authModalTab,
        setRole,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        continueAsGuest,
        updateProfile,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
