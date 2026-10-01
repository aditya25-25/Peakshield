from __future__ import annotations

from typing import Any

from fastapi import APIRouter

from app.schemas import AIRequest
from app.services.ai_service import generate_chat_answer, generate_copilot_summary

router = APIRouter()


@router.post("/chat")
async def ask_mountain(payload: AIRequest) -> dict[str, Any]:
    result = await generate_chat_answer(payload.question)
    return {"success": True, "data": result, "meta": {"message": "Safety guidance generated."}}


@router.post("/copilot")
async def emergency_copilot(payload: AIRequest) -> dict[str, Any]:
    result = await generate_copilot_summary(payload.question, payload.context or {})
    return {"success": True, "data": result, "meta": {"message": "Operations summary generated."}}
