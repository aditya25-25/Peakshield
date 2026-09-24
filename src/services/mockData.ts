import { 
  RiskZone, 
  Incident, 
  MissingPersonCase, 
  EmergencyAlert, 
  RouteOption, 
  SafeShelter, 
  WeatherSummary,
  EmergencySituationBrief
} from '../types';

export const MOCK_WEATHER: WeatherSummary = {
  temperatureC: 4.2,
  condition: 'Heavy Alpine Rain & Mist',
  precipitationMm: 48.6,
  windSpeedKmh: 42,
  humidityPercent: 94,
  visibilityKm: 1.8,
  barometricPressureHpa: 712,
  freezeLevelMeters: 3800,
  uvIndex: 2
};

export const MOCK_RISK_ZONES: RiskZone[] = [
  {
    id: 'zone-01',
    name: 'Gaurikund - Jungle Chatti Sector',
    region: 'Garhwal Himalayas (Kedarnath Valley)',
    level: 'EMERGENCY',
    score: 88,
    coordinates: { lat: 30.6558, lng: 79.0321, altitudeMeters: 2350 },
    radiusMeters: 3500,
    primaryHazard: 'Imminent Debris Flow & Saturated Slope Slip',
    factors: {
      rainfallMm24h: 76.4,
      landslideSusceptibilityScore: 92,
      slopeAngleDegrees: 48,
      roadPassabilityPercent: 15,
      activeSeismicHistoryScore: 68,
      flashFloodIndex: 85,
    },
    explanation: 'Continuous heavy rainfall (76.4mm in 24h) combined with 48° weathered gneiss scree slope has exceeded critical pore-water pressure threshold. Debris slide detected 400m north of Jungle Chatti mule track.',
    recommendedAction: 'Immediate halt on pedestrian and mule traffic. Evacuate pilgrims to Kedarnath Base Camp 2 or Gaurikund Concrete Transit Shelter. Deploy SDRF spotters.',
    source: 'PeakShield Risk Fusion Engine (IMD Radar + GSI Terrain Model + SAR Satellite InSAR)',
    confidencePercent: 94,
    lastUpdated: '12 minutes ago'
  },
  {
    id: 'zone-02',
    name: 'Joshimath - Marwari Subsidence Belt',
    region: 'Chamoli District',
    level: 'WARNING',
    score: 74,
    coordinates: { lat: 30.5562, lng: 79.5654, altitudeMeters: 1890 },
    radiusMeters: 4200,
    primaryHazard: 'Bedrock Creep & Toe Erosion',
    factors: {
      rainfallMm24h: 38.2,
      landslideSusceptibilityScore: 78,
      slopeAngleDegrees: 34,
      roadPassabilityPercent: 55,
      activeSeismicHistoryScore: 72,
      flashFloodIndex: 40,
    },
    explanation: 'Alaknanda river toe erosion combined with groundwater surcharge has accelerated ground displacement to 3.2mm/day along the NH-07 bypass corridor.',
    recommendedAction: 'Restrict heavy commercial convoy movement. Continuous piezometer & tiltmeter monitoring. Station Border Roads Organisation (BRO) earthmovers on standby.',
    source: 'Uttarakhand State Disaster Management Authority + InSAR Displacement Stream',
    confidencePercent: 89,
    lastUpdated: '28 minutes ago'
  },
  {
    id: 'zone-03',
    name: 'Rohtang Pass North Ridge',
    region: 'Pir Panjal / Himachal',
    level: 'ADVISORY',
    score: 52,
    coordinates: { lat: 32.3716, lng: 77.2466, altitudeMeters: 3978 },
    radiusMeters: 6000,
    primaryHazard: 'Black Ice & Sudden High-Altitude Blizzard',
    factors: {
      rainfallMm24h: 18.0,
      landslideSusceptibilityScore: 35,
      slopeAngleDegrees: 28,
      roadPassabilityPercent: 70,
      activeSeismicHistoryScore: 25,
      flashFloodIndex: 20,
    },
    explanation: 'Drop in temperature below -2°C has created widespread black ice on serpentine switchbacks between Marhi and Rohtang Top.',
    recommendedAction: 'Only 4x4 vehicles with tire chains permitted between 06:00 and 16:00. Night travel suspended.',
    source: 'Himachal Traffic Police & Snow and Avalanche Study Establishment (SASE)',
    confidencePercent: 91,
    lastUpdated: '45 minutes ago'
  },
  {
    id: 'zone-04',
    name: 'Badrinath Mana Bypass Valley',
    region: 'Upper Garhwal',
    level: 'LOW',
    score: 22,
    coordinates: { lat: 30.7433, lng: 79.4938, altitudeMeters: 3100 },
    radiusMeters: 5000,
    primaryHazard: 'Minor Runoff / Controlled Drainage',
    factors: {
      rainfallMm24h: 8.5,
      landslideSusceptibilityScore: 18,
      slopeAngleDegrees: 20,
      roadPassabilityPercent: 95,
      activeSeismicHistoryScore: 15,
      flashFloodIndex: 12,
    },
    explanation: 'Normal alpine weather conditions. Highway surface dry with normal vehicle throughput. All culverts clear.',
    recommendedAction: 'Normal trek and transit permitted. Standard high-altitude precautions apply.',
    source: 'ITBP Sector Post 4 + District Administration',
    confidencePercent: 97,
    lastUpdated: '1 hour ago'
  }
];

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-8812',
    type: 'LANDSLIDE',
    title: 'Rockfall & Mudslide blocking NH-107 near Sonprayag',
    description: 'Boulders and liquefied mud slurry fell onto 60 meters of the main highway. 12 passenger vehicles stranded upstream. No confirmed casualties, 2 light vehicles damaged.',
    locationName: 'Sonprayag km 14.2 (NH-107)',
    coordinates: { lat: 30.6312, lng: 78.9984, altitudeMeters: 1820 },
    severity: 'EMERGENCY',
    status: 'IN_PROGRESS',
    verificationState: 'CONFIRMED_EMERGENCY',
    reportedBy: 'BRO Rapid Response Unit 4',
    assignedTeam: 'BRO Task Force 68 + SDRF Uttarakhand Unit 2',
    reporterContact: '+91-135-2748900',
    createdAt: '42 mins ago',
    updatedAt: '6 mins ago',
    roadBlocked: true,
    peopleAtRiskCount: 38,
    casualtiesCount: 0
  },
  {
    id: 'INC-2026-8809',
    type: 'MISSING_PERSON',
    title: 'Solo Trekker overdue on Kedartal High Trail',
    description: '28-year-old male trekker failed to report at Bhojbasa checkpoint after departing Gangotri yesterday at 06:30. Phone triangulation offline since 18:40 yesterday.',
    locationName: 'Kedartal Approach Ridge (Upper Bhagirathi)',
    coordinates: { lat: 30.9328, lng: 79.0345, altitudeMeters: 4320 },
    severity: 'WARNING',
    status: 'DISPATCHED',
    verificationState: 'VERIFIED',
    reportedBy: 'Gangotri Forest Checkpost Warden',
    assignedTeam: 'High Altitude Rescue Squad (HARS) + Drone Recon Alpha',
    reporterContact: '+91-1377-222104',
    createdAt: '3 hours ago',
    updatedAt: '18 mins ago',
    peopleAtRiskCount: 1
  },
  {
    id: 'INC-2026-8804',
    type: 'FLASH_FLOOD',
    title: 'Surge in Mandakini River Discharge at Rambara Site',
    description: 'Automatic stream-gauge triggered red threshold (340 cumecs). Low-lying temporary footbridge inundated by swirling currents. Trekker pathway diverted uphill.',
    locationName: 'Old Rambara Bridge Site',
    coordinates: { lat: 30.6845, lng: 79.0558, altitudeMeters: 2650 },
    severity: 'WARNING',
    status: 'IN_PROGRESS',
    verificationState: 'CONFIRMED_EMERGENCY',
    reportedBy: 'CWC Hydro Station Sensor #19',
    assignedTeam: 'NDRF 8th Battalion Team Delta',
    createdAt: '5 hours ago',
    updatedAt: '35 mins ago',
    roadBlocked: true,
    peopleAtRiskCount: 15
  },
  {
    id: 'INC-2026-8798',
    type: 'ROAD_BLOCKAGE',
    title: 'Fallen Conifer Trees and Slumped Retaining Wall',
    description: 'Three large Himalayan cedar trees uprooted during gusty thunderstorm across Govindghat-Ghangaria trail. Path restricted to single-file walking.',
    locationName: 'Govindghat 4km Marker (Valley of Flowers Trail)',
    coordinates: { lat: 30.6258, lng: 79.5821, altitudeMeters: 2150 },
    severity: 'ADVISORY',
    status: 'REPORTED',
    verificationState: 'VERIFIED',
    reportedBy: 'Local Trekking Guide Union',
    assignedTeam: 'Forest Department Clearance Crew',
    createdAt: '6 hours ago',
    updatedAt: '1 hour ago',
    roadBlocked: false,
    peopleAtRiskCount: 0
  },
  {
    id: 'INC-2026-8792',
    type: 'ACCIDENT',
    title: 'Mule train slip on steep wet shale turn',
    description: 'Two pack mules slipped down 15m embankment. Handlers safe, trail briefly congested. Handlers requesting rope winch assistance.',
    locationName: 'Linchauli Zig-Zag Step 42',
    coordinates: { lat: 30.7021, lng: 79.0624, altitudeMeters: 3120 },
    severity: 'ADVISORY',
    status: 'RESOLVED',
    verificationState: 'VERIFIED',
    reportedBy: 'Citizen Trekker via PeakShield App',
    assignedTeam: 'Animal Husbandry & SDRF Post Linchauli',
    createdAt: '8 hours ago',
    updatedAt: '2 hours ago',
    roadBlocked: false
  }
];

