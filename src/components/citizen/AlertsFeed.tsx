import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Radio, 
  Building2, 
  CheckCircle2, 
  Filter,
  Share2
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskLevel } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

export const AlertsFeed: React.FC = () => {
  const { alerts, lastSyncTime } = useEmergency();
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterLevel === 'ALL') return true;
    return a.level === filterLevel;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24 md:pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Active Mountain Emergency & Safety Broadcasts
              </h1>
              <p className="text-xs text-slate-400">
                Official civil protection, NDMA, SDRF & IMD meteorological alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Updated: {lastSyncTime}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Severity:</span>
          </span>

          {[
            { id: 'ALL', label: 'All Alerts' },
            { id: 'EMERGENCY', label: 'Critical Emergency' },
            { id: 'WARNING', label: 'Warning' },
            { id: 'ADVISORY', label: 'Advisory' },
          ].map(lvl => (
            <button
              key={lvl.id}
              onClick={() => setFilterLevel(lvl.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterLevel === lvl.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-alpine-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            No active alerts matching selected severity filter.
          </div>
        ) : (
          filteredAlerts.map(alertItem => (
            <div
              key={alertItem.id}
              className={`p-6 rounded-2xl border shadow-xl transition space-y-4 ${
                alertItem.level === 'EMERGENCY'
                  ? 'bg-gradient-to-r from-red-950/60 via-alpine-900 to-alpine-900 border-red-500/50 shadow-glow-red/20'
                  : alertItem.level === 'WARNING'
                  ? 'bg-gradient-to-r from-orange-950/40 via-alpine-900 to-alpine-900 border-orange-500/40'
                  : 'bg-alpine-900 border-slate-800'
              }`}
            >
              {/* Alert Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <RiskBadge level={alertItem.level} size="md" />
                  <span className="text-xs font-mono text-slate-400 font-bold">{alertItem.id}</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Issued: {alertItem.issuedAt}</span>
                  <span>•</span>
                  <span>Valid Until: {alertItem.expiresAt}</span>
                </div>
              </div>

              {/* Title & Region */}
              <div>
                <h2 className="text-lg font-extrabold text-white">{alertItem.title}</h2>
                <div className="text-xs font-mono text-sky-400 mt-0.5">
                  Affected Region: {alertItem.region}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-alpine-950/80 p-4 rounded-xl border border-slate-800">
                {alertItem.description}
              </p>

              {/* Recommended Actions */}
              {alertItem.recommendedActions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Mandatory Public Safety Actions</span>
                  </div>
                  <ul className="space-y-1.5">
                    {alertItem.recommendedActions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold font-mono">[{idx + 1}]</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer / Authority */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 text-[11px]">
                  Broadcasting Authority: <strong className="text-slate-200">{alertItem.sourceAgency}</strong>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`[PeakShield Alert] ${alertItem.title} - ${alertItem.description}`);
                    window.alert('Alert copied for forwarding.');
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 transition text-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Broadcast</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
