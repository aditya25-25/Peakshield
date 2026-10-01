from __future__ import annotations


def test_ai_chat_endpoint(client):
    response = client.post("/api/v1/ai/chat", json={"question": "Is the route safe?"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert "answer" in payload["data"]
