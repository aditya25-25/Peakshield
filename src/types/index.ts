export type RiskLevel = 'LOW' | 'ADVISORY' | 'WARNING' | 'EMERGENCY';

export type IncidentType = 
  | 'LANDSLIDE'
  | 'FLASH_FLOOD'
  | 'ACCIDENT'
  | 'MISSING_PERSON'
  | 'ROAD_BLOCKAGE'
  | 'AVALANCHE'
  | 'OTHER';

export type VerificationState = 'SUBMITTED' | 'VERIFIED' | 'CONFIRMED_EMERGENCY';

export type IncidentStatus = 'REPORTED' | 'DISPATCHED' | 'IN_PROGRESS' | 'RESOLVED' | 'DISMISSED';

export type UserRole = 'TREKKER' | 'INCIDENT_COMMANDER' | 'NDRF_OFFICER' | 'ADMIN';

export interface Coordinates {
  lat: number;
  lng: number;
  altitudeMeters?: number;
}

export interface RiskZone {
  id: string;
  name: string;
  region: string;
  level: RiskLevel;
  score: number; // 0 to 100
  coordinates: Coordinates;
  radiusMeters: number;
  primaryHazard: string;
  factors: {
    rainfallMm24h: number;
    landslideSusceptibilityScore: number; // 0-100
    slopeAngleDegrees: number;
    roadPassabilityPercent: number;
    activeSeismicHistoryScore: number;
    flashFloodIndex: number;
  };
  explanation: string;
  recommendedAction: string;
  source: string;
  confidencePercent: number;
  lastUpdated: string;
}

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  locationName: string;
  coordinates: Coordinates;
  severity: RiskLevel;
  status: IncidentStatus;
  verificationState: VerificationState;
  reportedBy: string;
  assignedTeam?: string;
  reporterContact?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  casualtiesCount?: number;
  peopleAtRiskCount?: number;
  roadBlocked?: boolean;
}

export interface MissingPersonCase {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  trekGroup: string;
  contactNumber: string;
  description: string;
  photoUrl?: string;
  lastKnownLocation: string;
  lastKnownCoordinates: Coordinates;
  lastKnownTime: string;
  terrainDifficulty: 'MODERATE' | 'STEEP' | 'GLACIAL' | 'HIGH_ALTITUDE';
  searchPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'ACTIVE_SEARCH' | 'LOCATED_SAFE' | 'MEDICAL_EVAC' | 'RECOVERED';
  assignedTeams: string[];
  evidenceLog: {
    id: string;
    timestamp: string;
    description: string;
    source: string;
  }[];
  searchRadiusKm: number;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  level: RiskLevel;
  hazardType: string;
  region: string;
  description: string;
  issuedAt: string;
  expiresAt: string;
  recommendedActions: string[];
  sourceAgency: string;
  isBroadcast: boolean;
  affectedCoordinates?: Coordinates[];
}

export interface RouteOption {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
  elevationGainMeters: number;
  overallRiskLevel: RiskLevel;
  riskScore: number;
  roadCondition: 'CLEAR' | 'CAUTION' | 'RESTRICTED' | 'BLOCKED';
  hazardExposure: {
    landslideProneKm: number;
    floodProneKm: number;
    steepPassesCount: number;
  };
  whyThisRoute: string;
  waypoints: Coordinates[];
}

export interface SafeShelter {
  id: string;
  name: string;
  type: 'NDRF_POST' | 'MOUNTAIN_HUT' | 'ARMY_CAMP' | 'COMMUNITY_CENTER' | 'MEDICAL_POST';
  locationName: string;
  coordinates: Coordinates;
  distanceKm?: number;
  capacityTotal: number;
  capacityAvailable: number;
  hasMedicalKit: boolean;
  hasSatelliteComm: boolean;
  hasHeatedShelter: boolean;
  hasHelipad: boolean;
  contactFreqKhz?: string;
  contactPhone?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  safetyActionRecommendation?: string;
  riskContext?: {
    level: RiskLevel;
    factors: string[];
  };
  sources?: string[];
  dataFreshness?: string;
  isDecisionSupportOnly?: boolean;
}

export interface WeatherSummary {
  temperatureC: number;
  condition: string;
  precipitationMm: number;
  windSpeedKmh: number;
  humidityPercent: number;
  visibilityKm: number;
  barometricPressureHpa: number;
  freezeLevelMeters: number;
  uvIndex: number;
}

export interface EmergencySituationBrief {
  id: string;
  timestamp: string;
  region: string;
  incidentCommander: string;
  executiveSummary: string;
  majorIncidentsSummary: string[];
  highRiskZonesSummary: {
    zoneName: string;
    riskLevel: RiskLevel;
    rainfall24h: number;
    criticalHazards: string;
  }[];
  weatherForecast: string;
  recommendedEocActions: string[];
  resourceDeployments: string[];
  sourcesCited: string[];
  generatedAt: string;
}
