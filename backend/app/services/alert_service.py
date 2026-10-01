from __future__ import annotations

from datetime import datetime, timedelta

ACTIVE_ALERTS = [
    {
        "id": 1,
        "title": "Heavy Rainfall Warning",
        "alert_type": "WARNING",
        "severity": "WARNING",
        "description": "Persistent rain over the upper valley can trigger debris flows and road washouts.",
        "source": "India Meteorological Department",
        "source_url": "https://example.com/imd-alert",
        "location": "Rudraprayag Valley",
        "latitude": 30.66,
        "longitude": 79.03,
        "issued_at": (datetime.utcnow() - timedelta(hours=2)).isoformat(),
        "expires_at": (datetime.utcnow() + timedelta(hours=6)).isoformat(),
        "verification_status": "VERIFIED",
    },
    {
        "id": 2,
        "title": "Road Closure Advisory",
        "alert_type": "ADVISORY",
        "severity": "ADVISORY",
        "description": "Alternate routes are advised for landslide-prone segments on NH-107.",
        "source": "District administration",
        "source_url": "https://example.com/road-alert",
        "location": "NH-107 corridor",
        "latitude": 30.58,
        "longitude": 79.11,
        "issued_at": (datetime.utcnow() - timedelta(hours=5)).isoformat(),
        "expires_at": (datetime.utcnow() + timedelta(hours=12)).isoformat(),
        "verification_status": "VERIFIED",
    },
]


def list_alerts() -> list[dict[str, object]]:
    return ACTIVE_ALERTS