export const MOCK_MISSING_PERSONS: MissingPersonCase[] = [
  {
    id: 'SAR-2026-092',
    fullName: 'Arjun Verma',
    age: 28,
    gender: 'Male',
    trekGroup: 'Solo / Self-Supported',
    contactNumber: '+91-98712-44391',
    description: 'Wearing neon orange Gore-Tex jacket, charcoal mountaineering trousers, carrying 65L Osprey backpack with blue rain cover.',
    lastKnownLocation: 'Kedartal Ridge Marker 3.4km',
    lastKnownCoordinates: { lat: 30.9328, lng: 79.0345, altitudeMeters: 4320 },
    lastKnownTime: 'Yesterday, 18:40 IST',
    terrainDifficulty: 'GLACIAL',
    searchPriority: 'CRITICAL',
    status: 'ACTIVE_SEARCH',
    assignedTeams: ['ITBP Mountaineering Wing', 'Drone Recon Team Alpha (Thermal)', 'SDRF Uttarkashi'],
    searchRadiusKm: 4.8,
    evidenceLog: [
      {
        id: 'ev-1',
        timestamp: 'Today 07:15 IST',
        description: 'Thermal drone spotted reflective gear glint near Northwest scree funnel.',
        source: 'Drone Recon Alpha'
      },
      {
        id: 'ev-2',
        timestamp: 'Yesterday 18:40 IST',
        description: 'Last SMS ping captured by Bhojbasa cellular tower before battery drain.',
        source: 'BSNL Telecom Gateway'
      }
    ]
  },
  {
    id: 'SAR-2026-089',
    fullName: 'Priya Sundaram',
    age: 34,
    gender: 'Female',
    trekGroup: 'Bangalore Alpine Club (Separated from 6-member group)',
    contactNumber: '+91-99801-12844',
    description: 'Wearing turquoise shell jacket, black thermal beanie, trekking poles with red grips.',
    lastKnownLocation: 'Hampta Pass crossover near Shea Goru camp',
    lastKnownCoordinates: { lat: 32.2592, lng: 77.3481, altitudeMeters: 4190 },
    lastKnownTime: 'Today, 06:10 IST',
    terrainDifficulty: 'STEEP',
    searchPriority: 'HIGH',
    status: 'ACTIVE_SEARCH',
    assignedTeams: ['Manali Mountain Rescue Squad', 'Himachal Police SAR'],
    searchRadiusKm: 3.2,
    evidenceLog: [
      {
        id: 'ev-3',
        timestamp: 'Today 08:30 IST',
        description: 'Trek guide reported tracks heading south toward river crossing bridge.',
        source: 'Lead Guide Verification'
      }
    ]
  }
];

