from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Query

from app.services.route_service import check_route

router = APIRouter()


@router.get("/")
async def list_routes(origin: str | None = Query(None), destination: str | None = Query(None)) -> dict[str, Any]:
    route = check_route(origin or "Gaurikund", destination or "Kedarnath")
    return {"success": True, "data": route["route_options"], "meta": {"best_route": route["best_route"], "evaluated_at": route["evaluated_at"]}}


@router.post("/check")
async def route_check(payload: dict[str, str]) -> dict[str, Any]:
    route = check_route(payload.get("origin", "Gaurikund"), payload.get("destination", "Kedarnath"))
    return {"success": True, "data": route, "meta": {"message": "Route analysis completed."}}
