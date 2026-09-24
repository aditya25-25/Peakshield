import React, { useState } from 'react';
import { 
  Route, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Mountain, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Info,
  Compass,
  Flame,
  ArrowUpDown
} from 'lucide-react';
import { MOCK_ROUTES } from '../../services/mockData';
import { RouteOption } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

export const RouteSafety: React.FC = () => {
  const [routes] = useState<RouteOption[]>(MOCK_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(MOCK_ROUTES[0].id);

  const [origin, setOrigin] = useState('Gaurikund Base Station (1,980m)');
  const [destination, setDestination] = useState('Kedarnath Temple Complex (3,583m)');

  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-12">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Route className="w-4 h-4" />
              Mountain Route Risk Assessment Engine
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Analyze Trail & Alpine Highway Hazard Exposure
            </h1>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            Terrain Hazard Fusion Active
          </span>
        </div>

        {/* Input Selector Card */}
        <div className="p-4 rounded-xl bg-alpine-950 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>ORIGIN LOCATION</span>
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1 flex justify-center py-1">
            <div className="p-2 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              <ArrowRight className="w-4 h-4 hidden md:block" />
              <ArrowUpDown className="w-4 h-4 md:hidden" />
            </div>
          </div>

          <div className="md:col-span-5 space-y-1">
            <label className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>DESTINATION POINT</span>
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-1">
            <button
              onClick={() => alert('Route risk calculated for selected alpine corridor.')}
              className="w-full py-2 px-3 rounded-lg bg-shield-blue hover:bg-sky-600 text-white font-bold text-xs transition"
            >
              Analyze
            </button>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            PeakShield evaluates environmental hazard safety and mudslide susceptibility. PeakShield does not replace physical mountain guide judgment.
          </span>
        </div>
      </div>

      {/* Route Options Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Route Cards Selection List */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Available Corridors ({routes.length})
          </h2>

          {routes.map(r => {
            const isSelected = r.id === selectedRouteId;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRouteId(r.id)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'bg-slate-800/90 border-sky-500 shadow-glow-cyan/20'
                    : 'bg-alpine-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <RiskBadge level={r.overallRiskLevel} size="sm" showScore={r.riskScore} />
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    r.roadCondition === 'BLOCKED'
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : r.roadCondition === 'CAUTION'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {r.roadCondition}
                  </span>
                </div>

                <div className="text-sm font-bold text-white mb-2">{r.name}</div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>{r.distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{Math.floor(r.durationMinutes / 60)}h {r.durationMinutes % 60}m</span>
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

        {/* Detailed Route Hazard Breakdown (Right 2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-6 shadow-xl">
            
            {/* Header of Active Route */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  DETAILED RISK EXPOSURE PROFILE
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{activeRoute.name}</h3>
              </div>
              <RiskBadge level={activeRoute.overallRiskLevel} size="md" showScore={activeRoute.riskScore} />
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">DISTANCE</div>
                <div className="text-base font-extrabold text-white mt-1">{activeRoute.distanceKm} km</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">EST. TRANSIT</div>
                <div className="text-base font-extrabold text-white mt-1">
                  {Math.floor(activeRoute.durationMinutes / 60)}h {activeRoute.durationMinutes % 60}m
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">ELEVATION GAIN</div>
                <div className="text-base font-extrabold text-white mt-1">+{activeRoute.elevationGainMeters} m</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <div className="text-[11px] font-mono text-slate-400">ROAD CONDITION</div>
                <div className={`text-base font-extrabold mt-1 ${activeRoute.roadCondition === 'BLOCKED' ? 'text-red-400' : 'text-amber-400'}`}>
                  {activeRoute.roadCondition}
                </div>
              </div>
            </div>

            {/* Hazard Exposure Progress Meters */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Hazard Exposure Metrics
              </h4>

              <div className="space-y-3">
                
                <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Landslide & Rockfall Prone Track</span>
                    <span className="font-mono font-bold text-red-400">
                      {activeRoute.hazardExposure.landslideProneKm} km of {activeRoute.distanceKm} km
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${(activeRoute.hazardExposure.landslideProneKm / activeRoute.distanceKm) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Riverbed Flood Surge Exposure</span>
                    <span className="font-mono font-bold text-sky-400">
                      {activeRoute.hazardExposure.floodProneKm} km of {activeRoute.distanceKm} km
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full"
                      style={{ width: `${(activeRoute.hazardExposure.floodProneKm / activeRoute.distanceKm) * 100}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            </div>

            {/* "Why this route?" Factor Explanation */}
            <div className="p-4 rounded-xl bg-alpine-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Why this route? (Intelligence Explanation)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeRoute.whyThisRoute}
              </p>
            </div>

            {/* Recommended Safety Action */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <strong className="text-emerald-300">PeakShield Safety Recommendation: </strong>
                {activeRoute.overallRiskLevel === 'EMERGENCY'
                  ? 'Avoid this route immediately. Switch to the Chirbasa Ridge Bypass or hold at base shelter until BRO clearance teams conclude work.'
                  : 'Passable with standard mountain caution. Maintain satellite tracking and ensure warm thermal windproof shell.'}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
