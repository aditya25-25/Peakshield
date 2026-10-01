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
  ArrowLeft,
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
  const { user, setRole } = useAuth();
  const { incidents, missingPersons } = useEmergency();

  const navItems = [
    { id: 'rescue-dashboard', label: 'EOC Dashboard', icon: LayoutDashboard },
    { id: 'rescue-map', label: 'Tactical Risk Map', icon: Map },
    { id: 'rescue-incidents', label: 'Incident Management', icon: Flame, badge: incidents.filter(i => i.status !== 'RESOLVED').length },
    { id: 'rescue-missing', label: 'Missing Persons (SAR)', icon: UserX, badge: missingPersons.length },
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
          {navItems.map((item) => {
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
        <div className="p-4 border-t border-slate-800 space-y-3 bg-alpine-950/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">{user?.name || 'Commander Verma'}</div>
              <div className="text-[10px] font-mono text-slate-400">SDRF Field Controller</div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <button
            onClick={() => setRole('citizen')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Citizen View</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Mobile Horizontal Sub-Navigation for Commander */}
        <div className="lg:hidden flex items-center gap-1.5 p-2 bg-alpine-900 border-b border-slate-800 overflow-x-auto shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-6 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </div>

    </div>
  );
};
