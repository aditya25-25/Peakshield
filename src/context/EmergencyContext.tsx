import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  WeatherData, 
  RiskZone, 
  Incident, 
  SafeShelter, 
  EmergencyAlert,
  MissingPersonCase,
  EmergencySituationBrief
} from '../types';
import { api } from '../services/api';
import { 
  MOCK_WEATHER, 
  MOCK_RISK_ZONES, 
  MOCK_INCIDENTS, 
  MOCK_SHELTERS, 
  MOCK_ALERTS, 
  MOCK_MISSING_PERSONS,
  MOCK_INITIAL_BRIEF 
} from '../services/mockData';

interface EmergencyContextType {
  weather: WeatherData | null;
  riskZones: RiskZone[];
  activeZone: RiskZone | null;
  setActiveZone: (zone: RiskZone | null) => void;
  incidents: Incident[];
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  shelters: SafeShelter[];
  alerts: EmergencyAlert[];
  missingPersons: MissingPersonCase[];
  situationBrief: EmergencySituationBrief | null;
  isOnline: boolean;
  lastSyncTime: string;
  refreshData: () => Promise<void>;
  
  // Modals state
  isAmISafeModalOpen: boolean;
  openAmISafeModal: () => void;
  closeAmISafeModal: () => void;

  isReportModalOpen: boolean;
  openReportModal: () => void;
  closeReportModal: () => void;

  isOfflineGuideModalOpen: boolean;
  openOfflineGuideModal: () => void;
  closeOfflineGuideModal: () => void;

  isSosModalOpen: boolean;
  openSosModal: () => void;
  closeSosModal: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(MOCK_WEATHER);
  const [riskZones, setRiskZones] = useState<RiskZone[]>(MOCK_RISK_ZONES);
  const [activeZone, setActiveZone] = useState<RiskZone | null>(MOCK_RISK_ZONES[0] || null);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [shelters, setShelters] = useState<SafeShelter[]>(MOCK_SHELTERS);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(MOCK_ALERTS);
  const [missingPersons, setMissingPersons] = useState<MissingPersonCase[]>(MOCK_MISSING_PERSONS);
  const [situationBrief, setSituationBrief] = useState<EmergencySituationBrief | null>(MOCK_INITIAL_BRIEF);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  // Modals
  const [isAmISafeModalOpen, setIsAmISafeModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isOfflineGuideModalOpen, setIsOfflineGuideModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  // Online / Offline Listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const refreshData = useCallback(async () => {
    try {
      const [w, rz, inc, sh, alt, mp, sb] = await Promise.all([
        api.getWeather(),
        api.getRiskZones(),
        api.getIncidents(),
        api.getShelters(),
        api.getAlerts(),
        api.getMissingPersons(),
        api.getSituationBrief(),
      ]);

      setWeather(w);
      setRiskZones(rz);
      if (rz.length > 0 && !activeZone) setActiveZone(rz[0]);
      setIncidents(inc);
      setShelters(sh);
      setAlerts(alt);
      setMissingPersons(mp);
      setSituationBrief(sb);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.warn('Network sync failed, retaining cached data:', err);
    }
  }, [activeZone]);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <EmergencyContext.Provider
      value={{
        weather,
        riskZones,
        activeZone,
        setActiveZone,
        incidents,
        selectedIncident,
        setSelectedIncident,
        shelters,
        alerts,
        missingPersons,
        situationBrief,
        isOnline,
        lastSyncTime,
        refreshData,
        isAmISafeModalOpen,
        openAmISafeModal: () => setIsAmISafeModalOpen(true),
        closeAmISafeModal: () => setIsAmISafeModalOpen(false),
        isReportModalOpen,
        openReportModal: () => setIsReportModalOpen(true),
        closeReportModal: () => setIsReportModalOpen(false),
        isOfflineGuideModalOpen,
        openOfflineGuideModal: () => setIsOfflineGuideModalOpen(true),
        closeOfflineGuideModal: () => setIsOfflineGuideModalOpen(false),
        isSosModalOpen,
        openSosModal: () => setIsSosModalOpen(true),
        closeSosModal: () => setIsSosModalOpen(false),
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
