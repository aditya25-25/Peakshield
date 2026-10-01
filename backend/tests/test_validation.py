from __future__ import annotations


def test_invalid_report_payload(client):
    response = client.post(
        "/api/v1/reports/",
        json={"category": "LANDSLIDE", "description": "test", "latitude": 200, "longitude": 79.03},
    )
    assert response.status_code == 422
