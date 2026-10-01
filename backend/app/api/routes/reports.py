from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, status

from app.schemas import ReportCreate

router = APIRouter()


def _report_store() -> list[dict[str, Any]]:
    return [{
        "id": 1,
        "category": "LANDSLIDE",
        "description": "Loose ground and mudflow observed near trail siding.",
        "latitude": 30.655,
        "longitude": 79.032,
        "timestamp": "2026-10-01T12:00:00Z",
        "status": "SUBMITTED",
        "verification_state": "COMMUNITY",
    }]


@router.get("/")
async def list_reports() -> dict[str, Any]:
    return {"success": True, "data": _report_store(), "meta": {"count": len(_report_store())}}


@router.post("/")
async def create_report(payload: ReportCreate) -> dict[str, Any]:
    response = {
        "id": 2,
        "category": payload.category,
        "description": payload.description,
        "latitude": payload.latitude,
        "longitude": payload.longitude,
        "timestamp": payload.timestamp or "2026-10-01T12:00:00Z",
        "status": payload.status,
        "verification_state": payload.verification_state,
    }
    return {"success": True, "data": response, "meta": {"message": "Emergency report received."}}


@router.get("/{report_id}")
async def get_report(report_id: int) -> dict[str, Any]:
    reports = _report_store()
    for report in reports:
        if int(report["id"]) == report_id:
            return {"success": True, "data": report}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"code": "REPORT_NOT_FOUND", "message": "Report not found."})
