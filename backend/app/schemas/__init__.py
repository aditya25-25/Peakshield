from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field, field_validator


class UserRead(BaseModel):
    id: str | int
    email: str
    full_name: str
    role: str = "USER"
    phone: str | None = None
    emergency_contact: str | None = None
    current_sector: str | None = None
    medical_notes: str | None = None


class UserCreate(BaseModel):
    email: str
    password: str = Field(min_length=8)
    full_name: str = Field(min_length=2)
    role: str = "USER"

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if "@" not in value:
            raise ValueError("Email is invalid")
        return value.lower()


class AuthToken(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    user: UserRead
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: str
    password: str


class WeatherRead(BaseModel):
    temperature: float | None = None
    feels_like: float | None = None
    humidity: float | None = None
    pressure: float | None = None
    wind_speed: float | None = None
    wind_direction: float | None = None
    visibility: float | None = None
    rainfall: float | None = None
    snowfall: float | None = None
    weather_condition: str | None = None
    latitude: float
    longitude: float
    source: str
    timestamp: str
    is_stale: bool = False


class RiskRead(BaseModel):
    risk_score: int
    risk_level: str
    contributing_factors: dict[str, Any]
    explanation: str
    source_data: dict[str, Any]
    calculated_at: str
    data_freshness: str


class IncidentCreate(BaseModel):
    title: str
    type: str
    severity: str = "WARNING"
    location_name: str
    latitude: float
    longitude: float
    description: str
    assigned_team: str | None = None
    status: str = "SUBMITTED"
    verification_state: str = "COMMUNITY"

    @field_validator("latitude")
    @classmethod
    def validate_latitude(cls, value: float) -> float:
        if not (-90 <= value <= 90):
            raise ValueError("Latitude must be between -90 and 90")
        return value

    @field_validator("longitude")
    @classmethod
    def validate_longitude(cls, value: float) -> float:
        if not (-180 <= value <= 180):
            raise ValueError("Longitude must be between -180 and 180")
        return value


class IncidentRead(BaseModel):
    id: int
    title: str
    type: str
    severity: str
    location_name: str
    latitude: float
    longitude: float
    description: str
    status: str
    verification_state: str
    source: str = "community"
    assigned_team: str | None = None
    reported_by: int | None = None
    created_at: datetime | str | None = None
    updated_at: datetime | str | None = None


class ReportCreate(BaseModel):
    category: str
    description: str
    latitude: float
    longitude: float
    timestamp: str | None = None
    status: str = "SUBMITTED"
    verification_state: str = "COMMUNITY"

    @field_validator("latitude")
    @classmethod
    def validate_latitude(cls, value: float) -> float:
        if not (-90 <= value <= 90):
            raise ValueError("Latitude must be between -90 and 90")
        return value

    @field_validator("longitude")
    @classmethod
    def validate_longitude(cls, value: float) -> float:
        if not (-180 <= value <= 180):
            raise ValueError("Longitude must be between -180 and 180")
        return value


class AlertRead(BaseModel):
    id: int
    title: str
    alert_type: str
    severity: str
    description: str
    source: str
    source_url: str | None = None
    location: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    issued_at: str
    expires_at: str | None = None
    verification_status: str


class RouteCheckRequest(BaseModel):
    origin: str
    destination: str


class AIRequest(BaseModel):
    question: str
    context: dict[str, Any] | None = None


class AIResponse(BaseModel):
    question: str
    answer: str
    source: str = "PeakShield RAG foundation"
    verified: bool = False


class NotificationRead(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    notification_type: str = "alert"
    priority: str = "normal"
    status: str = "QUEUED"
    created_at: str


class SuccessResponse(BaseModel):
    success: bool = True
    data: dict[str, Any] | None = None
    meta: dict[str, Any] | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict[str, str] = {"code": "ERROR", "message": "Something went wrong."}
