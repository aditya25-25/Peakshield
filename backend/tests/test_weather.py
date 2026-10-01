from __future__ import annotations


def test_weather_uses_valid_coordinates(client):
    response = client.get("/api/v1/weather/current", params={"latitude": 30.66, "longitude": 79.03})
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["latitude"] == 30.66


def test_weather_rejects_invalid_coordinates(client):
    response = client.get("/api/v1/weather/current", params={"latitude": 100, "longitude": 79.03})
    assert response.status_code == 422
