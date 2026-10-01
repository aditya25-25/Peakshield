import React from 'react';
import { 
  Shield, 
  MapPin, 
  Route, 
  MessageSquareWarning, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  CloudRain, 
  Activity, 
  Flame, 
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { activeZone, weather, alerts } = useEmergency();

  return (
    <div className="space-y-16 pb-24 md:pb-16 max-w-7xl mx-auto overflow-hidden">
      
      {/* 
        ========================================================================
        HERO SECTION (Section 7 Requirements)
        ========================================================================
      */}
      <section className="relative pt-6 sm:pt-12 pb-10 sm:pb-16 text-center lg:text-left">
        
        {/* Subtle Mountain Topography Background Lines */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-30">
          <svg className="w-full h-full max-w-5xl" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 350L250 150L450 300L650 80L850 350" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M100 370L320 200L520 320L720 130L880 370" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
            <circle cx="650" cy="80" r="6" fill="#38BDF8" className="animate-pulse" />
            <circle cx="250" cy="150" r="5" fill="#0284C7" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Sector Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-medium">Garhwal, Ladakh & Himachal Alpine Radar Live</span>
            </div>

            {/* Main Headline & Supporting Message */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
                Know the mountain <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-300">
                  before it changes.
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
                PeakShield combines weather, terrain, alerts, routes and emergency intelligence to help people understand risk and respond faster.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition shadow-xl shadow-sky-600/25 flex items-center gap-2 active:scale-95"
                id="cta-check-safety"
              >
                <Activity className="w-4 h-4" />
                <span>Check My Safety</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('map')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition flex items-center gap-2 active:scale-95"
                id="cta-explore-map"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Explore PeakShield</span>
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-Tap SOS Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Real-Time Terrain Radar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Offline Rescue Sync</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card: Live Safety Cockpit Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-alpine-900 to-alpine-950 border border-slate-800 p-6 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-white">Kedarnath Valley (3,583m)</span>
                </div>
                <RiskBadge level={activeZone?.level || 'ADVISORY'} size="sm" showScore={activeZone?.score || 58} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 text-[10px] font-mono">AIR TEMPERATURE</span>
                  <div className="text-base font-bold text-white">{weather?.temperatureC || 18}?C ? Light Rain</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 text-[10px] font-mono">24H PRECIPITATION</span>
                  <div className="text-base font-bold text-white">{weather?.precipitationMm || 76.4} mm</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-slate-200 flex items-center justify-between">
                  <span>Current Route Safety Status</span>
                  <span className="text-amber-400 text-[10px] font-mono">Advisory Active</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  NH-107 Sonprayag km 14 has debris slips. Linchauli ridge bypass is clear with caution.
                </p>
              </div>

              <button
                onClick={() => onNavigate('home')}
                className="w-full py-2.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <span>Open Full Safety Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </section>

      {/* 
        ========================================================================
        HOW PEAKSHIELD WORKS (Pillars of Mountain Intelligence)
        ========================================================================
      */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
            TECHNICAL UNDERNEATH ? SIMPLE ON THE SURFACE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineered for alpine certainty
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            PeakShield fuses multi-spectral meteorological data, terrain slope physics, and emergency responder updates into actionable answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 w-fit">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">1. Predict Hazard</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detect sudden cloudburst surges, scree slope saturation, and landslide triggers before you start your ascent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">2. Protect Routes</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Compare walking corridors, road blockages, and elevation gain profiles in plain, understandable risk levels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-400 w-fit">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3. Respond Faster</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              1-tap GPS SOS connects directly to local SDRF dispatch, police hubs, and certified mountain rescue posts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 w-fit">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">4. Ask Mountain AI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grounded conversational assistant for localized slope stability, nearest shelter coordinates, and survival steps.
            </p>
          </div>

        </div>
      </section>

      {/* 
        ========================================================================
        BOTTOM CTA BANNER
        ========================================================================
      */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950/60 via-alpine-900 to-slate-900 border border-sky-900/50 text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to explore safely?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Check your current sector risk or test safe routes across Garhwal, Ladakh, and Himachal corridors now.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition shadow-lg shadow-sky-600/20 active:scale-95"
          >
            Check My Safety Now
          </button>
          <button
            onClick={() => onNavigate('routes')}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition active:scale-95"
          >
            Check Route Safety
          </button>
        </div>
      </section>

    </div>
  );
};
