import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  AlertOctagon, 
  Car, 
  Clock, 
  MapPin, 
  UserCheck, 
  Phone, 
  Send,
  Plus
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { Incident, IncidentStatus, VerificationState, RiskLevel } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { VerificationBadge } from '../common/VerificationBadge';
import { api } from '../../services/api';

export const IncidentManagement: React.FC = () => {
  const { incidents, refreshData, openReportModal } = useEmergency();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterVerification, setFilterVerification] = useState<string>('ALL');

  // Selected incident for slide-out dispatch drawer
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [updating, setUpdating] = useState(false);

  // Form inside drawer
  const [assignedTeam, setAssignedTeam] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<IncidentStatus>('IN_PROGRESS');
  const [selectedVerification, setSelectedVerification] = useState<VerificationState>('VERIFIED');

  const filteredIncidents = incidents.filter(inc => {
    if (filterSeverity !== 'ALL' && inc.severity !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && inc.status !== filterStatus) return false;
    if (filterVerification !== 'ALL' && inc.verificationState !== filterVerification) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inc.id.toLowerCase().includes(q) ||
        inc.title.toLowerCase().includes(q) ||
        inc.locationName.toLowerCase().includes(q) ||
        inc.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDrawer = (inc: Incident) => {
    setActiveIncident(inc);
    setAssignedTeam(inc.assignedTeam || 'NDRF 8th Battalion Team Delta');
    setSelectedStatus(inc.status);
    setSelectedVerification(inc.verificationState);
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeIncident) return;
    setUpdating(true);

    try {
      await api.updateIncidentStatus(
        activeIncident.id,
        selectedStatus,
        selectedVerification,
        assignedTeam
      );
      await refreshData();
      setActiveIncident(prev => prev ? {
        ...prev,
        status: selectedStatus,
        verificationState: selectedVerification,
        assignedTeam
      } : null);
      alert(`Incident ${activeIncident.id} operational status updated successfully.`);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      
      {/* Top Header & Search Bar */}
      <div className="p-6 rounded-2xl bg-alpine-900 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Operational Incident Dispatch & Triage Matrix
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Active Mountain Emergencies & Field Deployments
            </h1>
          </div>

          <button
            onClick={openReportModal}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-red transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Dispatch Record</span>
          </button>
        </div>

        {/* Filter & Search Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by ID, location, or keyword..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Filter Severity */}
          <select
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="EMERGENCY">Critical Emergency</option>
            <option value="WARNING">Warning</option>
            <option value="ADVISORY">Advisory</option>
            <option value="LOW">Low Risk</option>
          </select>

          {/* Filter Status */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="ALL">All Operational Statuses</option>
            <option value="REPORTED">Reported (Pending Triage)</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved / Closed</option>
          </select>

          {/* Filter Verification */}
          <select
            value={filterVerification}
            onChange={e => setFilterVerification(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="ALL">All Verification States</option>
            <option value="SUBMITTED">Citizen Reported (Unverified)</option>
            <option value="VERIFIED">Verified by Rangers / Drone</option>
            <option value="CONFIRMED_EMERGENCY">Confirmed Disaster</option>
          </select>

        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-alpine-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-alpine-950/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Case ID</th>
                <th className="py-3.5 px-4">Type & Title</th>
                <th className="py-3.5 px-4">Location Sector</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Unit</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No incidents match the active search criteria.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map(inc => (
                  <tr
                    key={inc.id}
                    onClick={() => handleOpenDrawer(inc)}
                    className="hover:bg-slate-800/50 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-400 whitespace-nowrap">
                      {inc.id}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate font-semibold text-white">
                      {inc.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 truncate max-w-[180px]">
                      {inc.locationName}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <RiskBadge level={inc.severity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <VerificationBadge state={inc.verificationState} />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                        inc.status === 'RESOLVED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inc.status === 'IN_PROGRESS'
                          ? 'bg-sky-950 text-sky-300 border border-sky-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 truncate max-w-[160px] font-mono text-[11px]">
                      {inc.assignedTeam || 'Unassigned'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDrawer(inc);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-semibold transition"
                      >
                        Dispatch / Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Incident Dispatch Drawer */}
      {activeIncident && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-alpine-900 border-l border-slate-700 h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800 bg-alpine-950 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  INCIDENT COMMAND DISPATCH CONTROL
                </div>
                <h2 className="text-base font-bold text-white mt-0.5">{activeIncident.id}</h2>
              </div>
              <button
                onClick={() => setActiveIncident(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Form */}
            <form onSubmit={handleUpdateStatus} className="p-6 space-y-5 text-xs flex-1">
              
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">{activeIncident.title}</div>
                <div className="text-slate-400 text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{activeIncident.locationName} (GPS: {activeIncident.coordinates.lat.toFixed(4)}°N, {activeIncident.coordinates.lng.toFixed(4)}°E)</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-mono text-[10px] text-slate-400 uppercase">FIELD REPORT DETAILS</div>
                <p className="text-slate-200 text-xs leading-relaxed">{activeIncident.description}</p>
                {activeIncident.peopleAtRiskCount !== undefined && (
                  <div className="text-red-400 font-mono text-[11px] pt-1">
                    Exposed / Stranded Persons: <strong>{activeIncident.peopleAtRiskCount}</strong>
                  </div>
                )}
              </div>

              {/* Operational Verification Upgrade */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Verification Level
                </label>
                <select
                  value={selectedVerification}
                  onChange={e => setSelectedVerification(e.target.value as VerificationState)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="SUBMITTED">Citizen Reported (Unverified)</option>
                  <option value="VERIFIED">Verified by Rangers / Drone Spotters</option>
                  <option value="CONFIRMED_EMERGENCY">Confirmed Disaster (Escalate to EOC Red Alert)</option>
                </select>
              </div>

              {/* Operational Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Response Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as IncidentStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="REPORTED">Reported (In Queue)</option>
                  <option value="DISPATCHED">Dispatched (En Route)</option>
                  <option value="IN_PROGRESS">In Progress (Active on Scene)</option>
                  <option value="RESOLVED">Resolved / Sector Cleared</option>
                  <option value="DISMISSED">Dismissed / False Alarm</option>
                </select>
              </div>

              {/* Task Force Assignment */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Assigned Response Unit
                </label>
                <input
                  type="text"
                  value={assignedTeam}
                  onChange={e => setAssignedTeam(e.target.value)}
                  placeholder="e.g. NDRF 8th Battalion Team Delta + BRO Taskforce 68"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:outline-none font-mono"
                />
              </div>

              {/* Reporting Details */}
              <div className="p-3.5 rounded-xl bg-alpine-950 border border-slate-800 space-y-1 text-slate-400 text-[11px] font-mono">
                <div>Reported By: <strong className="text-slate-200">{activeIncident.reportedBy}</strong></div>
                <div>Contact: <strong className="text-slate-200">{activeIncident.reporterContact || 'Direct Sat-App'}</strong></div>
                <div>Created: <strong className="text-slate-200">{activeIncident.createdAt}</strong></div>
              </div>

              {/* Submit Dispatch Update */}
              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveIncident(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2 rounded-xl bg-shield-blue hover:bg-sky-600 text-white font-bold transition shadow-sm disabled:opacity-50"
                >
                  {updating ? 'Updating EOC Matrix...' : 'Save & Dispatch Unit'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
