from __future__ import annotations

from datetime import datetime

NOTIFICATIONS: list[dict[str, object]] = [
    {
        "id": 1,
        "user_id": 1,
        "title": "Weather advisory",
        "message": "Moderate-to-heavy rainfall is active in your area. Maintain caution and monitor alerts.",
        "notification_type": "alert",
        "priority": "high",
        "status": "QUEUED",
        "created_at": datetime.utcnow().isoformat(),
    }
]


def list_notifications(user_id: int | None = None) -> list[dict[str, object]]:
    if user_id is None:
        return NOTIFICATIONS
    return [note for note in NOTIFICATIONS if int(note["user_id"]) == user_id]


def add_notification(user_id: int, title: str, message: str, priority: str = "normal") -> dict[str, object]:
    notification = {
        "id": len(NOTIFICATIONS) + 1,
        "user_id": user_id,
        "title": title,
        "message": message,
        "notification_type": "alert",
        "priority": priority,
        "status": "QUEUED",
        "created_at": datetime.utcnow().isoformat(),
    }
    NOTIFICATIONS.insert(0, notification)
    return notification
