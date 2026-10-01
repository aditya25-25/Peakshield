from __future__ import annotations

from fastapi import HTTPException, status


class PeakShieldError(Exception):
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST, code: str = "PEAKSHIELD_ERROR"):
        self.message = message
        self.status_code = status_code
        self.code = code


def http_exception(status_code: int, code: str, message: str) -> HTTPException:
    return HTTPException(status_code=status_code, detail={"code": code, "message": message})


def invalid_coordinates():
    return http_exception(status.HTTP_422_UNPROCESSABLE_ENTITY, "INVALID_LOCATION", "The supplied coordinates are invalid.")


def unauthorized():
    return http_exception(status.HTTP_401_UNAUTHORIZED, "AUTH_REQUIRED", "Authentication is required.")