export const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: 'ALT-RED-001',
    title: 'RED ALERT: Flash Flood & Severe Landslide Warning (Kedarnath & Mandakini Basin)',
    level: 'EMERGENCY',
    hazardType: 'Flash Flood & Slope Failure',
    region: 'Rudraprayag & Chamoli Districts, Uttarakhand',
    description: 'Extreme orographic precipitation exceeding 70mm in 12 hours. Severe threat of debris torrents and sudden river surges in Mandakini, Alaknanda, and Bhagirathi catchments.',
    issuedAt: 'Today 06:00 IST',
    expiresAt: 'Today 22:00 IST',
    recommendedActions: [
      'Immediately move to designated reinforced concrete shelters at least 50m above riverbed.',
      'Do NOT attempt to cross flowing nullahs, streams, or mud-covered trail sections.',
      'Switch mobile devices to Ultra Battery Saver; listen to VHF Emergency Radio Channel 156.800 MHz.'
    ],
    sourceAgency: 'National Disaster Management Authority (NDMA) & IMD Dehradun',
    isBroadcast: true
  },
  {
    id: 'ALT-ORG-002',
    title: 'ORANGE ADVISORY: High-Altitude Gale & Blizzard Warning (Rohtang & Baralacha Passes)',
    level: 'WARNING',
    hazardType: 'Blizzard & Sub-Zero Drop',
    region: 'Manali - Leh Highway Corridor',
    description: 'Winds gusting up to 65 km/h with heavy freezing fog. Wind chill dropping effective temperature to -12°C. Severe hypothermia risk for open trekkers.',
    issuedAt: 'Today 04:30 IST',
    expiresAt: 'Tomorrow 12:00 IST',
    recommendedActions: [
      'Halt high pass crossings. Seek shelter at Keylong or Sissu staging facilities.',
      'Ensure multi-layer windproof clothing and thermal bivouac sacks.'
    ],
    sourceAgency: 'Himachal State Emergency Operations Centre (SEOC)',
    isBroadcast: true
  },
  {
    id: 'ALT-YEL-003',
    title: 'YELLOW ADVISORY: Intermittent Rockfall on NH-07 (Badrinath Highway)',
    level: 'ADVISORY',
    hazardType: 'Rockfall & Scree Rolling',
    region: 'Joshimath to Vishnuprayag Stretch',
    description: 'Minor loose stone falls triggered by morning seepage. Traffic regulated in one-way controlled convoys.',
    issuedAt: 'Today 08:00 IST',
    expiresAt: 'Today 18:00 IST',
    recommendedActions: [
      'Maintain 50m distance between vehicles.',
      'Strictly obey BRO traffic marshals and watch for falling debris on blind corners.'
    ],
    sourceAgency: 'Border Roads Organisation (Project Shivalik)',
    isBroadcast: false
  }
];

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: 'route-pri-1',
    name: 'Standard Valley Trail (Gaurikund ➔ Kedarnath via Rambara)',
    origin: 'Gaurikund Base Station (1,980m)',
    destination: 'Kedarnath Temple Complex (3,583m)',
    distanceKm: 16.4,
    durationMinutes: 380,
    elevationGainMeters: 1603,
    overallRiskLevel: 'EMERGENCY',
    riskScore: 89,
    roadCondition: 'BLOCKED',
    hazardExposure: {
      landslideProneKm: 4.8,
      floodProneKm: 2.3,
      steepPassesCount: 3
    },
    whyThisRoute: 'Active debris slide at Jungle Chatti + submerged Rambara footway. Not safe for transit under current 76mm/24h precipitation load.',
    waypoints: [
      { lat: 30.6558, lng: 79.0321 },
      { lat: 30.6712, lng: 79.0435 },
      { lat: 30.6845, lng: 79.0558 },
      { lat: 30.7346, lng: 79.0669 }
    ]
  },
  {
    id: 'route-alt-2',
    name: 'High-Ridge Evacuation By-Trail (Chirbasa Ridge Route)',
    origin: 'Gaurikund Base Station (1,980m)',
    destination: 'Kedarnath Temple Complex (3,583m)',
    distanceKm: 19.8,
    durationMinutes: 490,
    elevationGainMeters: 1820,
    overallRiskLevel: 'ADVISORY',
    riskScore: 48,
    roadCondition: 'CAUTION',
    hazardExposure: {
      landslideProneKm: 0.9,
      floodProneKm: 0.0,
      steepPassesCount: 5
    },
    whyThisRoute: 'Avoids riverbed flood zones completely by traversing stable granite ridge line. Physically strenuous but geologically secure from mudslides.',
    waypoints: [
      { lat: 30.6558, lng: 79.0321 },
      { lat: 30.6690, lng: 79.0210 },
      { lat: 30.7010, lng: 79.0390 },
      { lat: 30.7346, lng: 79.0669 }
    ]
  },
  {
    id: 'route-manali-leh',
    name: 'NH-03 Manali to Leh via Atal Tunnel & Keylong',
    origin: 'Manali (2,050m)',
    destination: 'Keylong / Jispa Staging (3,080m)',
    distanceKm: 78.5,
    durationMinutes: 140,
    elevationGainMeters: 1100,
    overallRiskLevel: 'ADVISORY',
    riskScore: 42,
    roadCondition: 'CLEAR',
    hazardExposure: {
      landslideProneKm: 1.2,
      floodProneKm: 0.2,
      steepPassesCount: 1
    },
    whyThisRoute: 'Atal Tunnel completely bypasses hazardous Rohtang blizzard summit. Route clear with standard wet-road caution.',
    waypoints: [
      { lat: 32.2432, lng: 77.1892 },
      { lat: 32.3598, lng: 77.1654 },
      { lat: 32.4821, lng: 77.1245 },
      { lat: 32.5714, lng: 77.0321 }
    ]
  }
];

