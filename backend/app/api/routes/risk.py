from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Query

from app.services.risk_service import evaluate_risk
from app.services.weather_service import get_weather

router = APIRouter()


@router.get("/zones")
async def get_risk_zones() -> dict[str, Any]:
    return {
        "success": True,
        "data": [
            {
                "id": "zone-1",
                "name": "Rudraprayag Valley",
                "level": "WARNING",
                "score": 72,
                "coordinates": {"lat": 30.66, "lng": 79.03},
                "primaryHazard": "Debris flow",
                "explanation": "Heavy rainfall and unstable talus slopes increase debris risk.",
            },
            {
                "id": "zone-2",
                "name": "Jungle Chatti",
                "level": "ADVISORY",
                "score": 48,
                "coordinates": {"lat": 30.62, "lng": 79.11},
                "primaryHazard": "Slope instability",
                "explanation": "The zone is active but not confirmed as a severe emergency.",
            },
        ],
        "meta": {"count": 2},
    }


@router.get("/assess")
async def assess_risk(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
) -> dict[str, Any]:
    try:
        weather = await get_weather(latitude, longitude)
        risk = evaluate_risk(latitude, longitude, weather)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail={"code": "INVALID_LOCATION", "message": str(exc)}) from exc
    return {"success": True, "data": risk, "meta": {"weather_source": weather.get("source", "unknown")}}
