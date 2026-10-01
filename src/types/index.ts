export type RiskLevel = 'LOW' | 'ADVISORY' | 'WARNING' | 'EMERGENCY';

export type VerificationState = 'SUBMITTED' | 'VERIFIED' | 'CONFIRMED_EMERGENCY';

export type IncidentType = 
  | 'LANDSLIDE' 
  | 'FLASH_FLOOD' 
  | 'ROAD_BLOCKAGE' 
  | 'ACCIDENT' 
  | 'MISSING_PERSON' 
  | 'OTHER';

export type IncidentStatus = 
  | 'REPORTED' 
  | 'DISPATCHED' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'RESPONDING' 
  | 'RESOLVED';

export type MissingPersonStatus = 'ACTIVE_SEARCH' | 'LOCATED' | 'CRITICAL';

export type UserRole = 'citizen' | 'commander';

export interface Coordinates {
  lat: number;
  lng: number;
  altitudeMeters?: number;
}

export interface WeatherData {
  temperatureC: number;
  condition: string;
  windSpeedKmh: number;
  humidityPercent: number;
  precipitationMm: number;
  visibilityKm: number;
  barometricPressureHpa?: number;
  freezeLevelMeters?: number;
  uvIndex?: number;
  forecastSummary?: string;
  lastUpdated?: string;
}

export type WeatherSummary = WeatherData;

export interface RiskZone {
  id: string;
  name: string;
  region: string;
  level: RiskLevel;
  score: number;
  coordinates: Coordinates;
  radiusMeters: number;
  primaryHazard: string;
  factors: {
    rainfallMm24h: number;
    landslideSusceptibilityScore: number;
    slopeAngleDegrees: number;
    roadPassabilityPercent: number;
    activeSeismicHistoryScore?: number;
    flashFloodIndex?: number;
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
  reporterContact?: string;
  assignedTeam?: string;
  createdAt: string;
  updatedAt: string;
  photoUrl?: string;
  peopleAtRiskCount?: number;
  casualtiesCount?: number;
  roadBlocked?: boolean;
}

export interface SafeShelter {
  id: string;
  name: string;
  locationName: string;
  coordinates: Coordinates;
  capacityTotal: number;
  capacityAvailable: number;
  hasMedicalKit: boolean;
  hasSatelliteComm: boolean;
  hasHeatedBunks?: boolean;
  hasHeatedShelter?: boolean;
  hasHelipad?: boolean;
  contactFreqKhz: string;
  contactPhone?: string;
  distanceKm?: number;
  type?: string;
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
  roadCondition: 'CLEAR' | 'CAUTION' | 'BLOCKED';
  hazardExposure: {
    landslideProneKm: number;
    floodProneKm: number;
    unpavedKm?: number;
    steepPassesCount?: number;
  };
  whyThisRoute: string;
  waypoints?: {
    name?: string;
    lat: number;
    lng: number;
    coordinates?: Coordinates;
    elevationMeters?: number;
    condition?: string;
  }[];
}

export interface MissingPersonCase {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  lastSeenLocation?: string;
  lastKnownLocation?: string;
  lastSeenCoordinates?: Coordinates;
  lastKnownCoordinates?: Coordinates;
  lastSeenTimestamp?: string;
  lastKnownTime?: string;
  reportingParty?: string;
  contactNumber?: string;
  physicalDescription?: string;
  clothingDescription?: string;
  description?: string;
  trekGroup?: string;
  terrainDifficulty?: string;
  searchRadiusKm?: number;
  searchPriority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: MissingPersonStatus;
  leadSearchTeam?: string;
  assignedTeams?: string[];
  evidenceLog: {
    id: string;
    timestamp: string;
    description: string;
    source: string;
  }[];
}

export interface EmergencyAlert {
  id: string;
  title: string;
  severity?: RiskLevel;
  level?: RiskLevel;
  sector?: string;
  region?: string;
  hazardType?: string;
  description: string;
  actionInstructions?: string;
  recommendedActions?: string[];
  sourceAgency?: string;
  isBroadcast?: boolean;
  issuedAt: string;
  expiresAt?: string;
  issuedBy?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
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

export interface EmergencySituationBrief {
  id: string;
  timestamp: string;
  region?: string;
  incidentCommander?: string;
  executiveSummary?: string;
  summary?: string;
  majorIncidentsSummary?: string[];
  keyHazards?: string[];
  highRiskZonesSummary?: {
    zoneName: string;
    riskLevel: RiskLevel;
    rainfall24h: number;
    criticalHazards: string;
  }[];
  weatherForecast?: string;
  recommendedEocActions?: string[];
  recommendedCommandActions?: string[];
  resourceDeployments?: string[];
  sourcesCited?: string[];
  generatedAt?: string;
  activeIncidentCount?: number;
  deployedTeamsCount?: number;
  evacuatedPersonsCount?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone: string;
  emergencyContact: string;
  role: UserRole;
  currentSector: string;
  medicalNotes?: string;
  isGuest?: boolean;
  authToken?: string;
}