export const MOCK_SHELTERS: SafeShelter[] = [
  {
    id: 'sh-01',
    name: 'NDRF Base Camp Linchauli Reinforced Transit Hub',
    type: 'NDRF_POST',
    locationName: 'Linchauli Sector 3 (3,150m)',
    coordinates: { lat: 30.7018, lng: 79.0612, altitudeMeters: 3150 },
    distanceKm: 2.1,
    capacityTotal: 450,
    capacityAvailable: 195,
    hasMedicalKit: true,
    hasSatelliteComm: true,
    hasHeatedShelter: true,
    hasHelipad: true,
    contactFreqKhz: 'VHF 156.800 MHz (Channel 16)',
    contactPhone: '+91-135-2748801'
  },
  {
    id: 'sh-02',
    name: 'Gaurikund GMVN Concrete Evacuation Center',
    type: 'COMMUNITY_CENTER',
    locationName: 'Gaurikund Upper Bus Stand (1,980m)',
    coordinates: { lat: 30.6542, lng: 79.0315, altitudeMeters: 1980 },
    distanceKm: 4.8,
    capacityTotal: 1200,
    capacityAvailable: 640,
    hasMedicalKit: true,
    hasSatelliteComm: true,
    hasHeatedShelter: true,
    hasHelipad: false,
    contactFreqKhz: 'VHF 144.150 MHz',
    contactPhone: '+91-1372-252110'
  },
  {
    id: 'sh-03',
    name: 'ITBP High-Altitude Medical Post Joshimath',
    type: 'ARMY_CAMP',
    locationName: 'Joshimath Cantonment (1,890m)',
    coordinates: { lat: 30.5582, lng: 79.5691, altitudeMeters: 1890 },
    distanceKm: 18.5,
    capacityTotal: 300,
    capacityAvailable: 120,
    hasMedicalKit: true,
    hasSatelliteComm: true,
    hasHeatedShelter: true,
    hasHelipad: true,
    contactFreqKhz: 'VHF 162.400 MHz',
    contactPhone: '+91-1389-222120'
  },
  {
    id: 'sh-04',
    name: 'Sissu Emergency Roadside Shelter Hub',
    type: 'MOUNTAIN_HUT',
    locationName: 'Sissu North Portal (3,120m)',
    coordinates: { lat: 32.4820, lng: 77.1250, altitudeMeters: 3120 },
    distanceKm: 34.0,
    capacityTotal: 250,
    capacityAvailable: 180,
    hasMedicalKit: true,
    hasSatelliteComm: false,
    hasHeatedShelter: true,
    hasHelipad: false,
    contactFreqKhz: 'VHF 145.500 MHz',
    contactPhone: '+91-1900-233201'
  }
];

