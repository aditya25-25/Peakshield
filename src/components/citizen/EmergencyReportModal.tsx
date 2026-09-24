import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Mountain, 
  Car, 
  UserX, 
  Droplets,
  Share2,
  Copy
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { IncidentType, RiskLevel, Incident } from '../../types';
import { api } from '../../services/api';

export const EmergencyReportModal: React.FC = () => {
  const { isReportModalOpen, closeReportModal, refreshData } = useEmergency();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [createdIncident, setCreatedIncident] = useState<Incident | null>(null);

  // Form state
  const [type, setType] = useState<IncidentType>('LANDSLIDE');
  const [locationName, setLocationName] = useState('Sonprayag Sector km 14 (Near Mandakini Bridge)');
  const [lat, setLat] = useState(30.6312);
  const [lng, setLng] = useState(78.9984);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<RiskLevel>('WARNING');
  const [peopleAtRisk, setPeopleAtRisk] = useState<number>(4);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [roadBlocked, setRoadBlocked] = useState(true);

  if (!isReportModalOpen) return null;

  const incidentTypes: { type: IncidentType; label: string; icon: React.ReactNode }[] = [
    { type: 'LANDSLIDE', label: 'Landslide / Rockfall', icon: <Mountain className="w-4 h-4 text-orange-400" /> },
    { type: 'FLASH_FLOOD', label: 'Flash Flood / River Surge', icon: <Droplets className="w-4 h-4 text-sky-400" /> },
    { type: 'ROAD_BLOCKAGE', label: 'Road / Trail Blockage', icon: <Car className="w-4 h-4 text-amber-400" /> },
    { type: 'ACCIDENT', label: 'Trekker Injury / Slip', icon: <AlertTriangle className="w-4 h-4 text-red-400" /> },
    { type: 'MISSING_PERSON', label: 'Missing Person / Overdue', icon: <UserX className="w-4 h-4 text-purple-400" /> },
    { type: 'OTHER', label: 'Other Hazard', icon: <Flame className="w-4 h-4 text-slate-400" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const generatedTitle = title.trim() || `${type.replace('_', ' ')} reported near ${locationName}`;
      const generatedDesc = description.trim() || `Urgent citizen report: ${type.replace('_', ' ')} with approx ${peopleAtRisk} persons exposed. Road blockage: ${roadBlocked ? 'YES' : 'NO'}.`;

      const result = await api.submitIncident({
        type,
        title: generatedTitle,
        description: generatedDesc,
        locationName,
        coordinates: { lat, lng, altitudeMeters: 2200 },
        severity,
        reportedBy: 'Citizen Trekker (Verified App User)',
        reporterContact: '+91-98712-00000',
        photoUrl: photoPreview || undefined,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
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
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
            
            {/* Step 1: Choose Incident Type */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                1. Select Incident Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {incidentTypes.map(item => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setType(item.type)}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-left transition ${
                      type === item.type
                        ? 'bg-red-950/60 border-red-500 text-white font-bold shadow-glow-red/20'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Location & GPS */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>2. Location & Coordinates *</span>
                <span className="text-[10px] text-sky-400 font-normal">Auto-detected via GPS</span>
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  placeholder="e.g. Sonprayag 2km mark, near footbridge"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">LAT:</span>
                    <span className="text-white font-bold">{lat.toFixed(4)}° N</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">LNG:</span>
                    <span className="text-white font-bold">{lng.toFixed(4)}° E</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Details, Severity & People at Risk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Severity Assessment
                </label>
                <select
                  value={severity}
                  onChange={e => setSeverity(e.target.value as RiskLevel)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none font-medium"
                >
                  <option value="ADVISORY">Advisory (Minor obstruction / Caution)</option>
                  <option value="WARNING">Warning (Active danger / Path restricted)</option>
                  <option value="EMERGENCY">Emergency (Life threat / Immediate SAR required)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Estimated People Exposed / At Risk
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={peopleAtRisk}
                  onChange={e => setPeopleAtRisk(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                Incident Description & Hazards
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe current terrain condition, size of debris, trapped vehicles, injuries, or river levels..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Road Blocked Toggle & Photo Simulation */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-400" />
                <span className="text-slate-200 font-medium">Is the road / trail completely blocked?</span>
              </div>
              <input
                type="checkbox"
                checked={roadBlocked}
                onChange={e => setRoadBlocked(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded bg-slate-800 border-slate-700 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Crucial Verification Notice */}
            <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-600/30 text-[11px] text-slate-300 flex items-start gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sky-300">Verification Protocol:</strong> Your report will enter the PeakShield triage engine as <span className="font-mono text-white">SUBMITTED</span>. It will be verified by drone reconnaissance or ranger spotters before being escalated to a confirmed emergency.
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold flex items-center gap-2 shadow-glow-red transition disabled:opacity-50"
              >
                {submitting ? 'Transmitting to EOC...' : 'Transmit Emergency Report'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* Post-Submission Success State */
          <div className="p-6 md:p-8 space-y-6 text-xs text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-glow-emerald">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                TRANSMISSION CONFIRMED
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Report Successfully Logged in EOC Queue
              </h3>
              <div className="text-sm font-mono text-sky-400 font-bold mt-1">
                Tracking ID: {createdIncident?.id}
              </div>
            </div>

            {/* Verification State Progression */}
            <div className="p-4 rounded-xl bg-alpine-950 border border-slate-800 text-left space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Verification & Dispatch Pipeline
              </div>

              <div className="space-y-2">
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <div className="flex-1 flex justify-between">
                    <span className="font-bold text-slate-200">1. Citizen Report Logged</span>
                    <span className="font-mono text-emerald-400">SUBMITTED (Completed)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800 opacity-80">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  <div className="flex-1 flex justify-between">
                    <span className="font-bold text-slate-300">2. Drone / Field Spotter Verification</span>
                    <span className="font-mono text-amber-400">QUEUED FOR DRONE CHECK</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-900 border border-slate-800 opacity-60">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                  <div className="flex-1 flex justify-between">
                    <span className="font-bold text-slate-400">3. NDRF Task Force Dispatch</span>
                    <span className="font-mono text-slate-400">PENDING VERIFICATION</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`PeakShield Emergency SOS: Report ${createdIncident?.id} at Sonprayag (30.6312 N, 78.9984 E)`);
                  alert('Incident summary copied for SMS transmission.');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-2 transition"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Summary for SMS</span>
              </button>
              
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-xl bg-shield-blue hover:bg-sky-600 text-white font-bold transition shadow-sm"
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
