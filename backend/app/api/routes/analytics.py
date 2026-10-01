from __future__ import annotations

from typing import Any

from fastapi import APIRouter

from app.services.analytics_service import analytics_summary, risk_analytics

router = APIRouter()


@router.get("/incidents")
async def incidents_analytics() -> dict[str, Any]:
    return {"success": True, "data": analytics_summary(), "meta": {"source": "incident_pipeline"}}


@router.get("/risk")
async def risk_analytics_route() -> dict[str, Any]:
    return {"success": True, "data": risk_analytics(), "meta": {"source": "risk_engine"}}
