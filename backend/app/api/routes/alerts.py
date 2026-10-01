from __future__ import annotations

from typing import Any

from fastapi import APIRouter

from app.services.alert_service import list_alerts

router = APIRouter()


@router.get("/")
async def get_alerts() -> dict[str, Any]:
    return {"success": True, "data": list_alerts(), "meta": {"count": len(list_alerts())}}
