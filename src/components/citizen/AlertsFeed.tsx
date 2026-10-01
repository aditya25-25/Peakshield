import React, { useState } from 'react';
import { 
  Bell, 
  MapPin, 
  CheckCircle2, 
  Radio, 
  Share2,
  Check
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';
import { RiskLevel } from '../../types';

export const AlertsFeed: React.FC = () => {
  const { alerts } = useEmergency();
  const [filter, setFilter] = useState<RiskLevel | 'ALL'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'ALL') return true;
    return alert.severity === filter;
  });

  const handleShare = (alertId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(alertId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-12">
      
      {/* Header */}
      <section 
        className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl"
        aria-labelledby="alerts-title"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bell className="w-4 h-4" />
              <span>Official Dispatch Broadcasts</span>
            </div>
            <h1 id="alerts-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
              Alpine Emergency & Hazard Broadcasts
            </h1>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800 flex items-center gap-1.5">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>SDRF / DDMA Broadcast Feed</span>
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'ALL'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            All Broadcasts ({alerts.length})
          </button>

          <button
            onClick={() => setFilter('EMERGENCY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'EMERGENCY'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800/80 text-red-300 hover:text-white'
            }`}
          >
            Emergency Only
          </button>

          <button
            onClick={() => setFilter('WARNING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'WARNING'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-800/80 text-orange-300 hover:text-white'
            }`}
          >
            Warnings
          </button>

          <button
            onClick={() => setFilter('ADVISORY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === 'ADVISORY'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800/80 text-amber-300 hover:text-white'
            }`}
          >
            Advisories
          </button>
        </div>
      </section>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <article
            key={alert.id}
            className="p-5 sm:p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <RiskBadge level={alert.severity} size="sm" />
                <span className="text-xs font-mono text-slate-400">
                  {alert.issuedAt}
                </span>
              </div>

              <button
                onClick={() => handleShare(alert.id, `PEAKSHIELD ALERT: ${alert.title} - ${alert.description} Safety: ${alert.actionInstructions}`)}
                className="p-1.5 px-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1.5 transition"
                aria-label="Share alert text"
              >
                {copiedId === alert.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedId === alert.id ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            <h2 className="text-base font-bold text-white">
              {alert.title}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {alert.description}
            </p>

            {/* Actionable Safety Instructions */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Official Safety Instruction:</span>
              </div>
              <p className="text-slate-300 leading-snug">
                {alert.actionInstructions}
              </p>
            </div>

            {/* Sector & Authority Metatags */}
            <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                Sector: {alert.sector}
              </span>
              <span>Issued by: {alert.issuedBy}</span>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
};
