from __future__ import annotations


def test_register_and_login(client):
    response = client.post(
        "/api/v1/auth/register",
        json={"email": "traveler@example.com", "password": "secret123", "full_name": "Traveler User"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "traveler@example.com", "password": "secret123"},
    )
    assert response.status_code == 200
    assert response.json()["success"] is True


def test_auth_requires_token(client):
    response = client.get("/api/v1/users/")
    assert response.status_code == 401
    assert response.json()["detail"]["code"] == "AUTH_REQUIRED"
