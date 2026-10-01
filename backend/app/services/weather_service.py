from __future__ import annotations

from datetime import datetime

import httpx

from app.core.config import settings


async def get_weather(latitude: float, longitude: float) -> dict[str, object]:
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        raise ValueError("The supplied coordinates are invalid.")

    if settings.openweather_api_key:
        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                response = await client.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    params={
                        "lat": latitude,
                        "lon": longitude,
                        "appid": settings.openweather_api_key,
                        "units": "metric",
                    },
                )
                if response.is_success:
                    data = response.json()
                    return {
                        "temperature": data.get("main", {}).get("temp", 12),
                        "feels_like": data.get("main", {}).get("feels_like", 12),
                        "humidity": data.get("main", {}).get("humidity", 0),
                        "pressure": data.get("main", {}).get("pressure", 1013),
                        "wind_speed": data.get("wind", {}).get("speed", 0),
                        "wind_direction": data.get("wind", {}).get("deg", 0),
                        "visibility": data.get("visibility", 0) / 1000,
                        "rainfall": data.get("rain", {}).get("1h", 0),
                        "snowfall": data.get("snow", {}).get("1h", 0),
                        "weather_condition": data.get("weather", [{}])[0].get("main", "Clear"),
                        "latitude": latitude,
                        "longitude": longitude,
                        "source": "OpenWeather",
                        "timestamp": datetime.utcnow().isoformat(),
                        "is_stale": False,
                    }
        except httpx.HTTPError:
            pass

    return {
        "temperature": round(12 + (abs(latitude) * 0.45), 1),
        "feels_like": round(11 + (abs(latitude) * 0.4), 1),
        "humidity": 72,
        "pressure": 1012,
        "wind_speed": 18,
        "wind_direction": 150,
        "visibility": 7.5,
        "rainfall": 24,
        "snowfall": 0,
        "weather_condition": "Rain showers",
        "latitude": latitude,
        "longitude": longitude,
        "source": "Fallback weather model",
        "timestamp": datetime.utcnow().isoformat(),
        "is_stale": False,
    }
