import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Flame, 
  UserX, 
  Sparkles, 
  BarChart3, 
  FileText, 
  Radio, 
  ShieldAlert, 
  Bell, 
  CheckCircle2, 
  ArrowLeft,
  Settings,
  AlertOctagon,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEmergency } from '../../context/EmergencyContext';

interface CommandLayoutProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

export const CommandLayout: React.FC<CommandLayoutProps> = ({
  currentTab,
  onTabChange,
  children
}) => {
  const { user, switchRole } = useAuth();
  const { incidents, alerts, highestRiskLevel } = useEmergency();

  const navItems = [
    { id: 'rescue-dashboard', label: 'EOC Dashboard', icon: LayoutDashboard },
    { id: 'rescue-map', label: 'Tactical Risk Map', icon: Map },
    { id: 'rescue-incidents', label: 'Incident Management', icon: Flame, badge: incidents.filter(i => i.status !== 'RESOLVED').length },
    { id: 'rescue-missing', label: 'Missing Persons (SAR)', icon: UserX, badge: 2 },
    { id: 'rescue-copilot', label: 'AI Emergency Copilot', icon: Sparkles },
    { id: 'rescue-analytics', label: 'Analytics & Trends', icon: BarChart3 },
    { id: 'rescue-brief', label: 'Emergency Brief (SITREP)', icon: FileText },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-alpine-950 text-slate-100">
      
      {/* Left Tactical Navigation Sidebar */}
      <aside aria-label="Rescue Command Navigation" className="w-64 bg-alpine-900 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden lg:flex">
        
        {/* Top Header inside Sidebar */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                EOC COMMAND POST
              </div>
              <div className="text-xs font-bold text-white truncate">
                Garhwal Tactical Grid
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-red-500/15 text-red-300 border border-red-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Switch to Citizen view */}
        <div className="p-3 border-t border-slate-800 bg-alpine-950 space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-400 uppercase">OFFICER ON DUTY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="font-bold text-white mt-1">{user.name}</div>
            <div className="text-[11px] text-slate-400">{user.agency}</div>
          </div>

          <button
            onClick={() => {
              switchRole('TREKKER');
              onTabChange('home');
            }}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Citizen View</span>
          </button>
        </div>

      </aside>

      {/* Main Operational Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-alpine-950">
        
        {/* Mobile/Tablet Horizontal Sub-Nav */}
        <div className="lg:hidden flex items-center gap-2 p-2.5 bg-alpine-900 border-b border-slate-800 overflow-x-auto text-xs shrink-0">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  isActive
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </main>

    </div>
  );
};
