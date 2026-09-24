import React from 'react';
import { Home, Map, Route, MessageSquareWarning, Flame } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const { openReportModal } = useEmergency();

  const navItems = [
    { id: 'home', label: 'Safety', icon: Home },
    { id: 'map', label: 'Risk Map', icon: Map },
    { id: 'report', label: 'REPORT', icon: Flame, isEmergency: true },
    { id: 'routes', label: 'Routes', icon: Route },
    { id: 'ai', label: 'Ask AI', icon: MessageSquareWarning },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-alpine-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 pb-safe">
      <nav aria-label="Mobile Navigation" className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.isEmergency) {
            return (
              <button
                key={item.id}
                onClick={openReportModal}
                className="flex flex-col items-center justify-center -mt-5"
                title="Report Mountain Emergency"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white shadow-glow-red border-2 border-alpine-950 active:scale-95 transition">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-black tracking-wider text-red-400 mt-1 uppercase">
                  Report
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition ${
                isActive
                  ? 'text-sky-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-sky-400' : ''}`} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-sky-400 font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
