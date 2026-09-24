import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  RefreshCw, 
  Share2, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  Copy,
  Clock,
  MapPin
} from 'lucide-react';
import { EmergencySituationBrief } from '../../types';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';

export const EmergencyBriefGenerator: React.FC = () => {
  const [brief, setBrief] = useState<EmergencySituationBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadBrief();
  }, []);

  const loadBrief = async () => {
    setLoading(true);
    try {
      const data = await api.getSituationBrief();
      setBrief(data);
    } catch (err) {
      console.error('Failed to load brief:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      const refreshed = await api.regenerateBrief();
      setBrief(refreshed);
    } catch (err) {
      console.error('Regeneration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    if (!brief) return;
    const text = `
# PEAKSHIELD EMERGENCY SITUATION BRIEF (SITREP)
**ID:** ${brief.id} | **Issued:** ${brief.timestamp}
**Commander:** ${brief.incidentCommander}
**Region:** ${brief.region}

## 1. Executive Summary
${brief.executiveSummary}

## 2. Major Active Incidents
${brief.majorIncidentsSummary.map(i => `- ${i}`).join('\n')}

## 3. Meteorological Forecast
${brief.weatherForecast}

## 4. Recommended EOC Actions
${brief.recommendedEocActions.map(a => `- ${a}`).join('\n')}

## 5. Resource Deployments
${brief.resourceDeployments.map(r => `- ${r}`).join('\n')}

## Sources
${brief.sourcesCited.join(', ')}
    `.trim();

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!brief) {
    return (
      <div className="p-12 text-center text-slate-400 text-xs">
        Compiling emergency situation brief...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Top Controls Bar (Hidden during Print) */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Emergency Situation Brief Generator (SITREP)
              </h1>
              <p className="text-xs text-slate-400">
                Official civil defense briefing for disaster authorities, NDRF, and government executive boards
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition disabled:opacity-50 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
              <span>Regenerate SITREP</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition border border-slate-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Markdown!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-red transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Official SITREP Document */}
      <article aria-label="Official Situation Report Document" className="p-8 sm:p-12 rounded-2xl bg-alpine-900 border border-slate-700 shadow-2xl space-y-8 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        
        {/* Document Header */}
        <div className="border-b-2 border-red-500/40 pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-red-400 print:text-red-700">
                GOVERNMENT OF UTTARAKHAND • STATE EMERGENCY OPERATIONS CENTER
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight mt-1">
                OPERATIONAL SITUATION REPORT (SITREP)
              </h2>
            </div>
            <div className="text-right font-mono text-xs text-slate-400 print:text-gray-600">
              <div>REPORT ID: <strong className="text-white print:text-black">{brief.id}</strong></div>
              <div>ISSUED: <strong className="text-white print:text-black">{brief.timestamp}</strong></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 text-slate-300 print:text-gray-700">
            <div>Jurisdiction: <strong>{brief.region}</strong></div>
            <div>Incident Commander: <strong>{brief.incidentCommander}</strong></div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section aria-label="Executive Summary" className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-red-400 print:text-red-700 uppercase tracking-wider flex items-center gap-2">
            <span>[1.0] EXECUTIVE SITUATION SUMMARY</span>
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed bg-slate-950/60 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300">
            {brief.executiveSummary}
          </p>
        </section>

        {/* Section 2: Major Active Incidents */}
        <section aria-label="Major Active Incidents" className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-orange-400 print:text-orange-700 uppercase tracking-wider">
            <span>[2.0] MAJOR ACTIVE FIELD EMERGENCIES</span>
          </h3>
          <div className="space-y-2">
            {brief.majorIncidentsSummary.map((incText, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-800/40 print:bg-gray-50 border border-slate-700/60 print:border-gray-300 text-xs">
                {incText}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: High Risk Zones Table */}
        <section aria-label="High-Risk Sector Threat Matrix" className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-amber-400 print:text-amber-700 uppercase tracking-wider">
            <span>[3.0] HIGH-RISK SECTOR THREAT MATRIX</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 print:border-gray-300">
              <thead className="bg-slate-950 print:bg-gray-200 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-2.5">Sector Zone</th>
                  <th className="p-2.5">Risk Level</th>
                  <th className="p-2.5">24h Precip</th>
                  <th className="p-2.5">Critical Ground Hazards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                {brief.highRiskZonesSummary.map((zone, idx) => (
                  <tr key={idx} className="bg-slate-900/40 print:bg-white">
                    <td className="p-2.5 font-bold text-white print:text-black">{zone.zoneName}</td>
                    <td className="p-2.5">
                      <RiskBadge level={zone.riskLevel} size="sm" />
                    </td>
                    <td className="p-2.5 font-mono text-sky-400 print:text-blue-700 font-bold">{zone.rainfall24h} mm</td>
                    <td className="p-2.5 text-slate-300 print:text-gray-700">{zone.criticalHazards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Weather & Air Support Forecast */}
        <section aria-label="Meteorological and Flight Operations Forecast" className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-sky-400 print:text-sky-700 uppercase tracking-wider">
            <span>[4.0] METEOROLOGICAL & AIR-SUPPORT FORECAST</span>
          </h3>
          <p className="text-xs leading-relaxed bg-slate-950/60 print:bg-gray-100 p-3.5 rounded-xl border border-slate-800 print:border-gray-300">
            {brief.weatherForecast}
          </p>
        </section>

        {/* Section 5: Mandatory EOC Actions */}
        <section aria-label="Mandatory EOC Directives" className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-emerald-400 print:text-emerald-700 uppercase tracking-wider">
            <span>[5.0] MANDATORY EOC DIRECTIVES & ACTIONS</span>
          </h3>
          <ul className="space-y-1.5 text-xs">
            {brief.recommendedEocActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-emerald-950/20 print:bg-emerald-50 p-2.5 rounded-lg border border-emerald-800/30 print:border-emerald-300">
                <span className="text-emerald-400 font-mono font-bold">[{idx + 1}]</span>
                <span className="text-slate-200 print:text-black font-medium">{action}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: Resource Deployments */}
        <section aria-label="Task Force & Equipment Deployments" className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-purple-400 print:text-purple-700 uppercase tracking-wider">
            <span>[6.0] TASK FORCE & EQUIPMENT DEPLOYMENTS</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {brief.resourceDeployments.map((res, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-800/40 print:bg-gray-50 border border-slate-700 print:border-gray-300">
                {res}
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Telemetry Provenance & Sources */}
        <div className="pt-4 border-t border-slate-800 print:border-gray-300 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 print:text-gray-600 gap-2">
          <div>Verified Telemetry Sources: {brief.sourcesCited.join(' • ')}</div>
          <div>PeakShield Multi-Source Risk Fusion v3.4</div>
        </div>

      </article>

    </div>
  );
};
