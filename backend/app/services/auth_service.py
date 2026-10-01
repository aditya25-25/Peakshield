from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any

from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password

USER_DB: dict[str, dict[str, Any]] = {}


async def get_user_by_email(email: str) -> dict[str, Any] | None:
    return USER_DB.get(email.lower())


async def register_user(email: str, password: str, full_name: str, role: str = "USER") -> dict[str, Any]:
    normalized_email = email.strip().lower()
    if normalized_email in USER_DB:
        raise ValueError("User already exists")

    user = {
        "id": str(uuid.uuid4()),
        "email": normalized_email,
        "full_name": full_name.strip(),
        "hashed_password": hash_password(password),
        "role": role.upper(),
        "phone": None,
        "emergency_contact": None,
        "current_sector": None,
        "medical_notes": None,
        "created_at": datetime.utcnow().isoformat(),
    }
    USER_DB[normalized_email] = user
    return user


async def authenticate_user(email: str, password: str) -> dict[str, Any] | None:
    user = USER_DB.get(email.strip().lower())
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user


async def build_auth_response(user: dict[str, Any]) -> dict[str, Any]:
    access_token = create_access_token(user["email"])
    refresh_token = create_refresh_token(user["email"])
    return {
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"],
            "phone": user.get("phone"),
            "emergency_contact": user.get("emergency_contact"),
            "current_sector": user.get("current_sector"),
            "medical_notes": user.get("medical_notes"),
        },
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }
