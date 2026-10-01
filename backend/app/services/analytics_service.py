from __future__ import annotations

from collections import Counter

from app.services.alert_service import list_alerts
from app.services.incident_service import list_incidents


def analytics_summary() -> dict[str, object]:
    incidents = list_incidents()
    alerts = list_alerts()
    counts = Counter(item["type"] for item in incidents)
    return {
        "incident_count": len(incidents),
        "incident_type_distribution": dict(counts),
        "alert_count": len(alerts),
        "high_risk_regions": ["Rudraprayag Valley", "Jungle Chatti"],
        "data_availability": "limited",
    }


def risk_analytics() -> dict[str, object]:
    return {
        "risk_trends": [
            {"label": "00:00", "score": 28},
            {"label": "06:00", "score": 42},
            {"label": "12:00", "score": 57},
            {"label": "18:00", "score": 68},
        ],
        "risk_level_distribution": {"LOW": 1, "ADVISORY": 3, "WARNING": 2, "CONFIRMED_EMERGENCY": 1},
        "data_availability": "partial",
    }
