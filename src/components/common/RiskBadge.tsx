import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showScore?: number;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showScore,
  className = ''
}) => {
  const configs: Record<RiskLevel, { bg: string; text: string; border: string; dot: string; label: string }> = {
    LOW: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400 shadow-glow-emerald',
      label: 'LOW RISK',
    },
    ADVISORY: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400 shadow-glow-amber',
      label: 'ADVISORY',
    },
    WARNING: {
      bg: 'bg-orange-500/15',
      text: 'text-orange-400',
      border: 'border-orange-500/40',
      dot: 'bg-orange-500 shadow-glow-orange animate-pulse',
      label: 'WARNING',
    },
    EMERGENCY: {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/50',
      dot: 'bg-red-500 shadow-glow-red animate-ping',
      label: 'CRITICAL EMERGENCY',
    },
  };

  const config = configs[level] || configs.LOW;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 font-semibold tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`h-2 w-2 rounded-full ${config.dot}`}></span>
      </span>
      <span>{config.label}</span>
      {showScore !== undefined && (
        <span className="ml-1 opacity-80 font-bold border-l border-current/30 pl-1.5">
          {showScore}/100
        </span>
      )}
    </span>
  );
};
