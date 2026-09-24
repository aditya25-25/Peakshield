import React from 'react';
import { VerificationState } from '../../types';
import { Clock, ShieldCheck, AlertOctagon } from 'lucide-react';

interface VerificationBadgeProps {
  state: VerificationState;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ state, className = '' }) => {
  const configs: Record<VerificationState, { bg: string; text: string; border: string; icon: React.ReactNode; label: string }> = {
    SUBMITTED: {
      bg: 'bg-slate-800/80',
      text: 'text-slate-300',
      border: 'border-slate-700',
      icon: <Clock className="w-3 h-3 text-slate-400" />,
      label: 'Citizen Reported (Unverified)',
    },
    VERIFIED: {
      bg: 'bg-sky-950/80',
      text: 'text-sky-300',
      border: 'border-sky-700/60',
      icon: <ShieldCheck className="w-3 h-3 text-sky-400" />,
      label: 'Verified by Rangers / Drone',
    },
    CONFIRMED_EMERGENCY: {
      bg: 'bg-red-950/80',
      text: 'text-red-300',
      border: 'border-red-700/60',
      icon: <AlertOctagon className="w-3 h-3 text-red-400" />,
      label: 'Confirmed Disaster',
    },
  };

  const config = configs[state] || configs.SUBMITTED;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono border ${config.bg} ${config.text} ${config.border} ${className}`}
      title={`Status: ${config.label}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
