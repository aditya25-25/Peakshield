import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Radio, 
  User, 
  Bell, 
  Map, 
  Compass, 
  Navigation,
  ChevronDown,
  LogIn,
  LogOut,
  AlertTriangle,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from './RiskBadge';
import { Logo } from './Logo';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const { user, isCommander, isAuthenticated, logout, openAuthModal } = useAuth();
  const { 
    alerts, 
    openSosModal, 
    openReportModal, 
    activeZone 
  } = useEmergency();

  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const citizenNavItems = [
    { id: 'home', label: 'Safety Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'map', label: 'Risk Map', icon: <Map className="w-4 h-4" /> },
    { id: 'routes', label: 'Route Safety', icon: <Navigation className="w-4 h-4" /> },
    { id: 'ai', label: 'Ask AI', icon: <Radio className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange(isCommander ? 'rescue-dashboard' : 'home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="PeakShield Mountain Safety"
          >
            <Logo variant="primary" size="md" />
            {isCommander && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 uppercase font-bold tracking-wider">
                EOC Ops
              </span>
            )}
          </button>

          {/* Quick Active Risk Tag */}
          {activeZone && !isCommander && (
            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-800">
              <RiskBadge level={activeZone.level} showScore={activeZone.score} size="sm" />
            </div>
          )}
        </div>

        {/* Desktop Navigation Links (Citizen Mode) */}
        {!isCommander && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {citizenNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Action Controls & Emergency Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Active Alerts Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label={`Broadcast Alerts (${alerts.length} active)`}
            >
              <Bell className="w-4 h-4" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Alerts Dropdown Panel */}
            {showAlertsDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-alpine-900 border border-slate-700 shadow-2xl z-50 p-4 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-xs text-white">Active Emergency Broadcasts</span>
                  </div>
                  <button
                    onClick={() => setShowAlertsDropdown(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-white text-[11px]">{alert.title}</span>
                        <RiskBadge level={alert.severity} size="sm" />
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug">{alert.description}</p>
                      <div className="text-[10px] font-mono text-sky-400 pt-1">
                        Sector: {alert.sector} • {alert.issuedAt}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowAlertsDropdown(false);
                    onTabChange('alerts');
                  }}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition"
                >
                  View All Alerts Stream
                </button>
              </div>
            )}
          </div>

          {/* Report Hazard Button (Visible on Desktop) */}
          {!isCommander && (
            <button
              onClick={openReportModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600/20 hover:bg-orange-600/30 text-orange-200 border border-orange-500/40 text-xs font-semibold transition active:scale-95"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Report Hazard</span>
            </button>
          )}

          {/* Urgent Emergency SOS Button (Always Prominent) */}
          <button
            onClick={openSosModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition active:scale-95 animate-pulse"
            aria-label="Emergency SOS - Open Direct Help"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS</span>
          </button>

          {/* User Profile / Auth State */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition"
                aria-label="User Account Menu"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs uppercase">
                  {user?.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="hidden md:inline max-w-[90px] truncate">{user?.name || 'Profile'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <div className="font-bold text-white truncate">{user?.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{user?.email || '+91-98712-34567'}</div>
                  </div>

                  <button
                    onClick={() => { onTabChange('profile'); setIsUserMenuOpen(false); }}
                    className="w-full px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 transition"
                  >
                    <User className="w-4 h-4 text-blue-400" />
                    <span>Profile & Medical ID</span>
                  </button>

                  {isCommander && (
                    <button
                      onClick={() => { onTabChange('rescue-dashboard'); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-amber-300 hover:bg-slate-800 flex items-center gap-2.5 transition font-semibold"
                    >
                      <Radio className="w-4 h-4 text-amber-400" />
                      <span>Rescue Command Center</span>
                    </button>
                  )}

                  <div className="border-t border-slate-800 my-1" />

                  <button
                    onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2.5 transition font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-400" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-sm shadow-blue-600/20"
              >
                Sign Up
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};