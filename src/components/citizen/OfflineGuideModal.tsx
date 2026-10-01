import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Mountain, 
  ThermometerSnowflake, 
  Droplets, 
  Radio
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const OfflineGuideModal: React.FC = () => {
  const { isOfflineGuideModalOpen, closeOfflineGuideModal } = useEmergency();
  const [activeTopic, setActiveTopic] = useState<'landslide' | 'hypothermia' | 'flood' | 'radio'>('landslide');

  if (!isOfflineGuideModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offline-guide-title"
    >
      <div className="relative w-full max-w-2xl bg-alpine-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="offline-guide-title" className="text-base font-bold text-white tracking-wide">
                Pre-Cached Offline Survival Guide
              </h2>
              <p className="text-xs text-slate-400">
                Accessible without cellular network or satellite data
              </p>
            </div>
          </div>
          <button
            onClick={closeOfflineGuideModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close Offline Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Selection Tabs */}
        <div className="px-6 pt-4 flex gap-2 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTopic('landslide')}
            className={`pb-2 px-2 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTopic === 'landslide'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Landslides & Rockfall
          </button>

          <button
            onClick={() => setActiveTopic('hypothermia')}
            className={`pb-2 px-2 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTopic === 'hypothermia'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Hypothermia & Cold
          </button>

          <button
            onClick={() => setActiveTopic('flood')}
            className={`pb-2 px-2 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTopic === 'flood'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Flash Floods & Rivers
          </button>

          <button
            onClick={() => setActiveTopic('radio')}
            className={`pb-2 px-2 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              activeTopic === 'radio'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SOS Radio & Whistle
          </button>
        </div>

        {/* Content View */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-200">
          
          {activeTopic === 'landslide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Mountain className="w-4 h-4" />
                  <span>Landslide & Debris Flow Survival</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  If you hear a distant rumbling sound or notice small rocks trickling down the slabs:
                </p>
              </div>

              <ul className="space-y-3">
                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <strong className="text-white">Move Perpendicular to the Slide Path:</strong>
                    <p className="text-slate-300 mt-0.5">Never run downhill ahead of mud or rocks. Run laterally to either side onto rock promontories.</p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <strong className="text-white">Shelter Behind Solid Bedrock:</strong>
                    <p className="text-slate-300 mt-0.5">If trapped, curl into a tight ball, protect your head with your rugged backpack, and wedge behind large boulders.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTopic === 'hypothermia' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-2">
                <div className="font-bold text-sky-300 flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-4 h-4" />
                  <span>Exposure & Hypothermia Management</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Wind chill plummets core body temperature within 30 minutes if clothes are soaked.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <strong className="text-white">Block Wind & Swap Wet Layers:</strong>
                    <p className="text-slate-300 mt-0.5">Swap wet cotton for merino wool or synthetic fleece. Wrap in space blankets.</p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <strong className="text-white">Insulate from Frozen Ground:</strong>
                    <p className="text-slate-300 mt-0.5">Sit on your backpack or dry fir branches to prevent conductive heat loss.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTopic === 'radio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Alpine Radio & Distress Signals</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  In all Himalayan regions, maintain these standard monitored frequencies:
                </p>
              </div>

              <ul className="space-y-3">
                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <strong className="text-white">VHF 156.800 MHz (Channel 16):</strong>
                    <p className="text-slate-300 mt-0.5">Monitored by SDRF, NDRF, and Army command posts every 20 minutes past the hour.</p>
                  </div>
                </li>

                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <strong className="text-white">6 Whistle Blasts / Minute Standard:</strong>
                    <p className="text-slate-300 mt-0.5">6 sharp blasts, followed by 1 minute of silence. Answer from rescuers is 3 blasts per minute.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTopic === 'flood' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-2">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>Flash Flood & River Crossing</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Water surges can rise 2-4 meters within 5 minutes during glacial lake outbursts (GLOF) or cloudbursts.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <strong className="text-white">Climb at least 50 Meters Above River Bed:</strong>
                    <p className="text-slate-300 mt-0.5">Do not wait to confirm water color. Move up ridges immediately.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-alpine-950 flex justify-end">
          <button
            onClick={closeOfflineGuideModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
