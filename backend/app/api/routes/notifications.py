from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Query

from app.services.notification_service import add_notification, list_notifications

router = APIRouter()


@router.get("/")
async def get_notifications(user_id: int | None = Query(None)) -> dict[str, Any]:
    return {"success": True, "data": list_notifications(user_id), "meta": {"count": len(list_notifications(user_id))}}


@router.post("/")
async def create_notification(user_id: int, title: str, message: str, priority: str = "normal") -> dict[str, Any]:
    note = add_notification(user_id, title, message, priority)
    return {"success": True, "data": note, "meta": {"message": "Notification queued."}}
