import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { RiskZone, Incident, EmergencyAlert, WeatherSummary, SafeShelter } from '../types';
import { api } from '../services/api';

interface EmergencyContextType {
  isOnline: boolean;
  lastSyncTime: string;
  weather: WeatherSummary | null;
  riskZones: RiskZone[];
  incidents: Incident[];
  alerts: EmergencyAlert[];
  shelters: SafeShelter[];
  activeZone: RiskZone | null;
  selectedIncident: Incident | null;
  isReportModalOpen: boolean;
  isAmISafeModalOpen: boolean;
  isOfflineGuideOpen: boolean;
  unreadAlertsCount: number;
  overallSafetyScore: number;
  highestRiskLevel: 'LOW' | 'ADVISORY' | 'WARNING' | 'EMERGENCY';
  openReportModal: () => void;
  closeReportModal: () => void;
  openAmISafeModal: () => void;
  closeAmISafeModal: () => void;
  openOfflineGuide: () => void;
  closeOfflineGuide: () => void;
  setSelectedIncident: (inc: Incident | null) => void;
  setActiveZone: (zone: RiskZone | null) => void;
  refreshData: () => Promise<void>;
  markAlertsAsRead: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [shelters, setShelters] = useState<SafeShelter[]>([]);
  const [activeZone, setActiveZone] = useState<RiskZone | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isAmISafeModalOpen, setIsAmISafeModalOpen] = useState<boolean>(false);
  const [isOfflineGuideOpen, setIsOfflineGuideOpen] = useState<boolean>(false);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState<number>(1);

  const loadData = useCallback(async () => {
    try {
      const [w, rz, inc, alt, sh] = await Promise.all([
        api.getWeather(),
        api.getRiskZones(),
        api.getIncidents(),
        api.getAlerts(),
        api.getShelters(),
      ]);

      setWeather(w);
      setRiskZones(rz);
      setIncidents(inc);
      setAlerts(alt);
      setShelters(sh);
      if (rz.length > 0 && !activeZone) {
        setActiveZone(rz[0]);
      }
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Failed to load emergency data:', err);
    }
  }, [activeZone]);

  useEffect(() => {
    loadData();

    const handleOnline = () => {
      setIsOnline(true);
      loadData();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Auto-refresh pulse every 30s
    const interval = setInterval(loadData, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [loadData]);

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);
  const openAmISafeModal = () => setIsAmISafeModalOpen(true);
  const closeAmISafeModal = () => setIsAmISafeModalOpen(false);
  const openOfflineGuide = () => setIsOfflineGuideOpen(true);
  const closeOfflineGuide = () => setIsOfflineGuideOpen(false);

  const markAlertsAsRead = () => setUnreadAlertsCount(0);

  // Derive safety score and highest active risk
  const overallSafetyScore = 82; // 0-100 hazard index (higher = greater danger)
  const highestRiskLevel = alerts.some(a => a.level === 'EMERGENCY') ? 'EMERGENCY' : 'WARNING';

  return (
    <EmergencyContext.Provider
      value={{
        isOnline,
        lastSyncTime,
        weather,
        riskZones,
        incidents,
        alerts,
        shelters,
        activeZone,
        selectedIncident,
        isReportModalOpen,
        isAmISafeModalOpen,
        isOfflineGuideOpen,
        unreadAlertsCount,
        overallSafetyScore,
        highestRiskLevel,
        openReportModal,
        closeReportModal,
        openAmISafeModal,
        closeAmISafeModal,
        openOfflineGuide,
        closeOfflineGuide,
        setSelectedIncident,
        setActiveZone,
        refreshData: loadData,
        markAlertsAsRead
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within an EmergencyProvider');
  return context;
};
