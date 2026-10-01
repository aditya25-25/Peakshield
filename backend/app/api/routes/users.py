from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends

from app.api.deps import get_current_user

router = APIRouter()


@router.get("/")
async def list_users(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return {"success": True, "data": [{"id": current_user["id"], "email": current_user["email"], "role": current_user["role"]}], "meta": {"count": 1}}
