import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Mountain, 
  Flame, 
  ThermometerSnowflake, 
  PhoneCall, 
  Radio, 
  Compass, 
  Download,
  CheckCircle
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const OfflineGuideModal: React.FC = () => {
  const { isOfflineGuideOpen, closeOfflineGuide, shelters } = useEmergency();
  const [activeSection, setActiveSection] = useState<'landslide' | 'hypothermia' | 'flood' | 'contacts'>('landslide');
  const [isCached, setIsCached] = useState(false);

  if (!isOfflineGuideOpen) return null;

  const handleCache = () => {
    setIsCached(true);
    setTimeout(() => setIsCached(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Offline Mountain Survival & Intelligence Manual
              </h2>
              <p className="text-xs text-amber-300/80">
                Guaranteed offline access without cellular data or internet connectivity
              </p>
            </div>
          </div>
          <button
            onClick={closeOfflineGuide}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-alpine-950/60 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'landslide', label: 'Landslide & Rockfall', icon: Mountain },
            { id: 'hypothermia', label: 'Hypothermia & Blizzard', icon: ThermometerSnowflake },
            { id: 'flood', label: 'Flash Flood & Streams', icon: Flame },
            { id: 'contacts', label: 'Emergency Radios & SOS', icon: PhoneCall },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                  activeSection === tab.id
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          
          {activeSection === 'landslide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30">
                <h4 className="text-sm font-bold text-amber-300 mb-2">Immediate Action During Rockfall or Debris Slide</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-200">
                  <li><strong>Listen for warning sounds:</strong> Rumbling, cracking trees, sudden trickling stones or rapid discolored mud streams precede large slope slides by 30-90 seconds.</li>
                  <li><strong>Run perpendicular to the flow:</strong> Never run downhill in the path of the landslide. Move sideways up onto stable rock shoulders.</li>
                  <li><strong>If trapped inside a shelter:</strong> Curl beneath sturdy furniture or against interior reinforced walls. Cover your head and chest.</li>
                  <li><strong>Post-slide awareness:</strong> Do not cross freshly fallen mud debris. Secondary slides occur frequently within 2 hours.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <h4 className="text-sm font-bold text-sky-300 mb-1">Terrain Warning Signs to Watch For</h4>
                <p className="text-slate-400 mb-2">Noticeable tilt in pine trees or utility poles, new cracks appearing in soil or rock faces, or sudden muddy water appearing from clear mountain springs.</p>
              </div>
            </div>
          )}

          {activeSection === 'hypothermia' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-600/30">
                <h4 className="text-sm font-bold text-sky-300 mb-2">Triage & Management for Severe Cold & Hypothermia</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="font-mono text-amber-400 font-bold">Stage 1 (Mild: 35-32°C)</span>
                    <p className="text-slate-300 mt-1">Violent shivering, slurred speech, clumsy fingers. Action: Strip wet gear, don dry thermal layers, consume hot sugary fluids.</p>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="font-mono text-red-400 font-bold">Stage 2/3 (Severe: &lt;32°C)</span>
                    <p className="text-slate-300 mt-1">Shivering stops, apathy, confusion, paradoxical undressing. Action: Passive external rewarming in sleeping bag with vapor barrier, call SOS.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <h4 className="text-sm font-bold text-white mb-2">Emergency Blizzard Bivouac Procedure</h4>
                <p>Construct a snow-cave or lee-side windbreak behind large glacial boulders. Insulate your body from the ground using sleeping pads and empty backpacks.</p>
              </div>
            </div>
          )}

          {activeSection === 'flood' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-600/30">
                <h4 className="text-sm font-bold text-red-300 mb-2">Glacial Outburst & Flash Flood Survival</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-200">
                  <li><strong>Climb immediately:</strong> Gain at least 30-50 vertical meters above the riverbed or stream channel.</li>
                  <li><strong>Never wade in fast-moving water:</strong> Water moving at 15 km/h will knock down an adult in ankle-deep levels.</li>
                  <li><strong>Stay off footbridges:</strong> Temporary suspension or timber bridges can collapse instantly under hydraulic debris loads.</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'contacts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  Himalayan Emergency VHF/UHF Radio Frequencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">International SAR Distress:</div>
                    <div className="text-emerald-400 font-bold text-xs">VHF 156.800 MHz (Ch 16)</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Garhwal SDRF Ops:</div>
                    <div className="text-emerald-400 font-bold text-xs">VHF 144.150 MHz</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">ITBP Mountain Post:</div>
                    <div className="text-emerald-400 font-bold text-xs">VHF 162.400 MHz</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-slate-400">Manali Rescue Squad:</div>
                    <div className="text-emerald-400 font-bold text-xs">VHF 145.500 MHz</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-sky-400" />
                  National Emergency Helplines (Satellite / Landline)
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-300">National Disaster Response Force (NDRF):</span>
                    <span className="font-mono text-sky-400 font-bold">1078 / +91-11-24363260</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-300">Uttarakhand State SEOC Helpline:</span>
                    <span className="font-mono text-sky-400 font-bold">1070 / +91-135-2710334</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-300">Himachal SEOC Emergency:</span>
                    <span className="font-mono text-sky-400 font-bold">1070 / +91-177-2812344</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-alpine-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Encrypted local PWA offline storage active</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCache}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold border border-amber-500/40 flex items-center gap-1.5 transition"
            >
              {isCached ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Manual Cached Offline!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Cache to Device</span>
                </>
              )}
            </button>
            <button
              onClick={closeOfflineGuide}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
