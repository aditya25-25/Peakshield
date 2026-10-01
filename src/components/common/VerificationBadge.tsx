import React from 'react';
import { VerificationState } from '../../types';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface VerificationBadgeProps {
  state: VerificationState;
  className?: string;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  state,
  className = '',
  size = 'md',
}) => {
  const configs: Record<
    VerificationState,
    {
      label: string;
      sub: string;
      bg: string;
      border: string;
      text: string;
      icon: React.ReactNode;
    }
  > = {
    SUBMITTED: {
      label: 'Community Report',
      sub: 'Unverified / In Review',
      bg: 'bg-slate-800/80',
      border: 'border-slate-700',
      text: 'text-slate-300',
      icon: <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />,
    },
    VERIFIED: {
      label: 'SDRF Field Verified',
      sub: 'Confirmed by Responders',
      bg: 'bg-sky-950/60',
      border: 'border-sky-500/50',
      text: 'text-sky-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />,
    },
    CONFIRMED_EMERGENCY: {
      label: 'Confirmed Emergency',
      sub: 'Active Incident Command',
      bg: 'bg-red-950/70',
      border: 'border-red-500/60',
      text: 'text-red-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 animate-pulse" />,
    },
  };

  const config = configs[state] || configs.SUBMITTED;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${config.bg} ${config.border} ${config.text} ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } font-medium ${className}`}
      title={`${config.label} - ${config.sub}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
