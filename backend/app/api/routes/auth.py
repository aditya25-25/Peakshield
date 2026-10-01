from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError

from app.api.deps import get_current_user
from app.core.security import create_access_token, decode_token
from app.schemas import LoginRequest, UserCreate
from app.services.auth_service import authenticate_user, build_auth_response, get_user_by_email, register_user

router = APIRouter()


@router.post("/register")
async def register(payload: UserCreate) -> dict[str, Any]:
    try:
        user = await register_user(payload.email, payload.password, payload.full_name, payload.role)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"code": "USER_EXISTS", "message": str(exc)}) from exc

    auth = await build_auth_response(user)
    return {"success": True, "data": auth, "meta": {"message": "User registered successfully."}}


@router.post("/login")
async def login(payload: LoginRequest) -> dict[str, Any]:
    user = await authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": "INVALID_CREDENTIALS", "message": "Invalid email or password."})

    auth = await build_auth_response(user)
    return {"success": True, "data": auth, "meta": {"message": "Login successful."}}


@router.post("/refresh")
async def refresh(refresh_token: str) -> dict[str, Any]:
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"code": "MISSING_REFRESH_TOKEN", "message": "Refresh token is required."})

    try:
        payload = decode_token(refresh_token, refresh=True)
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": "INVALID_REFRESH_TOKEN", "message": "Refresh token is invalid or expired."}) from exc

    user = await get_user_by_email(payload.get("sub"))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail={"code": "USER_NOT_FOUND", "message": "User no longer exists."})

    access_token = create_access_token(user["email"])
    return {"success": True, "data": {"access_token": access_token, "token_type": "bearer"}, "meta": {"message": "Token refreshed."}}


@router.post("/logout")
async def logout() -> dict[str, Any]:
    return {"success": True, "data": {"logged_out": True}, "meta": {"message": "Logged out."}}


@router.post("/forgot-password")
async def forgot_password(email: str) -> dict[str, Any]:
    if not email or "@" not in email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"code": "INVALID_EMAIL", "message": "A valid email is required."})
    return {"success": True, "data": {"email": email}, "meta": {"message": "Password reset flow initiated."}}


@router.post("/reset-password")
async def reset_password(token: str, new_password: str) -> dict[str, Any]:
    if not token or not new_password or len(new_password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"code": "INVALID_PASSWORD", "message": "A valid token and password are required."})
    return {"success": True, "data": {"reset": True}, "meta": {"message": "Password reset successful."}}


@router.get("/me")
async def me(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return {"success": True, "data": current_user, "meta": {"message": "Current user loaded."}}
