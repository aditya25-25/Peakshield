import React, { useState } from 'react';
import { 
  UserX, 
  Search, 
  MapPin, 
  Clock, 
  Mountain, 
  ShieldAlert, 
  Radio, 
  Plus, 
  CheckCircle2, 
  Info,
  Compass,
  FileText
} from 'lucide-react';
import { MOCK_MISSING_PERSONS } from '../../services/mockData';
import { MissingPersonCase } from '../../types';
import { api } from '../../services/api';

export const MissingPersonHub: React.FC = () => {
  const [cases, setCases] = useState<MissingPersonCase[]>(MOCK_MISSING_PERSONS);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(MOCK_MISSING_PERSONS[0].id);

  // Form for adding reconnaissance clue
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [evidenceSource, setEvidenceSource] = useState('Thermal Drone Recon Alpha');
  const [submittingEvidence, setSubmittingEvidence] = useState(false);

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceDesc.trim()) return;
    setSubmittingEvidence(true);

    try {
      const updated = await api.addMissingPersonEvidence(activeCase.id, evidenceDesc, evidenceSource);
      if (updated) {
        setCases(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEvidenceDesc('');
      }
    } catch (err) {
      console.error('Evidence update failed:', err);
    } finally {
      setSubmittingEvidence(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* Top Header */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
              <UserX className="w-4 h-4" />
              High-Altitude Search & Rescue (SAR) Tactical Hub
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Active Missing Persons & Reconnaissance Missions
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Thermal UAV & Cell Ping Grid Active</span>
          </div>
        </div>

        {/* Ethical System Notice */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-slate-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-purple-300">SAR Modeling Principle:</strong> PeakShield computes search-priority probability sectors using last known telemetry and terrain topography. PeakShield does not display fake live GPS tracking when communications are severed.
          </div>
        </div>
      </div>

      {/* SAR Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Cases List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Active SAR Missions ({cases.length})
          </h2>

          <div className="space-y-3">
            {cases.map(c => {
              const isSelected = c.id === selectedCaseId;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-purple-950/30 border-purple-500 shadow-glow-cyan/20'
                      : 'bg-alpine-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-purple-400">{c.id}</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      c.searchPriority === 'CRITICAL'
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : 'bg-orange-950 text-orange-300 border border-orange-800'
                    }`}>
                      {c.searchPriority} PRIORITY
                    </span>
                  </div>

                  <div className="text-base font-bold text-white mb-1">{c.fullName}, {c.age}</div>
                  
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span className="truncate">{c.lastKnownLocation}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                    <span>Terrain: <strong className="text-slate-200">{c.terrainDifficulty}</strong></span>
                    <span>Radius: <strong className="text-purple-300">{c.searchRadiusKm} km</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Case Dossier (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-6 shadow-xl">
            
            {/* Dossier Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  SEARCH & RESCUE DOSSIER
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeCase.fullName} (Age: {activeCase.age}, {activeCase.gender})
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Group: {activeCase.trekGroup} • Contact: {activeCase.contactNumber}
                </div>
              </div>

              <span className="px-3 py-1 rounded-lg bg-red-950/60 border border-red-800 text-red-300 font-mono text-xs font-bold animate-pulse">
                STATUS: {activeCase.status.replace('_', ' ')}
              </span>
            </div>

            {/* Visual Identification & Description */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-sky-400 uppercase">
                Visual Gear & Physical Identification
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeCase.description}
              </p>
            </div>

            {/* Topographic Search Parameters & Priority Zones */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Topographic Search Priority Sectors
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                
                <div className="p-3 rounded-xl bg-red-950/30 border border-red-700/60">
                  <div className="text-red-400 font-bold uppercase text-[11px]">Primary Sector (High Probability)</div>
                  <div className="text-sm font-extrabold text-white mt-1">0.0 - 2.5 km Arc</div>
                  <div className="text-[10px] text-slate-400 mt-1">Scree funnel & glacial runoff gully</div>
                </div>

                <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-700/60">
                  <div className="text-orange-400 font-bold uppercase text-[11px]">Secondary Sector (Drift Radius)</div>
                  <div className="text-sm font-extrabold text-white mt-1">2.5 - 4.8 km Arc</div>
                  <div className="text-[10px] text-slate-400 mt-1">Downstream boulders & tree line</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700">
                  <div className="text-slate-300 font-bold uppercase text-[11px]">Assigned SAR Units</div>
                  <div className="text-xs font-bold text-white mt-1">{activeCase.assignedTeams.length} Active Squads</div>
                  <div className="text-[10px] text-slate-400 mt-1">UAV Recon + Ground Team</div>
                </div>

              </div>
            </div>

            {/* Assigned Units Badges */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">Assigned Search Teams</div>
              <div className="flex flex-wrap gap-2">
                {activeCase.assignedTeams.map((team, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-semibold"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>

            {/* Evidence & Clue Log */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>SAR Reconnaissance Evidence Log ({activeCase.evidenceLog.length})</span>
                <span className="text-[10px] text-emerald-400">Live Telemetry Feed</span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeCase.evidenceLog.map(ev => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-sky-300">{ev.source}</span>
                      <span className="text-slate-400">{ev.timestamp}</span>
                    </div>
                    <p className="text-slate-300">{ev.description}</p>
                  </div>
                ))}
              </div>

              {/* Add Clue Form */}
              <form onSubmit={handleAddEvidence} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-300 font-bold">Log New Drone / Ranger Clue:</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={evidenceDesc}
                    onChange={e => setEvidenceDesc(e.target.value)}
                    placeholder="e.g. Footprints spotted near rock shelter 1.2km north..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-sky-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submittingEvidence || !evidenceDesc.trim()}
                    className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition disabled:opacity-50"
                  >
                    {submittingEvidence ? 'Logging...' : 'Add Clue'}
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
