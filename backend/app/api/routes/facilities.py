from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Query

from app.services.facility_service import list_facilities, nearby_facilities

router = APIRouter()


@router.get("/")
async def get_facilities() -> dict[str, Any]:
    return {"success": True, "data": list_facilities(), "meta": {"count": len(list_facilities())}}


@router.get("/nearby")
async def get_nearby_facilities(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(25.0, gt=0),
) -> dict[str, Any]:
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        raise HTTPException(status_code=422, detail={"code": "INVALID_LOCATION", "message": "The supplied coordinates are invalid."})
    return {"success": True, "data": nearby_facilities(latitude, longitude, radius_km), "meta": {"radius_km": radius_km}}
