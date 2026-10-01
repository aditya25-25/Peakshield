import React from 'react';
import { 
  X, 
  ShieldAlert, 
  CloudRain, 
  TrendingDown, 
  CheckCircle2, 
  Building2, 
  Car,
  PhoneCall
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';

export const AmISafeModal: React.FC = () => {
  const { isAmISafeModalOpen, closeAmISafeModal, weather, shelters, openSosModal } = useEmergency();

  if (!isAmISafeModalOpen) return null;

  const nearestShelter = shelters[0] || {
    name: 'Linchauli NDRF Reinforced Post',
    distanceKm: 2.1,
    contactFreqKhz: 'VHF 156.800 MHz',
    capacityAvailable: 195
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ami-safe-title"
    >
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 id="ami-safe-title" className="text-base font-bold text-white tracking-wide">
                Instant Safety Diagnostic Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Location: Kedarnath Valley Sector 3 (Lat: 30.6558, Lng: 79.0321)
              </p>
            </div>
          </div>
          <button
            onClick={closeAmISafeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Diagnostic Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          
          {/* Main Verdict Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 to-orange-950/50 border border-red-500/40 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                SAFETY VERDICT
              </span>
              <RiskBadge level="EMERGENCY" showScore={88} />
            </div>
            <div className="text-base sm:text-lg font-bold text-white mb-1">
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
              
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <CloudRain className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Precipitation Load</div>
                  <div className="text-xs text-slate-400">
                    {weather?.precipitationMm || 76.4} mm / 24h (Critical threshold: 45mm)
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-semibold block mt-0.5">● Trigger Limit Exceeded</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <TrendingDown className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Slope Stability Index</div>
                  <div className="text-xs text-slate-400">
                    48° weathered gneiss scree (Saturation: 92%)
                  </div>
                  <span className="text-[10px] font-mono text-orange-400 font-semibold block mt-0.5">● High Landslide Slip Risk</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Car className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Highway & Trail Passability</div>
                  <div className="text-xs text-slate-400">
                    NH-107 blocked at km 14.2; Valley mule trail impassable
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-semibold block mt-0.5">● Transit Impassable</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                <Building2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Shelter Proximity</div>
                  <div className="text-xs text-slate-400">
                    {nearestShelter.name} ({nearestShelter.distanceKm} km away)
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block mt-0.5">● Shelter Available</span>
                </div>
              </div>

            </div>
          </div>

          {/* Immediate Action Checklist */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2.5">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recommended Immediate Actions</span>
            </h3>
            
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Do not proceed along riverbed:</strong> Move to ridge shelters or stay in concrete reinforced facilities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Keep emergency radio active:</strong> Monitor VHF frequency {nearestShelter.contactFreqKhz}.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Preserve battery:</strong> Download offline guides below in case of cellular network drop.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-alpine-950 flex items-center justify-between">
          <button
            onClick={() => {
              closeAmISafeModal();
              openSosModal();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Open Emergency SOS</span>
          </button>
          
          <button
            onClick={closeAmISafeModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
