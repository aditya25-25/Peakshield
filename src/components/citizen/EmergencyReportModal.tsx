import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Mountain, 
  Car, 
  UserX, 
  Droplets,
  Info
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { IncidentType, RiskLevel, Incident } from '../../types';
import { api } from '../../services/api';

export const EmergencyReportModal: React.FC = () => {
  const { isReportModalOpen, closeReportModal, refreshData } = useEmergency();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);

  const [type, setType] = useState<IncidentType>('LANDSLIDE');
  const [locationName, setLocationName] = useState('Sonprayag Sector km 14 (Near Mandakini Bridge)');
  const [lat, setLat] = useState(30.6312);
  const [lng, setLng] = useState(78.9984);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<RiskLevel>('WARNING');
  const [peopleAtRisk, setPeopleAtRisk] = useState<number>(4);
  const [roadBlocked, setRoadBlocked] = useState(true);

  if (!isReportModalOpen) return null;

  const incidentTypes: { type: IncidentType; label: string; icon: React.ReactNode }[] = [
    { type: 'ACCIDENT', label: 'Accident / Slip', icon: <AlertTriangle className="w-4 h-4 text-red-400" /> },
    { type: 'FLASH_FLOOD', label: 'Flood / Surge', icon: <Droplets className="w-4 h-4 text-sky-400" /> },
    { type: 'LANDSLIDE', label: 'Landslide / Rockfall', icon: <Mountain className="w-4 h-4 text-orange-400" /> },
    { type: 'ROAD_BLOCKAGE', label: 'Road Blocked', icon: <Car className="w-4 h-4 text-amber-400" /> },
    { type: 'MISSING_PERSON', label: 'Missing Person', icon: <UserX className="w-4 h-4 text-purple-400" /> },
    { type: 'OTHER', label: 'Other Hazard', icon: <Flame className="w-4 h-4 text-slate-400" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const generatedTitle = title.trim() || `${type.replace('_', ' ')} reported near ${locationName}`;
      const generatedDesc = description.trim() || `Citizen report: ${type.replace('_', ' ')} with approx ${peopleAtRisk} persons exposed. Road blockage: ${roadBlocked ? 'YES' : 'NO'}.`;

      const result = await api.submitIncident({
        type,
        title: generatedTitle,
        description: generatedDesc,
        locationName,
        coordinates: { lat, lng, altitudeMeters: 2200 },
        severity,
        reportedBy: 'Citizen Trekker (Verified App User)',
        reporterContact: '+91-98712-34567',
        peopleAtRiskCount: peopleAtRisk,
        roadBlocked,
      });

      setCreatedIncident(result);
      setStep('success');
      await refreshData();
    } catch (err) {
      console.error('Error reporting incident:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setCreatedIncident(null);
    closeReportModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-base font-bold text-white tracking-wide">
                Report Mountain Emergency / Hazard
              </h2>
              <p className="text-xs text-slate-400">
                Direct dispatch pipeline to NDRF, SDRF & BRO Emergency Operations Centers
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Report Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
            
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-snug">
                <strong className="text-white">Emergency Verification Protocol:</strong> All citizen submissions are logged as <em>Community Report (In Review)</em> and forwarded to SDRF dispatchers for field verification.
              </div>
            </div>

            {/* 1. Hazard Type Picker */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                1. SELECT HAZARD CATEGORY
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {incidentTypes.map((item) => {
                  const isSelected = type === item.type;
                  return (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => setType(item.type)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-sky-600/20 border-sky-500 text-white font-bold shadow-sm'
                          : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {item.icon}
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Location & Coordinates */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  2. INCIDENT LOCATION
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setLocationName('Current GPS: Sector 3 Linchauli Ridge Track');
                    setLat(30.6558);
                    setLng(79.0321);
                  }}
                  className="text-[11px] text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Use Live GPS Coordinates</span>
                </button>
              </div>

              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. NH-107 Sonprayag km 14.2, Near bridge"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:border-sky-500 focus:outline-none"
              />
              <div className="text-[10px] font-mono text-slate-500">
                Coordinates: {lat.toFixed(4)}° N, {lng.toFixed(4)}° E (Auto-tagged)
              </div>
            </div>

            {/* 3. Severity & Impact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  ESTIMATED SEVERITY
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as RiskLevel)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                >
                  <option value="ADVISORY">Advisory (Caution needed)</option>
                  <option value="WARNING">Warning (High danger / Road blocked)</option>
                  <option value="EMERGENCY">Emergency (Life threat / Immediate rescue needed)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  PEOPLE AT RISK / STRANDED
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={peopleAtRisk}
                  onChange={(e) => setPeopleAtRisk(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 4. Road Blockage Checkbox */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">Is Road or Trekking Trail Blocked?</div>
                <div className="text-[11px] text-slate-400">Blocks passage for other trekkers or emergency responders</div>
              </div>
              <input
                type="checkbox"
                checked={roadBlocked}
                onChange={(e) => setRoadBlocked(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
            </div>

            {/* 5. Additional Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                DESCRIPTION & OBSERVATIONS (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe rock size, river water flow, visible casualties, or surrounding landmarks..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition text-xs flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                {submitting ? 'Transmitting Report...' : 'Submit Emergency Report'}
              </button>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/30 animate-in zoom-in">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Emergency Report Transmitted</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your report was registered with ID <strong className="font-mono text-sky-400">{createdIncident?.id}</strong> and routed to SDRF and disaster operations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Incident Category:</span>
                <span className="font-bold text-white">{createdIncident?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-medium text-slate-200">{createdIncident?.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification Status:</span>
                <span className="text-sky-400 font-medium">Community Report (Under SDRF Review)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
