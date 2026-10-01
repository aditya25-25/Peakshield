from __future__ import annotations

from fastapi import APIRouter

from app.api.routes import ai, alerts, analytics, auth, facilities, health, incidents, missing_persons, notifications, reports, risk, routes as route_routes, users, weather

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(weather.router, prefix="/weather", tags=["weather"])
api_router.include_router(risk.router, prefix="/risk", tags=["risk"])
api_router.include_router(route_routes.router, prefix="/routes", tags=["routes"])
api_router.include_router(incidents.router, prefix="/incidents", tags=["incidents"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(facilities.router, prefix="/facilities", tags=["facilities"])
api_router.include_router(missing_persons.router, prefix="/missing-persons", tags=["missing persons"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(health.router, tags=["health"])
