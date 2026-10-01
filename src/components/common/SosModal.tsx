import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  Radio, 
  Copy, 
  Check, 
  ShieldAlert, 
  Flame, 
  Volume2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const SosModal: React.FC = () => {
  const { isSosModalOpen, closeSosModal } = useEmergency();
  const [copiedLocation, setCopiedLocation] = useState(false);

  if (!isSosModalOpen) return null;

  const currentCoords = '30.6558° N, 79.0321° E (Kedarnath Valley Sector 3, Alt: 3,583m)';

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(currentCoords);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2500);
  };

  const emergencyContacts = [
    {
      name: 'National Emergency Service (India)',
      number: '112',
      desc: 'All-India unified emergency dispatch',
      badge: 'Toll-Free 24/7',
    },
    {
      name: 'Uttarakhand SDRF Disaster Control Room',
      number: '1070',
      desc: 'State Disaster Response Force Mountain Operations',
      badge: 'State Mountain Rescue',
    },
    {
      name: 'District Disaster Management Authority (DDMA)',
      number: '1077',
      desc: 'Rudraprayag / Chamoli District Emergency Ops',
      badge: 'Local Incident Command',
    },
    {
      name: 'NDRF 8th Battalion Control HQ',
      number: '+91-11-24363260',
      desc: 'National Disaster Response Force Command Unit',
      badge: 'Heavy Rescue',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-red-500/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Urgent Header */}
        <div className="px-6 py-4 border-b border-red-500/30 bg-red-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-lg animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 id="sos-modal-title" className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Emergency SOS & Direct Rescue Links
              </h2>
              <p className="text-xs text-red-200">
                Direct connection to State & National Mountain Emergency Responders
              </p>
            </div>
          </div>
          <button
            onClick={closeSosModal}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Close Emergency SOS Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          
          {/* Location Transmission Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Your Live GPS Coordinates For Responders</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                GPS Fixed (±4m)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs sm:text-sm text-white font-bold flex items-center justify-between gap-2">
              <span className="break-all">{currentCoords}</span>
              <button
                onClick={handleCopyLocation}
                className="shrink-0 px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95"
              >
                {copiedLocation ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLocation ? 'Copied' : 'Copy GPS'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Read these coordinates when calling dispatchers or paste into SMS/satellite messager.
            </p>
          </div>

          {/* Emergency 1-Tap Dial Numbers */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>Direct Emergency Helpline Numbers</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.name}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-red-500/50 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {contact.badge}
                      </span>
                    </div>
                    <div className="font-bold text-white text-xs mb-1">{contact.name}</div>
                    <div className="text-slate-400 text-[11px] mb-3 leading-snug">{contact.desc}</div>
                  </div>

                  <a
                    href={`tel:${contact.number.replace(/\s+/g, '')}`}
                    className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {contact.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Radio & Distress Whistle Protocol */}
          <div className="p-4 rounded-xl bg-alpine-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>VHF Radio & Alpine Distress Whistle Protocols</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>International Alpine Whistle</span>
                </div>
                <p className="text-slate-300">
                  Blow whistle <strong>6 times in 1 minute</strong>. Pause for 1 minute. Repeat until located.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-sky-400" />
                  <span>Emergency VHF Frequency</span>
                </div>
                <p className="text-slate-300">
                  Tune transceiver to <strong>VHF 156.800 MHz</strong> (Channel 16) or <strong>UHF 433.500 MHz</strong>.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-alpine-950 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            PeakShield Emergency Bridge Active
          </span>
          <button
            onClick={closeSosModal}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};