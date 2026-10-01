from __future__ import annotations


def test_risk_endpoint(client):
    response = client.get("/api/v1/risk/assess", params={"latitude": 30.66, "longitude": 79.03})
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["risk_level"] in {"LOW", "ADVISORY", "WARNING", "CONFIRMED_EMERGENCY"}
