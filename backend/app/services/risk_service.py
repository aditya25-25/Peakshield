from __future__ import annotations

from datetime import datetime
from typing import Any


def evaluate_risk(latitude: float, longitude: float, weather: dict[str, Any] | None = None) -> dict[str, Any]:
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        raise ValueError("The supplied coordinates are invalid.")

    rainfall = float((weather or {}).get("rainfall", 0) or 0)
    humidity = float((weather or {}).get("humidity", 0) or 0)
    wind_speed = float((weather or {}).get("wind_speed", 0) or 0)

    risk_score = min(100, int(18 + rainfall * 0.8 + humidity * 0.4 + wind_speed * 1.2))
    if risk_score >= 75:
        risk_level = "CONFIRMED_EMERGENCY"
    elif risk_score >= 50:
        risk_level = "WARNING"
    elif risk_score >= 30:
        risk_level = "ADVISORY"
    else:
        risk_level = "LOW"

    factors = {
        "rainfall_mm_24h": rainfall,
        "humidity_percent": humidity,
        "wind_speed_kmh": wind_speed,
        "slope_risk": max(0, min(100, int(risk_score * 0.7))),
    }

    explanation = (
        "Environmental conditions indicate elevated mountain risk due to sustained precipitation, "
        "reduced visibility, and strong wind exposure. This is a risk assessment, not a confirmed emergency; "
        "official verification is still required before declaring a disaster."
    )

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "contributing_factors": factors,
        "explanation": explanation,
        "source_data": weather or {"latitude": latitude, "longitude": longitude},
        "calculated_at": datetime.utcnow().isoformat(),
        "data_freshness": "fresh",
    }