export const MOCK_INITIAL_BRIEF: EmergencySituationBrief = {
  id: 'SITREP-2026-0924-001',
  timestamp: '24 Sep 2026, 10:30 IST',
  region: 'Uttarakhand High Himalayas (Kedarnath / Chamoli Sector)',
  incidentCommander: 'Col. Rajeshwar Singh (NDRF Incident Commander, Sector 4)',
  executiveSummary: 'Widespread orographic monsoon cloudburst activity detected across upper Mandakini and Alaknanda valleys. NH-107 blocked at Sonprayag km 14.2 due to active debris flow. Total 38 stranded persons identified, evacuation underway via high-ridge bypass. 1 critical high-altitude SAR operation active in Kedartal sector. All downstream river outposts placed on Stage 3 flood preparedness.',
  majorIncidentsSummary: [
    'INC-2026-8812: Massive rockfall/mudslide at Sonprayag km 14.2 (NH-107). 38 pilgrims sheltered; BRO earthmovers clearing debris.',
    'INC-2026-8809: Missing solo trekker (Arjun Verma) in Kedartal. Thermal drone reconnaissance active.',
    'INC-2026-8804: Mandakini discharge surge at Rambara (340 cumecs). Low footway closed; high-ridge bypass operational.'
  ],
  highRiskZonesSummary: [
    {
      zoneName: 'Gaurikund - Jungle Chatti Sector',
      riskLevel: 'EMERGENCY',
      rainfall24h: 76.4,
      criticalHazards: 'Saturated slope slip, 48° weathered scree slide'
    },
    {
      zoneName: 'Joshimath Subsidence Belt',
      riskLevel: 'WARNING',
      rainfall24h: 38.2,
      criticalHazards: 'Alaknanda toe erosion & NH-07 bypass displacement'
    }
  ],
  weatherForecast: 'Continued intermittent torrential downpours (30-50mm/hr intensity) through next 12 hours. Freezing level steady at 3,800m. Cloud ceiling below 400m AGL restricting air-evacuation sorties until 14:00 IST.',
  recommendedEocActions: [
    'Enforce complete transit curfew on Gaurikund valley trail.',
    'Activate high-ridge Chirbasa evacuation route with SDRF guides.',
    'Broadcast Emergency Alert ALT-RED-001 to all cellular base transceivers.',
    'Deploy secondary fuel & medical supplies to Linchauli Reinforced Transit Hub.'
  ],
  resourceDeployments: [
    'NDRF 8th Battalion: 4 teams (64 personnel) stationed across Sonprayag & Linchauli.',
    'SDRF Uttarakhand: 3 mountain rescue squads with rope winches.',
    'BRO Project Shivalik: 4 heavy JCB excavators and 2 wheel loaders on NH-107.',
    'UAV Surveillance Unit: 2 thermal DJI Matrice 350 RTK drones active over Kedartal.'
  ],
  sourcesCited: [
    'PeakShield Multi-Source Risk Fusion Engine v3.4',
    'India Meteorological Department (IMD) Dehradun Doppler Radar',
    'Geological Survey of India (GSI) Landslide Early Warning Stream',
    'Central Water Commission (CWC) Hydro Telemeter #19'
  ],
  generatedAt: '24 Sep 2026, 10:30:15 IST'
};
