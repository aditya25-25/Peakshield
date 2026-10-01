from __future__ import annotations

import math

FACILITIES = [
    {"id": 1, "name": "Kedarnath Rescue Center", "facility_type": "rescue_center", "latitude": 30.7333, "longitude": 79.0667, "capacity": 80, "description": "Mountain rescue and emergency response center."},
    {"id": 2, "name": "Rudraprayag District Hospital", "facility_type": "hospital", "latitude": 30.2866, "longitude": 78.9839, "capacity": 200, "description": "Medical support and trauma care."},
    {"id": 3, "name": "Guptkashi Shelter Zone", "facility_type": "shelter", "latitude": 30.5339, "longitude": 79.0663, "capacity": 120, "description": "Temporary shelter and hot meal center."},
    {"id": 4, "name": "Joshimath Police Station", "facility_type": "police", "latitude": 30.5630, "longitude": 79.5662, "capacity": 40, "description": "Local police coordination and route control."},
]


def list_facilities() -> list[dict[str, object]]:
    return FACILITIES


def nearby_facilities(latitude: float, longitude: float, radius_km: float = 25.0) -> list[dict[str, object]]:
    nearby: list[dict[str, object]] = []
    for facility in FACILITIES:
        lat = float(facility["latitude"])
        lon = float(facility["longitude"])
        distance = haversine(latitude, longitude, lat, lon)
        if distance <= radius_km:
            facility_copy = dict(facility)
            facility_copy["distance_km"] = round(distance, 2)
            nearby.append(facility_copy)
    return sorted(nearby, key=lambda item: item["distance_km"])


def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    radius_km = 6371.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    return 2 * radius_km * math.asin(math.sqrt(a))
