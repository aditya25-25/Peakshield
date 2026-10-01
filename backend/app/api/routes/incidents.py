from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, status

from app.schemas import IncidentCreate
from app.services.incident_service import create_incident, list_incidents, update_incident_status

router = APIRouter()


@router.get("/")
async def get_incidents() -> dict[str, Any]:
    return {"success": True, "data": list_incidents(), "meta": {"count": len(list_incidents())}}


@router.post("/report")
async def report_incident(payload: IncidentCreate) -> dict[str, Any]:
    incident = create_incident(payload.model_dump())
    return {"success": True, "data": incident, "meta": {"message": "Incident reported successfully."}}


@router.get("/{incident_id}")
async def get_incident(incident_id: int) -> dict[str, Any]:
    for incident in list_incidents():
        if int(incident["id"]) == incident_id:
            return {"success": True, "data": incident}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"code": "INCIDENT_NOT_FOUND", "message": "Incident not found."})


@router.patch("/{incident_id}/status")
async def update_status(incident_id: int, payload: dict[str, Any]) -> dict[str, Any]:
    incident = update_incident_status(incident_id, payload)
    if incident is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"code": "INCIDENT_NOT_FOUND", "message": "Incident not found."})
    return {"success": True, "data": incident, "meta": {"message": "Status updated."}}
