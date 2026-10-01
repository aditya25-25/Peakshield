from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "PeakShield API"
    app_env: str = "development"
    debug: bool = True
    database_url: str = "sqlite+aiosqlite:///./peakshield.db"
    jwt_secret: str = "change-me-in-development"
    jwt_refresh_secret: str = "change-me-in-development-refresh"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 7
    cors_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    openweather_api_key: str = ""
    openai_api_key: str = ""
    redis_url: str = "redis://localhost:6379/0"
    map_provider_key: str = ""
    fcm_project_id: str = ""
    fcm_private_key: str = ""
    fcm_client_email: str = ""

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
