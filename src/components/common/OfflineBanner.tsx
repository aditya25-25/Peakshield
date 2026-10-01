import React from 'react';
import { WifiOff, Clock, BookOpen, RefreshCw } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, lastSyncTime, openOfflineGuideModal, refreshData } = useEmergency();

  if (isOnline) return null;

  return (
    <aside
      role="status"
      aria-label="Offline Mode Notice"
      className="w-full bg-amber-950/90 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
        <span className="font-semibold">
          Offline Mode Active
        </span>
        <span className="hidden sm:inline text-amber-300/80">•</span>
        <span className="hidden sm:inline text-amber-300/90 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 inline" />
          Showing cached safety data (Last synced: {lastSyncTime})
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={openOfflineGuideModal}
          className="px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/50 text-amber-100 text-[11px] font-medium flex items-center gap-1 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Offline Survival Guide</span>
        </button>

        <button
          onClick={() => refreshData()}
          className="p-1 rounded bg-amber-900/60 hover:bg-amber-800/80 border border-amber-500/50 text-amber-200 text-[11px] transition"
          title="Attempt Reconnect"
          aria-label="Attempt Reconnect"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
