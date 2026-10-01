from __future__ import annotations

from datetime import datetime


ROUTE_OPTIONS = [
    {
        "id": "route-1",
        "name": "Main Valley Route",
        "origin": "Gaurikund",
        "destination": "Kedarnath",
        "distance_km": 18.6,
        "duration_minutes": 130,
        "risk_score": 67,
        "risk_level": "WARNING",
        "weather_conditions": "Heavy rain and limited visibility",
        "road_conditions": "Caution / partial blockage",
        "hazards": ["Landslide-prone slope", "River-side washout"],
        "explanation": "The valley route is exposed to debris flows and active rainfall. It is not considered safe simply because it remains passable.",
    },
    {
        "id": "route-2",
        "name": "High Ridge Alternative",
        "origin": "Gaurikund",
        "destination": "Kedarnath",
        "distance_km": 24.5,
        "duration_minutes": 170,
        "risk_score": 42,
        "risk_level": "ADVISORY",
        "weather_conditions": "Moderate precipitation, stronger wind",
        "road_conditions": "Caution",
        "hazards": ["Steep descent", "Loose scree"],
        "explanation": "This route is less exposed to riverbed hazards but still requires a careful weather and terrain assessment.",
    },
]


def check_route(origin: str, destination: str) -> dict[str, object]:
    return {
        "origin": origin,
        "destination": destination,
        "route_options": ROUTE_OPTIONS,
        "best_route": ROUTE_OPTIONS[1],
        "evaluated_at": datetime.utcnow().isoformat(),
    }
