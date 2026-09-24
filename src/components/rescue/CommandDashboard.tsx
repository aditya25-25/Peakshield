import React from 'react';
import { 
  Flame, 
  ShieldAlert, 
  Bell, 
  Car, 
  UserX, 
  Radio, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertOctagon, 
  Compass, 
  MapPin
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';
import { VerificationBadge } from '../common/VerificationBadge';
import { CitizenMap } from '../citizen/CitizenMap';

interface CommandDashboardProps {
  onNavigate: (tab: string) => void;
}

export const CommandDashboard: React.FC<CommandDashboardProps> = ({ onNavigate }) => {
  const { incidents, riskZones, alerts, setSelectedIncident } = useEmergency();

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const criticalZones = riskZones.filter(z => z.level === 'EMERGENCY' || z.level === 'WARNING');
  const blockedRoads = incidents.filter(i => i.roadBlocked);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* Top EOC Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-alpine-900 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              State Disaster Emergency Operations Center (SEOC)
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Live Sensor Fusion Telemetry: Uttarakhand & Western Himalayas Grid • Sector 4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            DEFENSE TELEMETRY ONLINE
          </span>
          <button
            onClick={() => onNavigate('rescue-brief')}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-glow-red"
          >
            Generate SITREP Brief
          </button>
        </div>
      </div>

      {/* TOP KPI COUNTERS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* KPI 1: Active Incidents */}
        <div 
          onClick={() => onNavigate('rescue-incidents')}
          className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 hover:border-red-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Active Incidents</span>
            <Flame className="w-4 h-4 text-red-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {activeIncidents.length}
          </div>
          <div className="text-[11px] text-red-400 font-mono mt-1">
            {activeIncidents.filter(i => i.severity === 'EMERGENCY').length} critical priority
          </div>
        </div>

        {/* KPI 2: High-Risk Zones */}
        <div 
          onClick={() => onNavigate('rescue-map')}
          className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 hover:border-orange-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">High-Risk Zones</span>
            <ShieldAlert className="w-4 h-4 text-orange-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {criticalZones.length}
          </div>
          <div className="text-[11px] text-orange-400 font-mono mt-1">
            Gaurikund & Joshimath
          </div>
        </div>

        {/* KPI 3: Active Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Active Alerts</span>
            <Bell className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {alerts.length}
          </div>
          <div className="text-[11px] text-amber-400 font-mono mt-1">
            1 Red • 1 Orange • 1 Yellow
          </div>
        </div>

        {/* KPI 4: Road Blockages */}
        <div 
          onClick={() => onNavigate('rescue-incidents')}
          className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 hover:border-red-500/50 cursor-pointer transition shadow-md group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Road Blockages</span>
            <Car className="w-4 h-4 text-red-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {blockedRoads.length}
          </div>
          <div className="text-[11px] text-red-400 font-mono mt-1 truncate">
            NH-107 Sonprayag
          </div>
        </div>

        {/* KPI 5: Missing Persons SAR */}
        <div 
          onClick={() => onNavigate('rescue-missing')}
          className="p-4 rounded-2xl bg-alpine-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition shadow-md group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">SAR Cases</span>
            <UserX className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            2
          </div>
          <div className="text-[11px] text-purple-400 font-mono mt-1">
            1 Critical (Kedartal)
          </div>
        </div>

      </div>

      {/* TACTICAL LIVE MAP & INCIDENT FEED SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Tactical Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              Live Tactical Operations Map
            </h2>
            <button
              onClick={() => onNavigate('rescue-map')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full Screen Tactical Mode</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[520px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <CitizenMap />
          </div>
        </div>

        {/* Real-Time Priority Incident Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-400" />
              Priority Incident Dispatch Feed ({activeIncidents.length})
            </h2>
            <button
              onClick={() => onNavigate('rescue-incidents')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {activeIncidents.map(inc => (
              <div
                key={inc.id}
                onClick={() => {
                  setSelectedIncident(inc);
                  onNavigate('rescue-incidents');
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition hover:scale-[1.01] ${
                  inc.severity === 'EMERGENCY'
                    ? 'bg-red-950/30 border-red-700/60 shadow-glow-red/20'
                    : 'bg-alpine-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{inc.id}</span>
                    <VerificationBadge state={inc.verificationState} />
                  </div>
                  <RiskBadge level={inc.severity} size="sm" />
                </div>

                <div className="text-sm font-bold text-white mb-1">{inc.title}</div>
                
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{inc.locationName}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {inc.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-400">Team: <strong className="text-slate-200">{inc.assignedTeam || 'Unassigned'}</strong></span>
                  <span className="text-slate-400">{inc.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
