import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  AlertTriangle, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Clock, 
  Compass, 
  Route, 
  MessageSquareWarning, 
  Building2, 
  PhoneCall, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  Radio, 
  BookOpen, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';
import { VerificationBadge } from '../common/VerificationBadge';

interface SafetyDashboardProps {
  onNavigate: (tab: string) => void;
}

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ onNavigate }) => {
  const { 
    weather, 
    riskZones, 
    activeZone, 
    incidents, 
    shelters, 
    alerts, 
    openAmISafeModal, 
    openReportModal, 
    openSosModal, 
    openOfflineGuideModal 
  } = useEmergency();

  const primaryZone = activeZone || riskZones[0];
  const nearestShelter = shelters[0];
  const activeAlert = alerts[0];

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-7xl mx-auto">
      
      {/* 
        ========================================================================
        SECTION 8: PROMINENT SAFETY STATUS SECTION ("AM I SAFE RIGHT NOW?")
        Answers:
        1. Where am I?
        2. Am I safe right now?
        3. Last updated: 2 min ago
        ========================================================================
      */}
      <section 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-alpine-900 to-alpine-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6"
        aria-labelledby="safety-verdict-title"
      >
        <div className="relative z-10 space-y-5">
          
          {/* Top Location Bar ("WHERE AM I?") */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>YOUR LOCATION:</span>
              <span className="text-white font-bold tracking-wide">
                Kedarnath Valley, Sector 3 (3,583m) ? Garhwal Himalayas
              </span>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              GPS Fixed: 30.6558? N, 79.0321? E ? Sync: 2 min ago
            </span>
          </div>

          {/* Safety Verdict Card ("AM I SAFE RIGHT NOW?") */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  ARE YOU SAFE RIGHT NOW?
                </span>
                <RiskBadge 
                  level={primaryZone?.level || 'LOW'} 
                  showScore={primaryZone?.score || 35} 
                  size="lg" 
                />
              </div>

              <h1 id="safety-verdict-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {primaryZone?.level === 'LOW' 
                  ? 'Your current area looks safe.' 
                  : primaryZone?.level === 'ADVISORY'
                  ? 'Travel Advisory Active in Sector 3.'
                  : 'High Environmental Hazard in Immediate Corridor.'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {primaryZone?.level === 'LOW'
                  ? 'No major emergency alerts nearby. Trail conditions are stable with mild precipitation. Safe for planned transit.'
                  : 'Light rain expected for the next 2 hours. Moderate debris runoff reported 12 km away on NH-107.'}
              </p>
            </div>

            {/* Direct Verdict Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                onClick={openAmISafeModal}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <Activity className="w-4 h-4" />
                <span>Full Safety Diagnostic</span>
              </button>

              <button
                onClick={openSosModal}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 animate-pulse"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Emergency Help (SOS)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: WEATHER & NEARBY ALERTS SUMMARY
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weather Card */}
        <section className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-sky-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">WEATHER</h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              IMD Doppler Radar
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                {weather?.temperatureC || 18}?C
              </div>
              <div className="text-sm font-semibold text-sky-300 mt-0.5">
                {weather?.condition || 'Light Rain'}
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div className="font-mono text-slate-300 font-bold">{weather?.windSpeedKmh || 38} km/h wind</div>
              <div>Visibility: {weather?.visibilityKm || 1.8} km</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            Rain expected for the next 2 hours. Freezing level at 4,100m. Scree slope moisture is at 62%.
          </p>
        </section>

        {/* Nearby Alerts Card */}
        <section className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">NEARBY ALERTS</h2>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              {alerts.length} Active Notice
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-white">
                  {activeAlert?.title || '1 Advisory Nearby'}
                </div>
                <div className="text-xs text-amber-300 font-medium mt-0.5">
                  Heavy rainfall expected ? 12 km away
                </div>
              </div>
              <RiskBadge level={activeAlert?.severity || 'ADVISORY'} size="sm" />
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-snug">
              {activeAlert?.description || 'Heavy rainfall advisory issued for NH-107 and Mandakini tributary gorges. Exercise caution on scree tracks.'}
            </p>
          </div>
        </section>

      </div>

      {/* 
        ========================================================================
        SECTION 8: LARGE QUICK ACTIONS GRID
        - Check Risk Map
        - Check Route
        - Report Emergency
        - Ask the Mountain
        - Find Safe Place
        ========================================================================
      */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
          QUICK ACTIONS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Action 1: Check Risk Map */}
          <button
            onClick={() => onNavigate('map')}
            className="p-4 rounded-2xl bg-alpine-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500 text-left transition flex flex-col justify-between group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 w-fit group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="font-bold text-sm text-white flex items-center justify-between">
                <span>Check Risk Map</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                View risk zones, roads, weather & live sensors.
              </p>
            </div>
          </button>

          {/* Action 2: Check Route */}
          <button
            onClick={() => onNavigate('routes')}
            className="p-4 rounded-2xl bg-alpine-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 text-left transition flex flex-col justify-between group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit group-hover:scale-105 transition-transform">
              <Route className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="font-bold text-sm text-white flex items-center justify-between">
                <span>Check Route</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Compare corridor safety, distance & elevation.
              </p>
            </div>
          </button>

          {/* Action 3: Report Emergency */}
          <button
            onClick={openReportModal}
            className="p-4 rounded-2xl bg-alpine-900 hover:bg-orange-950/40 border border-slate-800 hover:border-orange-500 text-left transition flex flex-col justify-between group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 w-fit group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="font-bold text-sm text-orange-200 flex items-center justify-between">
                <span>Report Emergency</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition" />
              </div>
              <p className="text-[11px] text-orange-300/70 mt-1 leading-snug">
                Report landslide, accident, or road block.
              </p>
            </div>
          </button>

          {/* Action 4: Ask the Mountain */}
          <button
            onClick={() => onNavigate('ai')}
            className="p-4 rounded-2xl bg-alpine-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500 text-left transition flex flex-col justify-between group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 w-fit group-hover:scale-105 transition-transform">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="font-bold text-sm text-white flex items-center justify-between">
                <span>Ask the Mountain</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                AI safety advisory & terrain guidance.
              </p>
            </div>
          </button>

          {/* Action 5: Find Safe Place */}
          <button
            onClick={openOfflineGuideModal}
            className="p-4 rounded-2xl bg-alpine-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500 text-left transition flex flex-col justify-between group shadow-lg"
          >
            <div className="p-3 rounded-xl bg-teal-500/20 text-teal-400 w-fit group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <div className="font-bold text-sm text-white flex items-center justify-between">
                <span>Find Safe Place</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Nearest safe shelters & offline guides.
              </p>
            </div>
          </button>

        </div>
      </section>

      {/* 
        ========================================================================
        WHAT SHOULD I DO RIGHT NOW? (Immediate Action Steps)
        ========================================================================
      */}
      <section className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">What Should I Do Right Now? (Immediate Steps)</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
            Official SOP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center">1</div>
              <h3 className="font-bold text-white text-xs">Stay on Designated Ridge Trail</h3>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Avoid riverbed walking paths. Move towards <strong>Linchauli Reinforced Post (2.1 km)</strong> on the upper ridge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">2</div>
              <h3 className="font-bold text-white text-xs">Verify Road Checkpoints</h3>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Sonprayag km 14 has debris slips. Check with police or SDRF wardens before motor travel.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center">3</div>
              <h3 className="font-bold text-white text-xs">Tune Emergency Radio</h3>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Emergency transceiver: <strong>VHF 156.800 MHz</strong>. In case of lost mobile network, cached offline guide remains active.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
