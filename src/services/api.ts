import {
  RiskZone,
  Incident,
  MissingPersonCase,
  EmergencyAlert,
  RouteOption,
  SafeShelter,
  WeatherSummary,
  EmergencySituationBrief,
  AIChatMessage,
  IncidentStatus,
  VerificationState
} from '../types';

import {
  MOCK_WEATHER,
  MOCK_RISK_ZONES,
  MOCK_INCIDENTS,
  MOCK_MISSING_PERSONS,
  MOCK_ALERTS,
  MOCK_ROUTES,
  MOCK_SHELTERS,
  MOCK_INITIAL_BRIEF
} from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL || '';

// Local state caches for runtime simulation & offline storage
let inMemoryIncidents = [...MOCK_INCIDENTS];
let inMemoryMissingPersons = [...MOCK_MISSING_PERSONS];
let inMemoryAlerts = [...MOCK_ALERTS];
let inMemoryBrief = { ...MOCK_INITIAL_BRIEF };

// Load any persisted user-created incidents from localStorage
try {
  const saved = localStorage.getItem('peakshield_local_incidents');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryIncidents = [...parsed, ...MOCK_INCIDENTS.filter(m => !parsed.some((p: Incident) => p.id === m.id))];
    }
  }
} catch {
  // Ignore browser local storage errors
}

