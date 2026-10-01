from __future__ import annotations

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "peakshield-api"}


@router.get("/health/ready")
async def ready() -> dict[str, str]:
    return {"status": "ready", "database": "ok", "external_dependencies": "degraded_mode"}
