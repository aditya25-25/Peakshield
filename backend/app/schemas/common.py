from __future__ import annotations

from typing import Any

from pydantic import BaseModel


class ApiResponse(BaseModel):
    success: bool = True
    data: Any | None = None
    meta: dict[str, Any] | None = None


class ApiError(BaseModel):
    success: bool = False
    error: dict[str, str]
