import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Radio, 
  Bell, 
  MapPin, 
  UserCheck, 
  Activity, 
  Wifi, 
  WifiOff, 
  Layers, 
  AlertTriangle,
  Flame,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEmergency } from '../../context/EmergencyContext';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const { user, isCommander, switchRole } = useAuth();
  const { 
    alerts, 
    unreadAlertsCount, 
    markAlertsAsRead, 
    openAmISafeModal, 
    openReportModal,
    isOnline
  } = useEmergency();
  
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-alpine-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-shield-blue to-sky-700 shadow-glow-cyan text-white">
              <ShieldAlert className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                  PeakShield
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/80 font-semibold tracking-wider">
                  v3.4 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Mountain Emergency Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (For Citizen Mode) */}
          {!isCommander && (
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Safety Home' },
                { id: 'map', label: 'Risk Map' },
                { id: 'routes', label: 'Route Safety' },
                { id: 'ai', label: 'Ask the Mountain' },
                { id: 'alerts', label: 'Alerts & Intel' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    currentTab === tab.id
                      ? 'bg-shield-blue/20 text-sky-300 border border-shield-blue/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          {/* Rescue Operations Header Badge (For Command Mode) */}
          {isCommander && (
            <div className="hidden md:flex items-center gap-2 bg-red-950/40 border border-red-800/50 px-3 py-1.5 rounded-lg">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[11px] font-mono font-bold text-red-300 uppercase tracking-wider">
                  Rescue Command Operations (EOC)
                </div>
                <div className="text-[10px] text-slate-400">
                  Sector: Garhwal & Chamoli Grid
                </div>
              </div>
            </div>
          )}

          {/* Action Tools & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Rapid Citizen Actions */}
            {!isCommander && (
              <>
                <button
                  onClick={openAmISafeModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold transition shadow-sm"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Am I Safe?</span>
                </button>
                <button
                  onClick={openReportModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-glow-red"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Report Incident</span>
                </button>
              </>
            )}

            {/* Alerts Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAlertDropdown(!showAlertDropdown);
                  if (!showAlertDropdown) markAlertsAsRead();
                }}
                className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                title="Active Warnings & Broadcasts"
              >
                <Bell className="w-4 h-4" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-glow-red">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              {showAlertDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-alpine-900 border border-slate-700 shadow-2xl z-50 p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Active Broadcast Alerts ({alerts.length})
                    </span>
                    <button 
                      onClick={() => {
                        setShowAlertDropdown(false);
                        onTabChange('alerts');
                      }}
                      className="text-[11px] text-sky-400 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {alerts.map(alert => (
                      <div
                        key={alert.id}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                          alert.level === 'EMERGENCY'
                            ? 'bg-red-950/40 border-red-800/60 text-red-200 hover:bg-red-950/60'
                            : alert.level === 'WARNING'
                            ? 'bg-orange-950/40 border-orange-800/60 text-orange-200 hover:bg-orange-950/60'
                            : 'bg-amber-950/30 border-amber-800/40 text-amber-200 hover:bg-amber-950/50'
                        }`}
                        onClick={() => {
                          setShowAlertDropdown(false);
                          onTabChange('alerts');
                        }}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="truncate">{alert.title}</span>
                          <span className="text-[10px] opacity-75 font-mono ml-2 shrink-0">{alert.issuedAt}</span>
                        </div>
                        <p className="text-[11px] opacity-90 line-clamp-2 leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                  isCommander
                    ? 'bg-red-950/60 border-red-800/80 text-red-200 shadow-glow-red'
                    : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline font-mono">
                  {isCommander ? 'Incident Commander' : 'Citizen / Trekker'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-alpine-900 border border-slate-700 shadow-2xl z-50 p-2 text-xs">
                  <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                    Select Interface Mode
                  </div>

                  <button
                    onClick={() => {
                      switchRole('TREKKER');
                      setShowRoleMenu(false);
                      onTabChange('home');
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between mb-1 ${
                      !isCommander ? 'bg-sky-500/20 text-sky-300 font-bold' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Citizen / Trekker View</div>
                      <div className="text-[10px] text-slate-400">Mobile-first safety, reporting & AI</div>
                    </div>
                    {!isCommander && <span className="w-2 h-2 rounded-full bg-sky-400"></span>}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('INCIDENT_COMMANDER');
                      setShowRoleMenu(false);
                      onTabChange('rescue-dashboard');
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between ${
                      isCommander ? 'bg-red-500/20 text-red-300 font-bold' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">Rescue Command Center</div>
                      <div className="text-[10px] text-slate-400">EOC operations, SAR dispatch & SITREP</div>
                    </div>
                    {isCommander && <span className="w-2 h-2 rounded-full bg-red-400"></span>}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
