from __future__ import annotations


def test_route_analysis(client):
    response = client.post("/api/v1/routes/check", json={"origin": "Gaurikund", "destination": "Kedarnath"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert len(payload["data"]["route_options"]) >= 2
