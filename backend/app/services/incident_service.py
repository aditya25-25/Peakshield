from __future__ import annotations

from datetime import datetime

INCIDENTS = [
    {
        "id": 1,
        "title": "Debris flow near Sonprayag",
        "type": "LANDSLIDE",
        "severity": "WARNING",
        "location_name": "Sonprayag",
        "latitude": 30.656,
        "longitude": 79.032,
        "description": "Debris and mud flow has impacted the main corridor and is causing travel disruption.",
        "status": "IN_PROGRESS",
        "verification_state": "VERIFIED",
        "source": "official",
        "assigned_team": "Rescue Crew 12",
        "reported_by": 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    },
    {
        "id": 2,
        "title": "Road blockage at Jungle Chatti",
        "type": "ROAD_BLOCKAGE",
        "severity": "ADVISORY",
        "location_name": "Jungle Chatti",
        "latitude": 30.621,
        "longitude": 79.111,
        "description": "Partial road closure due to slope instability and debris accumulation.",
        "status": "ASSIGNED",
        "verification_state": "COMMUNITY",
        "source": "community",
        "assigned_team": "Road Ops",
        "reported_by": 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    },
]


def list_incidents() -> list[dict[str, object]]:
    return INCIDENTS


def create_incident(payload: dict[str, object]) -> dict[str, object]:
    incident = {
        **payload,
        "id": len(INCIDENTS) + 1,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
        "status": payload.get("status", "SUBMITTED"),
        "verification_state": payload.get("verification_state", "COMMUNITY"),
    }
    INCIDENTS.insert(0, incident)
    return incident


def update_incident_status(incident_id: int, patch: dict[str, object]) -> dict[str, object] | None:
    for incident in INCIDENTS:
        if int(incident["id"]) == incident_id:
            incident.update(patch)
            incident["updated_at"] = datetime.utcnow().isoformat()
            return incident
    return None
