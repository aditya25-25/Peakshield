from __future__ import annotations

from typing import Any


async def generate_copilot_summary(question: str, context: dict[str, Any] | None = None) -> dict[str, Any]:
    context = context or {}
    answer = (
        "PeakShield indicates elevated risk in the current route. Weather is unstable, rainfall is persistent, "
        "and the terrain remains susceptible to landslide and debris movement. This summary is decision support only, "
        "not an autonomous rescue dispatch."
    )
    return {
        "question": question,
        "answer": answer,
        "situation_summary": "Monitor route exposure and prepare shelter coordination.",
        "relevant_factors": ["rainfall", "road status", "risk zones"],
        "possible_actions": ["Move to higher ground if exposed", "Prepare route diversions", "Confirm shelter capacity"],
        "sources": ["weather_service", "risk_service", "alert_service"],
        "is_decision_support_only": True,
    }


async def generate_chat_answer(question: str) -> dict[str, Any]:
    normalized = question.lower()
    if "safe" in normalized:
        answer = "Current intelligence suggests caution rather than certainty. We do not have verified confirmation that all routes are safe. Please review the latest alerts before proceeding."
    elif "route" in normalized or "road" in normalized:
        answer = "The main valley route remains exposed to debris and washouts. Alternative ridge routes should be considered if conditions worsen."
    else:
        answer = "I can provide general mountain safety guidance, but verification is required before any decision involving travel or rescue coordination."
    return {"answer": answer, "source": "PeakShield RAG foundation", "verified": False}
