import React from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  CloudRain, 
  TrendingDown, 
  Compass, 
  CheckCircle2, 
  Share2, 
  Building2, 
  Radio
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';

export const AmISafeModal: React.FC = () => {
  const { isAmISafeModalOpen, closeAmISafeModal, weather, shelters, lastSyncTime } = useEmergency();

  if (!isAmISafeModalOpen) return null;

  const nearestShelter = shelters[0] || {
    name: 'Linchauli NDRF Reinforced Post',
    distanceKm: 2.1,
    contactFreqKhz: 'VHF 156.800 MHz',
    capacityAvailable: 195
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Instant Safety Diagnostic
              </h2>
              <p className="text-xs text-slate-400">
                Location: Kedarnath Valley Sector (Lat: 30.6558, Lng: 79.0321)
              </p>
            </div>
          </div>
          <button
            onClick={closeAmISafeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Verdict Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-orange-950/40 border border-red-500/40 shadow-glow-red">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                SAFETY VERDICT
              </span>
              <RiskBadge level="EMERGENCY" showScore={88} />
            </div>
            <div className="text-lg font-bold text-white mb-1">
              HIGH ENVIRONMENTAL THREAT IN YOUR IMMEDIATE SECTOR
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pore-water pressure from 76.4mm rainfall has saturated steep 48° scree slopes. NH-107 and lower mule track have active rockfall blocks.
            </p>
          </div>

          {/* Diagnostic Breakdown Matrix */}
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              Multi-Source Risk Diagnostic Factors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <CloudRain className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Precipitation Load</div>
                  <div className="text-xs text-slate-400">
                    {weather?.precipitationMm || 48.6} mm / 24h (Critical threshold: 45mm)
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-semibold">● Trigger Limit Exceeded</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <TrendingDown className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Slope Stability Index</div>
                  <div className="text-xs text-slate-400">
                    48° weathered gneiss scree (Saturation: 92%)
                  </div>
                  <span className="text-[10px] font-mono text-orange-400 font-semibold">● High Landslide Slip</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Valley Trail Passability</div>
                  <div className="text-xs text-slate-400">
                    Sonprayag & Rambara sections blocked
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-semibold">● 15% Passability</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Compass className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Ridge Evacuation Path</div>
                  <div className="text-xs text-slate-400">
                    Chirbasa High-Ridge byway open
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">● Passable with Caution</span>
                </div>
              </div>

            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              Recommended Immediate Actions
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">1.</span>
                <span><strong>Halt downhill travel:</strong> Do not attempt to cross flooded streams or mudflows on the main Gaurikund trail.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">2.</span>
                <span><strong>Move to nearest safe facility:</strong> Head toward {nearestShelter.name} ({nearestShelter.distanceKm} km away).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">3.</span>
                <span><strong>Radio Monitoring:</strong> Tune transceivers to <strong>{nearestShelter.contactFreqKhz || 'VHF 156.800 MHz'}</strong> for NDRF broadcast announcements.</span>
              </li>
            </ul>
          </div>

          {/* Nearest Shelter Quick Contact */}
          <div className="p-3.5 rounded-lg bg-alpine-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{nearestShelter.name}</div>
                <div className="text-[11px] text-slate-400">Distance: {nearestShelter.distanceKm} km • Available Beds: {nearestShelter.capacityAvailable}</div>
              </div>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800">
              {nearestShelter.contactFreqKhz}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-alpine-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry Confidence: <strong>94%</strong> (Refreshed {lastSyncTime})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText('GPS: 30.6558 N, 79.0321 E | High Risk Alert at Kedarnath Valley | PeakShield Diagnostic');
                alert('Coordinates & Safety Status copied to clipboard for emergency SMS transmission.');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Coordinates</span>
            </button>
            <button
              onClick={closeAmISafeModal}
              className="px-4 py-1.5 rounded-lg bg-shield-blue hover:bg-sky-600 text-white font-semibold transition shadow-sm"
            >
              Acknowledge
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
