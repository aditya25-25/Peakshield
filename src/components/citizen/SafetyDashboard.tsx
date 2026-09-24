import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Activity, 
  CloudRain, 
  Wind, 
  Eye, 
  Compass, 
  AlertTriangle, 
  Building2, 
  Flame, 
  Route, 
  MessageSquareWarning, 
  Radio, 
  BookOpen, 
  ChevronRight, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';

interface SafetyDashboardProps {
  onNavigate: (tab: string) => void;
}

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ onNavigate }) => {
  const { 
    weather, 
    riskZones, 
    alerts, 
    shelters, 
    lastSyncTime, 
    openAmISafeModal, 
    openReportModal, 
    openOfflineGuide 
  } = useEmergency();

  const currentZone = riskZones[0]; // Active sector (Gaurikund / Jungle Chatti)
  const activeAlerts = alerts.filter(a => a.level === 'EMERGENCY' || a.level === 'WARNING');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-12">
      
      {/* Location & GPS Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-alpine-900/80 border border-slate-800 rounded-xl p-3 px-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <MapPin className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <span>CURRENT GPS TERRAIN SECTOR</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">2,350m Alt</span>
            </div>
            <div className="text-sm font-bold text-white">
              {currentZone ? currentZone.name : 'Gaurikund - Jungle Chatti Sector'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Radar Sync: <strong className="text-slate-200">{lastSyncTime}</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <span>Grid: 30.6558°N, 79.0321°E</span>
          </div>
        </div>
      </div>

      {/* HERO: "YOUR CURRENT SAFETY STATUS" BANNER */}
      <section aria-label="Current Safety Status" className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-950/70 via-alpine-900 to-alpine-900 border border-red-500/40 shadow-2xl p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 space-y-6">
          
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                YOUR CURRENT SAFETY STATUS
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1 tracking-tight">
                CRITICAL THREAT LEVEL IN CURRENT SECTOR
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <RiskBadge level="EMERGENCY" size="lg" showScore={88} />
            </div>
          </div>

          {/* Quick Context Summary */}
          <div className="p-4 rounded-xl bg-alpine-950/90 border border-red-500/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="text-slate-400 font-mono text-[11px] uppercase">Primary Threat</div>
              <div className="font-bold text-red-300 text-sm">
                Active Debris Flow & Saturated Slope Slip
              </div>
              <div className="text-slate-400">Weathered 48° scree zone above Jungle Chatti</div>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
              <div className="text-slate-400 font-mono text-[11px] uppercase">Road & Trail Status</div>
              <div className="font-bold text-orange-300 text-sm">
                NH-107 & Sonprayag Segment BLOCKED
              </div>
              <div className="text-slate-400">Passability index: 15% (River trail submerged)</div>
            </div>

            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
              <div className="text-slate-400 font-mono text-[11px] uppercase">Nearest Fortified Refuge</div>
              <div className="font-bold text-emerald-300 text-sm">
                Linchauli NDRF Post (2.1 km uphill)
              </div>
              <div className="text-slate-400">195 beds available • Sat-Comm active</div>
            </div>
          </div>

          {/* PRIMARY INTERACTION: AM I SAFE? BIG BUTTON */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={openAmISafeModal}
              className="flex-1 min-w-[220px] py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-glow-red transition transform active:scale-[0.99]"
            >
              <Activity className="w-6 h-6 animate-pulse" />
              <span>AM I SAFE? RUN DEEP DIAGNOSTIC</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={openReportModal}
              className="px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-sm sm:text-base flex items-center gap-2 transition"
            >
              <Flame className="w-5 h-5 text-red-400" />
              <span>Report Incident</span>
            </button>
          </div>

        </div>
      </section>

      {/* ACTIVE WARNINGS & BROADCASTS */}
      {activeAlerts.length > 0 && (
        <section aria-label="Active Warnings" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              High-Priority Broadcast Alerts ({activeAlerts.length})
            </h2>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All Broadcasts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAlerts.slice(0, 2).map(alert => (
              <div
                key={alert.id}
                onClick={() => onNavigate('alerts')}
                className={`p-4 rounded-xl border cursor-pointer transition hover:scale-[1.01] ${
                  alert.level === 'EMERGENCY'
                    ? 'bg-red-950/40 border-red-700/60 shadow-glow-red/20'
                    : 'bg-orange-950/30 border-orange-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <RiskBadge level={alert.level} size="sm" />
                  <span className="text-[11px] font-mono text-slate-400">{alert.issuedAt}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{alert.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {alert.description}
                </p>
                <div className="text-[11px] font-medium text-sky-300 flex items-center gap-1">
                  <span>Source: {alert.sourceAgency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUICK COMMAND TILES (Core Citizen Workflows) */}
      <section aria-label="Quick Actions" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        <button
          onClick={() => onNavigate('map')}
          className="p-4 rounded-xl bg-alpine-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition text-left group flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit group-hover:scale-110 transition">
            <Compass className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold text-white group-hover:text-sky-300 transition">
              Live Risk Map
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Terrain & hazard layers
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('routes')}
          className="p-4 rounded-xl bg-alpine-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition text-left group flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit group-hover:scale-110 transition">
            <Route className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition">
              Route Safety
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Evaluate pass risk & ETA
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('ai')}
          className="p-4 rounded-xl bg-alpine-900/90 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition text-left group flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit group-hover:scale-110 transition">
            <MessageSquareWarning className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold text-white group-hover:text-purple-300 transition">
              Ask the Mountain AI
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Instant safety answers
            </div>
          </div>
        </button>

        <button
          onClick={openOfflineGuide}
          className="p-4 rounded-xl bg-alpine-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 transition text-left group flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit group-hover:scale-110 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
              Offline Protocols
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Landslide & SOS drills
            </div>
          </div>
        </button>

      </section>

      {/* WEATHER METRICS & NEARBY SHELTERS SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mountain Weather Telemetry */}
        <div className="p-5 rounded-xl bg-alpine-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-400" />
              Alpine Weather Telemetry
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
              IMD Doppler Radar
            </span>
          </div>

          <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-3xl font-extrabold text-white">
                {weather?.temperatureC ?? 4.2}°C
              </div>
              <div className="text-xs text-sky-300 font-medium">
                {weather?.condition ?? 'Heavy Alpine Rain & Mist'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-red-400">
                {weather?.precipitationMm ?? 48.6} mm / 24h
              </span>
              <div className="text-[10px] text-slate-400">Rainfall Accumulation</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>Wind Speed</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {weather?.windSpeedKmh ?? 42} km/h
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Visibility</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {weather?.visibilityKm ?? 1.8} km
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Freezing Level</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {weather?.freezeLevelMeters ?? 3800} m
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Barometer</span>
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {weather?.barometricPressureHpa ?? 712} hPa
              </div>
            </div>
          </div>
        </div>

        {/* Nearest Safe Shelters & Evacuation Centers */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-alpine-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Nearest Safe Shelters & Emergency Refuges
            </h2>
            <button
              onClick={() => onNavigate('map')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View On Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {shelters.slice(0, 3).map(shelter => (
              <div
                key={shelter.id}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{shelter.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                      {shelter.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Location: {shelter.locationName} • Capacity: {shelter.capacityAvailable} / {shelter.capacityTotal} beds available
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      {shelter.distanceKm} km away
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {shelter.contactFreqKhz}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Route guidance to ${shelter.name} loaded. Keep following the ridge track!`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-shield-blue/20 hover:bg-shield-blue/30 text-sky-300 border border-shield-blue/40 text-xs font-semibold transition"
                  >
                    Direct Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
