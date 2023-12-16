from fastapi import APIRouter, Body, Depends, HTTPException
from db import get_users
from models import AuthPayload
from services import firebase_auth_dependency


router = APIRouter(
    tags=["auth"],
)


@router.post("/authenticate")
def authenticate(payload: AuthPayload, decoded_token=Depends(firebase_auth_dependency)):
    """
    Authenticates a user.
    """
    if payload.user_id != decoded_token.get("uid"):
        raise HTTPException(
            status_code=400, detail="User ID does not match the one in the token")
    return {"message": "User ID verified successfully"}
