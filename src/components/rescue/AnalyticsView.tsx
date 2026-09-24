import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  CloudRain, 
  ShieldAlert, 
  Clock, 
  Compass, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

const RISK_TREND_DATA = [
  { time: '00:00', rainfallMm: 8.2, porePressureIndex: 32, riskScore: 38 },
  { time: '03:00', rainfallMm: 14.5, porePressureIndex: 44, riskScore: 48 },
  { time: '06:00', rainfallMm: 38.0, porePressureIndex: 68, riskScore: 72 },
  { time: '09:00', rainfallMm: 62.4, porePressureIndex: 88, riskScore: 85 },
  { time: '12:00', rainfallMm: 76.4, porePressureIndex: 92, riskScore: 88 },
  { time: '15:00', rainfallMm: 70.1, porePressureIndex: 89, riskScore: 84 },
  { time: '18:00', rainfallMm: 55.2, porePressureIndex: 81, riskScore: 76 },
];

const INCIDENT_TYPE_DATA = [
  { name: 'Landslides & Rockfall', count: 12, color: '#EF4444' },
  { name: 'Road Blockages', count: 8, color: '#F97316' },
  { name: 'Flash Floods', count: 5, color: '#38BDF8' },
  { name: 'Missing Person (SAR)', count: 3, color: '#A855F7' },
  { name: 'Trekker Injuries', count: 4, color: '#F59E0B' },
];

const REGIONAL_DISTRIBUTION = [
  { region: 'Kedarnath Valley', incidents: 14, riskIndex: 88 },
  { region: 'Chamoli / Joshimath', incidents: 9, riskIndex: 74 },
  { region: 'Pir Panjal / Rohtang', incidents: 6, riskIndex: 52 },
  { region: 'Upper Garhwal Mana', incidents: 3, riskIndex: 22 },
];

const RESPONSE_BENCHMARKS = [
  { category: 'AI Triage & Sensor Alert', timeMinutes: 1.2, targetMinutes: 2.0 },
  { category: 'Thermal UAV Recon Dispatch', timeMinutes: 12.0, targetMinutes: 15.0 },
  { category: 'SDRF Mountain Squad Deployment', timeMinutes: 34.0, targetMinutes: 40.0 },
  { category: 'BRO Heavy Machinery Mobilization', timeMinutes: 48.0, targetMinutes: 60.0 },
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-2 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statewide Mountain Hazard Analytics & Predictive Trends
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Hazard Correlation, Rainfall Load & Operational Metrics
            </h1>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            Telemetry Archive: Past 24 Hours
          </span>
        </div>
      </div>

      {/* Grid of Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: 24h Risk Score & Precipitation Load */}
        <div className="p-5 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              24-Hour Risk Index vs Rainfall Accumulation
            </h2>
            <span className="text-[10px] font-mono text-red-400">Peak at 12:00 (88/100)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RISK_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskScoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="rainfallGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontStyle="mono" />
                <YAxis stroke="#64748b" fontSize={11} fontStyle="mono" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b0f17', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="riskScore" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#riskScoreGrad)" name="Risk Score (/100)" />
                <Area type="monotone" dataKey="rainfallMm" stroke="#38BDF8" strokeWidth={2} fillOpacity={1} fill="url(#rainfallGrad)" name="Precipitation (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Composite Hazard Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span>Precipitation (mm)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Incidents by Type Distribution */}
        <div className="p-5 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-orange-400" />
              Reported Incidents Breakdown by Hazard Type
            </h2>
            <span className="text-[10px] font-mono text-slate-400">32 Total Incidents Logged</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INCIDENT_TYPE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {INCIDENT_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b0f17', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Regional Risk Comparison */}
        <div className="p-5 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Regional Hazard Concentration
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Garhwal vs Chamoli</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REGIONAL_DISTRIBUTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="region" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b0f17', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                />
                <Bar dataKey="riskIndex" fill="#F97316" radius={[4, 4, 0, 0]} name="Peak Hazard Index" />
                <Bar dataKey="incidents" fill="#0284C7" radius={[4, 4, 0, 0]} name="Active Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Response Times vs SLA Targets */}
        <div className="p-5 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              EOC Emergency Response Timelines (Minutes)
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">● 100% Within Target SLA</span>
          </div>

          <div className="space-y-3 pt-2">
            {RESPONSE_BENCHMARKS.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">{item.category}</span>
                  <span className="font-mono text-sky-300">
                    {item.timeMinutes} mins (Target: &lt;{item.targetMinutes} mins)
                  </span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(item.timeMinutes / item.targetMinutes) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
