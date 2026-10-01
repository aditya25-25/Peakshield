from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Query

from app.services.weather_service import get_weather

router = APIRouter()


@router.get("/current")
async def weather_current(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
) -> dict[str, Any]:
    try:
        weather = await get_weather(latitude, longitude)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail={"code": "INVALID_LOCATION", "message": str(exc)}) from exc
    return {"success": True, "data": weather, "meta": {"source": weather.get("source", "unknown")}}