export const api = {
  // --- RISK ENGINE ---
  async getRiskZones(): Promise<RiskZone[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/risk/zones`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /risk/zones failed, falling back to local adapter:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve(MOCK_RISK_ZONES), 150));
  },

  async getWeather(lat = 30.6558, lng = 79.0321): Promise<WeatherSummary> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/risk/weather?lat=${lat}&lng=${lng}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /risk/weather failed, falling back to local adapter:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve(MOCK_WEATHER), 100));
  },

  // --- INCIDENTS ---
  async getIncidents(): Promise<Incident[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/incidents`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /incidents failed, falling back to local adapter:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve([...inMemoryIncidents]), 150));
  },

  async submitIncident(report: Omit<Incident, 'id' | 'createdAt' | 'updatedAt' | 'verificationState' | 'status'>): Promise<Incident> {
    const newIncident: Incident = {
      ...report,
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      status: 'REPORTED',
      verificationState: 'SUBMITTED', // Community report is initially SUBMITTED, not confirmed disaster
    };

    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/incidents/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newIncident),
        });
        if (res.ok) {
          const created = await res.json();
          inMemoryIncidents = [created, ...inMemoryIncidents];
          return created;
        }
      } catch (e) {
        console.warn('API /incidents/report failed, caching locally:', e);
      }
    }

    inMemoryIncidents = [newIncident, ...inMemoryIncidents];
    try {
      localStorage.setItem('peakshield_local_incidents', JSON.stringify(inMemoryIncidents));
    } catch {
      // Local storage quota fallback
    }
    return new Promise(resolve => setTimeout(() => resolve(newIncident), 300));
  },

  async updateIncidentStatus(id: string, status: IncidentStatus, verificationState?: VerificationState, assignedTeam?: string): Promise<Incident | null> {
    const target = inMemoryIncidents.find(i => i.id === id);
    if (!target) return null;

    target.status = status;
    if (verificationState) target.verificationState = verificationState;
    if (assignedTeam) target.assignedTeam = assignedTeam;
    target.updatedAt = 'Just now';

    if (API_BASE_URL) {
      try {
        await fetch(`${API_BASE_URL}/incidents/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, verificationState, assignedTeam }),
        });
      } catch (e) {
        console.warn('API update failed, updating local state:', e);
      }
    }

    return new Promise(resolve => setTimeout(() => resolve({ ...target }), 150));
  },

  // --- MISSING PERSONS (SAR) ---
  async getMissingPersons(): Promise<MissingPersonCase[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/missing-persons`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /missing-persons failed, falling back:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve([...inMemoryMissingPersons]), 150));
  },

  async addMissingPersonEvidence(caseId: string, description: string, source: string): Promise<MissingPersonCase | null> {
    const target = inMemoryMissingPersons.find(c => c.id === caseId);
    if (!target) return null;

    target.evidenceLog.unshift({
      id: `ev-${Date.now()}`,
      timestamp: 'Just now',
      description,
      source
    });

    return new Promise(resolve => setTimeout(() => resolve({ ...target }), 200));
  },

  // --- ALERTS ---
  async getAlerts(): Promise<EmergencyAlert[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/alerts`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /alerts failed, falling back:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve([...inMemoryAlerts]), 100));
  },

  // --- ROUTES ---
  async getRoutes(origin?: string, destination?: string): Promise<RouteOption[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/routes?origin=${origin || ''}&destination=${destination || ''}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /routes failed, falling back:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ROUTES), 150));
  },

  // --- SHELTERS ---
  async getShelters(): Promise<SafeShelter[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/shelters`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('API /shelters failed, falling back:', e);
      }
    }
    return new Promise(resolve => setTimeout(() => resolve(MOCK_SHELTERS), 100));
  },

  // --- AI ASK THE MOUNTAIN & RESCUE COPILOT ---
  async queryAI(prompt: string, role: 'citizen' | 'commander' = 'citizen'): Promise<AIChatMessage> {
    const lower = prompt.toLowerCase();
    
    // Realistic AI Intelligence Response Engine
    let text = '';
    let safetyAction = '';
    let factors: string[] = [];
    let level: 'LOW' | 'ADVISORY' | 'WARNING' | 'EMERGENCY' = 'ADVISORY';
    const sources = ['PeakShield Real-Time Risk Fusion', 'IMD Doppler Radar Feed', 'GSI Landslide Alert Stream'];

    if (lower.includes('safe') || lower.includes('risk near me') || lower.includes('am i safe')) {
      level = 'EMERGENCY';
      factors = ['Rainfall 76.4mm in 24h', 'Slope saturation index 92%', 'NH-107 blocked near Sonprayag'];
      text = 'CURRENT ASSESSMENT: HIGH DANGER LEVEL in Kedarnath & Jungle Chatti corridor. Severe debris slide active on the lower mule trail with 48° saturated scree failure.';
      safetyAction = 'DO NOT proceed down the valley path. Immediately seek refuge at Linchauli Reinforced Shelter or stay inside designated concrete GMVN shelters at higher elevation.';
    } else if (lower.includes('route') || lower.includes('road') || lower.includes('leh') || lower.includes('kedarnath')) {
      level = 'WARNING';
      factors = ['Rambara footbridge submerged', 'Chirbasa high-ridge bypass operational', 'Atal Tunnel clear'];
      text = 'ROUTE INTELLIGENCE: The standard Gaurikund-Kedarnath valley trail is BLOCKED at Sonprayag (km 14.2) and Rambara. The alternative High-Ridge Chirbasa track remains passable with caution.';
      safetyAction = 'If transit is urgent, use the Chirbasa Ridge Route in coordinated groups. Avoid the riverbed trail completely.';
    } else if (lower.includes('landslide') || lower.includes('what should i do')) {
      level = 'WARNING';
      factors = ['Debris flow speed 15-30 km/h', 'Ground vibration acoustic cues', 'Secondary slide danger'];
      text = 'LANDSLIDE SURVIVAL PROTOCOL: Move perpendicular to the flow of falling rocks and mud. If escape is impossible, curl into a tight ball protecting your head behind heavy stable rock outcrops.';
      safetyAction = 'Never cross moving mud slurry even if it appears shallow. Move to high ground immediately and broadcast your location.';
    } else if (lower.includes('shelter') || lower.includes('nearest safe')) {
      level = 'LOW';
      factors = ['Linchauli NDRF Post (2.1 km away)', 'Gaurikund Concrete Evacuation Center (4.8 km)'];
      text = 'NEAREST SAFE FACILITIES: Linchauli Sector 3 NDRF Post is 2.1km from your position. It is equipped with medical trauma kits, satellite communications (VHF 156.800 MHz), and heated bunking.';
      safetyAction = 'Head toward Linchauli Post. VHF Radio frequency 156.800 MHz is monitored 24/7.';
    } else if (lower.includes('rainfall') || lower.includes('6 hours') || lower.includes('command') || role === 'commander') {
      level = 'EMERGENCY';
      factors = ['Sonprayag: +34mm in last 4h', 'Joshimath: +18mm in last 4h', 'Freezing level: 3,800m AGL'];
      text = 'OPERATIONAL DECISION SUPPORT: Sonprayag automated rainfall sensor logged 34mm surge in the last 4 hours, breaching the critical slope threshold. 2 active debris slips confirmed along NH-107 corridor.';
      safetyAction = 'Command Recommendation: Issue Red Alert broadcast to Rudraprayag cell towers; deploy BRO Earthmover Unit 4 from Guptkashi staging depot.';
    } else {
      level = 'ADVISORY';
      factors = ['Himalayan Monsoon Active', 'High-altitude wind gust 42 km/h'];
      text = `PeakShield Mountain Safety Intelligence: Current conditions indicate unsettled alpine weather across Garhwal and Pir Panjal regions. Moderate-to-heavy precipitation active on windward slopes.`;
      safetyAction = 'Keep emergency satellite beacons active and stay updated via PeakShield offline cached protocols.';
    }

    const message: AIChatMessage = {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      safetyActionRecommendation: safetyAction,
      riskContext: {
        level,
        factors
      },
      sources,
      dataFreshness: 'Real-time telemetry (Sync: 2s ago)',
      isDecisionSupportOnly: role === 'commander'
    };

    return new Promise(resolve => setTimeout(() => resolve(message), 450));
  },

  // --- EMERGENCY SITUATION BRIEF (SITREP) ---
  async getSituationBrief(): Promise<EmergencySituationBrief> {
    return new Promise(resolve => setTimeout(() => resolve({ ...inMemoryBrief }), 200));
  },

  async regenerateBrief(): Promise<EmergencySituationBrief> {
    const refreshedBrief: EmergencySituationBrief = {
      ...inMemoryBrief,
      id: `SITREP-2026-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST',
      generatedAt: new Date().toLocaleTimeString('en-IN') + ' IST',
    };
    inMemoryBrief = refreshedBrief;
    return new Promise(resolve => setTimeout(() => resolve(refreshedBrief), 400));
  }
};
