from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import USER_DB


@pytest.fixture
def client():
    USER_DB.clear()
    with TestClient(app) as test_client:
        yield test_client
