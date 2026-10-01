from __future__ import annotations

from typing import Any

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_missing_persons() -> dict[str, Any]:
    return {
        "success": True,
        "data": [{
            "id": 1,
            "name": "Nisha Bhatia",
            "status": "SEARCHING",
            "last_known_location": "Kedarnath trail segment",
            "search_priority": "HIGH",
            "assigned_team": "SAR Team 3",
        }],
        "meta": {"count": 1},
    }
