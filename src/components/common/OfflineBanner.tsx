import React from 'react';
import { WifiOff, BookOpen, RefreshCw } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, lastSyncTime, openOfflineGuide, refreshData } = useEmergency();

  if (isOnline) return null;

  return (
    <aside aria-label="Offline Mode Notification" className="bg-amber-950/90 border-b border-amber-600/40 text-amber-200 px-4 py-2.5 text-xs sm:text-sm backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-amber-500/20 rounded text-amber-400">
            <WifiOff className="w-4 h-4" />
          </span>
          <div>
            <span className="font-semibold text-white tracking-wide">OFFLINE MODE ACTIVE</span>
            <span className="text-amber-300/80 mx-2 hidden sm:inline">•</span>
            <span className="text-amber-300/80 text-xs">Displaying cached intelligence. Last sync: {lastSyncTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openOfflineGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 font-medium transition border border-amber-500/30 text-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Emergency Protocols</span>
          </button>
          <button
            onClick={() => refreshData()}
            className="p-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 transition"
            title="Retry connection"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
