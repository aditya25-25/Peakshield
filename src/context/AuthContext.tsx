import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  agency: string;
  badgeNumber?: string;
  regionAssigned: string;
}

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isCommander: boolean;
  switchRole: (newRole: UserRole) => void;
  updateRegion: (region: string) => void;
}

const DEFAULT_TREKKER: UserProfile = {
  id: 'usr-cit-01',
  name: 'Trekker Aditya',
  role: 'TREKKER',
  agency: 'Himalayan Explorer Guild',
  regionAssigned: 'Garhwal Himalayas (Kedarnath Valley)',
};

const DEFAULT_COMMANDER: UserProfile = {
  id: 'usr-cmd-01',
  name: 'Commander R. S. Negi',
  role: 'INCIDENT_COMMANDER',
  agency: 'NDRF 8th Battalion & State EOC',
  badgeNumber: 'NDRF-SAR-4091',
  regionAssigned: 'Western Himalayan Emergency Command',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('peakshield_active_role') as UserRole;
    return saved || 'TREKKER';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    return role === 'TREKKER' ? DEFAULT_TREKKER : DEFAULT_COMMANDER;
  });

  useEffect(() => {
    if (role === 'TREKKER') {
      setUser(DEFAULT_TREKKER);
    } else {
      setUser({
        ...DEFAULT_COMMANDER,
        role: role,
      });
    }
    localStorage.setItem('peakshield_active_role', role);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const updateRegion = (region: string) => {
    setUser(prev => ({ ...prev, regionAssigned: region }));
  };

  const isCommander = role === 'INCIDENT_COMMANDER' || role === 'NDRF_OFFICER' || role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, role, isCommander, switchRole, updateRegion }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
