import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  HeartHandshake, 
  MapPin, 
  Radio, 
  ShieldCheck, 
  LogOut, 
  KeyRound, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface ProfilePageProps {
  onNavigate: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, isCommander, setRole, logout, isGuest } = useAuth();
  const [commanderPin, setCommanderPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleSwitch = (targetRole: 'citizen' | 'commander') => {
    setPinError('');
    setSuccessMsg('');

    if (targetRole === 'commander') {
      if (commanderPin.trim() === '1070' || commanderPin.trim() === '9999' || commanderPin.trim() === '') {
        setRole('commander');
        setSuccessMsg('Switched to Rescue Command Center (EOC Ops).');
        setTimeout(() => onNavigate('rescue-dashboard'), 500);
      } else {
        setPinError('Invalid Commander PIN. (Demo PIN: 1070 or leave blank)');
      }
    } else {
      setRole('citizen');
      setSuccessMsg('Switched to Citizen & Trekker Mode.');
      setTimeout(() => onNavigate('home'), 500);
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-12">
      <section className="p-6 sm:p-8 rounded-3xl bg-alpine-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-600/20 border-2 border-sky-500/40 text-sky-400 font-extrabold text-2xl flex items-center justify-center shadow-inner">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {user?.name || 'Trekker Aditya'}
                </h1>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  isCommander
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : isGuest
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-sky-950 text-sky-300 border border-sky-800'
                }`}>
                  {isCommander ? 'EOC Commander' : isGuest ? 'Guest Mode' : 'Citizen Verified'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user?.email || 'aditya.trekker@peakshield.org'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-4 h-4 text-sky-400" />
            <span>Profile & Emergency Contacts</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">Primary Mobile Phone:</span>
              <div className="font-bold text-white font-mono">{user?.phone || '+91-98712-34567'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">Next of Kin / Emergency Contact:</span>
              <div className="font-bold text-emerald-400 font-mono">{user?.emergencyContact || '+91-94120-88990 (Spouse / Family)'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1">
              <span className="text-[11px] font-mono text-slate-400">Current Assigned Sector:</span>
              <div className="font-bold text-sky-300">{user?.currentSector || 'Kedarnath Valley Sector 3 (3,583m)'}</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-red-400" />
            <span>Alpine Medical & Rescue ID</span>
          </h2>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Blood Group:</span>
              <span className="font-bold text-white font-mono">O Positive (O+)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Known Allergies:</span>
              <span className="text-slate-300">None Recorded</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Critical Medication:</span>
              <span className="text-amber-400 font-medium">Asthmatic Inhaler Carried</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Distress Radio Beacon:</span>
              <span className="text-emerald-400 font-mono">Enabled (VHF 156.800)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-snug">
            Medical telemetry is cached on-device for first responders during offline rescue triage.
          </div>
        </div>
      </div>

      <section className="p-6 sm:p-8 rounded-3xl bg-alpine-900 border border-slate-800 shadow-2xl space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Switch System Operating Mode
          </h2>
          <p className="text-xs text-slate-400">
            PeakShield provides dedicated roles for everyday travelers and official disaster rescue forces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRoleSwitch('citizen')}
            className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
              !isCommander
                ? 'bg-sky-950/40 border-sky-500 text-white shadow-lg'
                : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Citizen & Trekker Mode</span>
                {!isCommander && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Risk telemetry, safe route comparison, 1-tap SOS, and mountain safety AI assistant.
              </p>
            </div>
          </button>

          <div className={`p-4 rounded-2xl border transition ${
            isCommander
              ? 'bg-red-950/40 border-red-500 text-white shadow-lg'
              : 'bg-slate-800/40 border-slate-700 text-slate-300'
          }`}>
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Rescue Command Center (EOC / SDRF)</span>
                  {isCommander && <CheckCircle2 className="w-4 h-4 text-red-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Incident dispatch, missing person intelligence, SAR team tracking, and SITREP generation.
                </p>
              </div>
            </div>

            {!isCommander && (
              <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>AUTHORIZATION PIN (DEMO: 1070 OR BLANK)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={commanderPin}
                    onChange={(e) => setCommanderPin(e.target.value)}
                    placeholder="Enter PIN"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRoleSwitch('commander')}
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
                  >
                    Authorize
                  </button>
                </div>
                {pinError && <p className="text-[10px] text-red-400">{pinError}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
