import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showScore?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showScore,
  size = 'md',
  className = '',
}) => {
  const configs: Record<
    RiskLevel,
    {
      label: string;
      subLabel: string;
      bg: string;
      border: string;
      text: string;
      badgeBg: string;
      icon: React.ReactNode;
    }
  > = {
    LOW: {
      label: 'Low Risk',
      subLabel: 'Normal Safety',
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      badgeBg: 'bg-emerald-500/20 text-emerald-300',
      icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />,
    },
    ADVISORY: {
      label: 'Advisory',
      subLabel: 'Monitor Weather',
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/40',
      text: 'text-amber-300',
      badgeBg: 'bg-amber-500/20 text-amber-300',
      icon: <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />,
    },
    WARNING: {
      label: 'Warning',
      subLabel: 'High Hazard Threat',
      bg: 'bg-orange-950/40',
      border: 'border-orange-500/40',
      text: 'text-orange-300',
      badgeBg: 'bg-orange-500/20 text-orange-300',
      icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-orange-400" />,
    },
    EMERGENCY: {
      label: 'Emergency',
      subLabel: 'Critical Danger',
      bg: 'bg-red-950/60',
      border: 'border-red-500/60',
      text: 'text-red-200',
      badgeBg: 'bg-red-500/30 text-red-200',
      icon: <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-400 animate-pulse" />,
    },
  };

  const config = configs[level] || configs.LOW;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  };

  return (
    <span
      role="status"
      aria-label={`Risk Level: ${config.label}${showScore !== undefined ? `, Score ${showScore} of 100` : ''}`}
      className={`inline-flex items-center font-medium rounded-lg border ${config.bg} ${config.border} ${config.text} ${sizeClasses[size]} ${className}`}
    >
      {config.icon}
      <span className="font-semibold tracking-wide">{config.label}</span>
      {showScore !== undefined && (
        <span
          className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${config.badgeBg}`}
        >
          {showScore}/100
        </span>
      )}
    </span>
  );
};
