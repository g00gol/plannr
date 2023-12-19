from typing import List
from fastapi import APIRouter, HTTPException, Request, Depends

from db import users_db
from models import User, Trip
from dependencies import firebase_auth


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(firebase_auth.authenticate)],
)


@router.get("/")
async def get_users() -> List[User]:
    """
    Gets all users from the database.
    """
    users = await users_db.get_users()
    return users


@router.post("/")
async def create_user(request: Request) -> str:
    """
    Creates a new user in the database.
    """
    # Check if user_id already exists in database
    user = await users_db.get_user_by_value("user_id", request.state.uid)
    if user:
        raise HTTPException(
            status_code=400,
            detail="User already exists.",
        )

    user: User = {
        "user_id": request.state.uid,
        "trips": [],
    }

    user_id = await users_db.create_user(user)
    return user_id


@router.get("/{user_id}")
async def get_user(request: Request, authorization=Depends(firebase_auth.authorize)) -> User:
    """
    Gets a user from the database.
    """
    user = await users_db.get_user(request.state.uid)
    return user


@router.get("/{user_id}/trips")
async def get_trips(request: Request, authorization=Depends(firebase_auth.authorize)) -> List[dict]:
    """
    Gets all saved routes for a user.
    """
    user = await users_db.get_user(request.state.uid)
    return user["trips"]


@router.post("/{user_id}/trips")
async def save_trip(trip_name: str, request: Request, authorization=Depends(firebase_auth.authorize)) -> dict:
    """
    Saves a route for a user.
    """
    user = await users_db.add_trip(request.state.uid, trip_name)

    return user


@router.put("/{user_id}/trips/{trip_id}")
async def update_trip(request: Request, trip_id: str, places: List[str], authorization=Depends(firebase_auth.authorize)) -> dict:
    """
    Updates a route for a user.
    """
    user = await users_db.update_trip(request.state.uid, trip_id, places)

    return
