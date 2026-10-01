import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Building2, 
  Navigation, 
  Layers, 
  Info, 
  X, 
  CheckCircle2, 
  Compass, 
  CloudRain, 
  TrendingDown, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskZone, Incident, SafeShelter, RiskLevel } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { VerificationBadge } from '../common/VerificationBadge';

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

const createCustomIcon = (color: string, iconHtml: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        color: #ffffff;
      ">
        ${iconHtml}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

export const CitizenMap: React.FC = () => {
  const { riskZones, incidents, shelters, activeZone, setActiveZone, setSelectedIncident } = useEmergency();

  // Layer toggles
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showShelters, setShowShelters] = useState(true);

  // Selected item for slide-out inspection panel
  const [inspectedZone, setInspectedZone] = useState<RiskZone | null>(activeZone || riskZones[0] || null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [mapCenter, setMapCenter] = useState<[number, number]>([30.6558, 79.0321]);
  const [mapZoom, setMapZoom] = useState(11);

  const riskColors: Record<RiskLevel, string> = {
    LOW: '#10B981',
    ADVISORY: '#F59E0B',
    WARNING: '#F97316',
    EMERGENCY: '#EF4444',
  };

  const handleSelectZone = (zone: RiskZone) => {
    setInspectedZone(zone);
    setActiveZone(zone);
    setIsDrawerOpen(true);
    setMapCenter([zone.coordinates.lat, zone.coordinates.lng]);
    setMapZoom(12);
  };

  const resetToUserLocation = () => {
    setMapCenter([30.6558, 79.0321]);
    setMapZoom(11);
  };

  return (
    <div className="relative w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-6.5rem)] rounded-2xl overflow-hidden border border-slate-800 bg-alpine-950 flex flex-col md:flex-row shadow-2xl">
      
      {/* Floating Layer Controls (Top Left) */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap gap-2 max-w-[90vw]">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-alpine-950/95 border border-slate-700/90 shadow-2xl backdrop-blur-md">
          
          <button
            onClick={() => setShowRiskZones(!showRiskZones)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              showRiskZones
                ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={showRiskZones}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Risk Zones</span>
          </button>

          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              showIncidents
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={showIncidents}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Incidents</span>
          </button>

          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              showShelters
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={showShelters}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Shelters</span>
          </button>

          <button
            onClick={resetToUserLocation}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="Recenter Map to User Location"
            aria-label="Recenter Map to User Location"
          >
            <Navigation className="w-4 h-4 text-sky-400" />
          </button>

        </div>
      </div>

      {/* Map Canvas */}
      <div className="flex-1 w-full h-full relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <MapController center={mapCenter} zoom={mapZoom} />

          {/* Clean terrain map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* User Location Marker */}
          <Marker
            position={[30.6558, 79.0321]}
            icon={createCustomIcon(
              '#0284C7',
              `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`
            )}
          >
            <Popup>
              <div className="p-2 text-xs space-y-1">
                <div className="font-bold text-sky-400 font-mono">YOUR POSITION</div>
                <div className="text-white font-semibold">Kedarnath Valley (3,583m)</div>
                <div className="text-[10px] text-slate-300 font-mono">30.6558° N, 79.0321° E</div>
              </div>
            </Popup>
          </Marker>

          {/* Risk Area Buffer Circles & Markers */}
          {showRiskZones &&
            riskZones.map((zone) => (
              <React.Fragment key={zone.id}>
                <Circle
                  center={[zone.coordinates.lat, zone.coordinates.lng]}
                  radius={zone.radiusMeters}
                  pathOptions={{
                    color: riskColors[zone.level],
                    fillColor: riskColors[zone.level],
                    fillOpacity: zone.level === 'EMERGENCY' ? 0.25 : 0.15,
                    weight: 2,
                    dashArray: zone.level === 'EMERGENCY' ? '6, 6' : undefined,
                  }}
                  eventHandlers={{
                    click: () => handleSelectZone(zone),
                  }}
                />
                <Marker
                  position={[zone.coordinates.lat, zone.coordinates.lng]}
                  icon={createCustomIcon(
                    riskColors[zone.level],
                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
                  )}
                  eventHandlers={{
                    click: () => handleSelectZone(zone),
                  }}
                >
                  <Popup>
                    <div className="p-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white text-sm">{zone.name}</span>
                        <RiskBadge level={zone.level} size="sm" />
                      </div>
                      <div className="text-slate-300 text-[11px]">{zone.primaryHazard}</div>
                      <button
                        onClick={() => handleSelectZone(zone)}
                        className="w-full py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-center text-xs mt-1 transition"
                      >
                        Inspect Risk Factors
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}

          {/* Active Incidents Markers */}
          {showIncidents &&
            incidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.coordinates.lat, incident.coordinates.lng]}
                icon={createCustomIcon(
                  incident.severity === 'EMERGENCY' ? '#DC2626' : '#F97316',
                  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
                )}
                eventHandlers={{
                  click: () => setSelectedIncident(incident),
                }}
              >
                <Popup>
                  <div className="p-3 space-y-2 text-xs max-w-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-red-400 font-bold">{incident.type}</span>
                      <VerificationBadge state={incident.verificationState} size="sm" />
                    </div>
                    <div className="font-bold text-white text-xs">{incident.title}</div>
                    <div className="text-slate-300 text-[11px]">{incident.description}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Safe Shelters Markers */}
          {showShelters &&
            shelters.map((shelter) => (
              <Marker
                key={shelter.id}
                position={[shelter.coordinates.lat, shelter.coordinates.lng]}
                icon={createCustomIcon(
                  '#10B981',
                  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>`
                )}
              >
                <Popup>
                  <div className="p-3 space-y-1.5 text-xs max-w-xs">
                    <div className="font-bold text-white text-sm">{shelter.name}</div>
                    <div className="text-emerald-400 font-medium">{shelter.locationName}</div>
                    <div className="text-slate-300 text-[11px]">
                      Beds Available: {shelter.capacityAvailable} / {shelter.capacityTotal}
                    </div>
                    <div className="text-sky-300 font-mono text-[10px]">
                      Radio: {shelter.contactFreqKhz}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* Slide-out / Bottom Risk Inspection Drawer */}
      {inspectedZone && isDrawerOpen && (
        <aside 
          className="w-full md:w-96 bg-alpine-900 border-t md:border-t-0 md:border-l border-slate-800 p-5 overflow-y-auto z-10 flex flex-col justify-between shrink-0 shadow-2xl max-h-80 md:max-h-full"
          aria-label="Sector Risk Analysis Details"
        >
          <div className="space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  SECTOR RISK INTELLIGENCE
                </div>
                <h2 className="text-base font-bold text-white mt-0.5">{inspectedZone.name}</h2>
                <div className="text-xs text-slate-400">{inspectedZone.region}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <RiskBadge level={inspectedZone.level} showScore={inspectedZone.score} size="sm" />
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white md:hidden"
                  aria-label="Close Inspection Panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Crucial Distinction Note */}
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sky-300">PeakShield Intelligence Note:</strong> Multi-sensor hazard projection indicates high risk. Follow safety precautions below.
              </div>
            </div>

            {/* Why is this area risky? Detailed Factors */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Why is this area risky?
              </h3>
              
              <div className="space-y-2">
                
                {/* Factor 1: Rainfall */}
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">24h Accumulated Rainfall</span>
                    <span className="font-mono font-bold text-red-400">
                      {inspectedZone.factors.rainfallMm24h} mm
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, (inspectedZone.factors.rainfallMm24h / 80) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Factor 2: Landslide Susceptibility */}
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Slope Slip & Landslide Index</span>
                    <span className="font-mono font-bold text-orange-400">
                      {inspectedZone.factors.landslideSusceptibilityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full"
                      style={{ width: `${inspectedZone.factors.landslideSusceptibilityScore}%` }}
                    />
                  </div>
                </div>

                {/* Factor 3: Slope Angle */}
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Terrain Slope Angle</span>
                  <span className="font-mono font-bold text-white">
                    {inspectedZone.factors.slopeAngleDegrees}° Scree Slope
                  </span>
                </div>

                {/* Factor 4: Road Passability */}
                <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Road Passability</span>
                  <span className={`font-mono font-bold ${
                    inspectedZone.factors.roadPassabilityPercent < 30 ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {inspectedZone.factors.roadPassabilityPercent}% Passable
                  </span>
                </div>

              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-200">Analysis Summary:</div>
              <p className="text-slate-300 leading-relaxed text-[11px] bg-alpine-950 p-2.5 rounded-lg border border-slate-800">
                {inspectedZone.explanation}
              </p>
            </div>

            {/* Recommended Action */}
            <div className="space-y-1 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Recommended Action:</span>
              </div>
              <p className="text-slate-300 text-[11px] bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                {inspectedZone.recommendedAction}
              </p>
            </div>

          </div>

          {/* Provenance */}
          <div className="pt-3 mt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Source:</span>
              <span className="text-slate-300 truncate max-w-[180px]">{inspectedZone.source}</span>
            </div>
            <div className="flex justify-between">
              <span>Confidence:</span>
              <span className="text-emerald-400 font-bold">{inspectedZone.confidencePercent}%</span>
            </div>
          </div>

        </aside>
      )}

    </div>
  );
};
