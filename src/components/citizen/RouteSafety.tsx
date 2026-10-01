import React, { useState } from 'react';
import { 
  Route, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Mountain, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Compass,
  ArrowUpDown,
  ShieldCheck,
  Navigation
} from 'lucide-react';
import { MOCK_ROUTES } from '../../services/mockData';
import { RouteOption } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

export const RouteSafety: React.FC = () => {
  const [routes] = useState<RouteOption[]>(MOCK_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(MOCK_ROUTES[0].id);

  const [origin, setOrigin] = useState('Current Location (Sector 3 Linchauli)');
  const [destination, setDestination] = useState('Kedarnath Temple Base (3,583m)');

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-12">
      
      {/* 
        ========================================================================
        WHERE ARE YOU GOING? (Section 18)
        ========================================================================
      */}
      <section 
        className="p-6 sm:p-8 rounded-3xl bg-alpine-900 border border-slate-800 space-y-5 shadow-xl"
        aria-labelledby="route-safety-title"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Route className="w-4 h-4" />
              <span>Route Safety Intelligence</span>
            </div>
            <h1 id="route-safety-title" className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Where are you going?
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare mountain corridors and avoid active mudslide zones
            </p>
          </div>
          <span className="text-xs text-slate-300 font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            Real-Time Hazard Fusion Active
          </span>
        </div>

        {/* Origin & Destination Card */}
        <div className="p-4 rounded-2xl bg-alpine-950 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>FROM</span>
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1 flex justify-center py-1">
            <div className="p-2.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              <ArrowRight className="w-4 h-4 hidden md:block" />
              <ArrowUpDown className="w-4 h-4 md:hidden" />
            </div>
          </div>

          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>TO (DESTINATION)</span>
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1">
            <button
              onClick={() => alert('Route risk refreshed for: ' + origin + ' -> ' + destination)}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition active:scale-95"
            >
              Analyze
            </button>
          </div>

        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            PeakShield calculates slope gradient, 24h rainfall saturation, and active road blockages reported by SDRF and BRO field units.
          </span>
        </div>
      </section>

      {/* 
        ========================================================================
        ROUTE OPTIONS COMPARISON (Route A, Route B, Route C)
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Route Cards Selection List */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Route Options ({routes.length})
          </h2>

          {routes.map((r, idx) => {
            const isSelected = r.id === selectedRouteId;
            const routeLetter = String.fromCharCode(65 + idx); // Route A, Route B, Route C

            return (
              <div
                key={r.id}
                onClick={() => setSelectedRouteId(r.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedRouteId(r.id); }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
                className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  isSelected
                    ? 'bg-slate-800/90 border-sky-500 shadow-xl ring-1 ring-sky-500/50'
                    : 'bg-alpine-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 font-mono font-bold text-xs flex items-center justify-center border border-sky-500/30">
                      {routeLetter}
                    </span>
                    <span className="font-bold text-sm text-white">Route {routeLetter}</span>
                  </div>
                  <RiskBadge level={r.overallRiskLevel} size="sm" showScore={r.riskScore} />
                </div>

                <div className="text-xs text-slate-300 font-medium mb-3">{r.name}</div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-700/50 pt-2.5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{Math.floor(r.durationMinutes / 60)}h {r.durationMinutes % 60}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>{r.distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+{r.elevationGainMeters}m</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Route Hazard Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-alpine-900 border border-slate-800 space-y-6 shadow-xl">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  ROUTE RISK BREAKDOWN & TELEMETRY
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{activeRoute.name}</h3>
              </div>
              <RiskBadge level={activeRoute.overallRiskLevel} size="md" showScore={activeRoute.riskScore} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">DISTANCE</div>
                <div className="text-lg font-extrabold text-white mt-1">{activeRoute.distanceKm} km</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">EST. TIME</div>
                <div className="text-lg font-extrabold text-white mt-1">
                  {Math.floor(activeRoute.durationMinutes / 60)}h {activeRoute.durationMinutes % 60}m
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">ELEVATION GAIN</div>
                <div className="text-lg font-extrabold text-white mt-1">+{activeRoute.elevationGainMeters} m</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">ROAD CONDITION</div>
                <div className={`text-lg font-extrabold mt-1 ${
                  activeRoute.roadCondition === 'BLOCKED' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {activeRoute.roadCondition}
                </div>
              </div>
            </div>

            {/* Why This Route (Clear Explanations) */}
            <div className="p-4 rounded-2xl bg-alpine-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Why this risk rating? (Hazard Explanation)</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeRoute.whyThisRoute}
              </p>
            </div>

            {/* Hazard Exposure Progress */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Corridor Hazard Exposure
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-medium">Landslide & Rockfall Exposure</span>
                    <span className="font-mono font-bold text-red-400">
                      {activeRoute.hazardExposure.landslideProneKm} km ({Math.round((activeRoute.hazardExposure.landslideProneKm / activeRoute.distanceKm) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${(activeRoute.hazardExposure.landslideProneKm / activeRoute.distanceKm) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300 font-medium">Riverbed Flood Surge Exposure</span>
                    <span className="font-mono font-bold text-sky-400">
                      {activeRoute.hazardExposure.floodProneKm} km ({Math.round((activeRoute.hazardExposure.floodProneKm / activeRoute.distanceKm) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full"
                      style={{ width: `${(activeRoute.hazardExposure.floodProneKm / activeRoute.distanceKm) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Verdict */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-slate-300 leading-snug">
                <strong className="text-emerald-300">PeakShield Recommendation: </strong>
                {activeRoute.overallRiskLevel === 'EMERGENCY'
                  ? 'Avoid this route immediately. Switch to Route A (Linchauli Ridge Bypass) or hold at base shelter until BRO clearance teams finish work.'
                  : 'Route is passable with caution. Maintain satellite tracking and ensure warm thermal windproof shell.'}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
