import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Radio, 
  KeyRound, 
  CheckCircle2, 
  Mountain 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';

interface LoginPageProps {
  onNavigate: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isCommanderLogin, setIsCommanderLogin] = useState(false);
  const [commanderPin, setCommanderPin] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (isCommanderLogin) {
      if (commanderPin.trim() !== '1070' && commanderPin.trim() !== '9999' && commanderPin.trim() !== '') {
        setError('Invalid Commander Authorization PIN. (Demo PIN: 1070 or leave blank)');
        return;
      }
    }

    setLoading(true);
    try {
      const res = await login(email, password, isCommanderLogin ? 'commander' : 'citizen');
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onNavigate(isCommanderLogin ? 'rescue-dashboard' : 'home');
        }, 600);
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('Connection to authentication gateway failed. Try continuing as Guest.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    onNavigate('home');
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-10 px-4 sm:px-6">
      <div className="relative w-full max-w-md bg-alpine-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo variant="primary" size="lg" showTagline />
          </div>
          <div className="pt-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access real-time mountain risk intelligence and route safety
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Login successful. Redirecting to your safety cockpit...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aditya.trekker@peakshield.org"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[11px] text-sky-400 hover:text-sky-300 transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-slate-200">Rescue Commander Access</span>
              </div>
              <input
                type="checkbox"
                checked={isCommanderLogin}
                onChange={(e) => setIsCommanderLogin(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
            </div>
            {isCommanderLogin && (
              <div className="pt-1.5 space-y-1">
                <label className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <KeyRound className="w-3 h-3" />
                  <span>AUTHORIZATION PIN (DEMO: 1070 OR BLANK)</span>
                </label>
                <input
                  type="password"
                  value={commanderPin}
                  onChange={(e) => setCommanderPin(e.target.value)}
                  placeholder="Enter Commander PIN"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Log In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-alpine-900 px-3 text-[11px] font-mono text-slate-500 uppercase">
            Or
          </span>
        </div>

        <div className="space-y-3 text-center">
          <button
            type="button"
            onClick={handleGuest}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs transition flex items-center justify-center gap-2"
          >
            <Mountain className="w-4 h-4 text-sky-400" />
            <span>Continue as Guest (Explore Safety Map)</span>
          </button>

          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-sky-400 hover:text-sky-300 font-bold transition ml-1"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
