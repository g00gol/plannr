from typing import List
from fastapi import APIRouter, HTTPException, Request, Depends
from bson import ObjectId

from db import users_db
from models import User, Trip
from dependencies import firebase_auth


router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(firebase_auth.authenticate)],
)


@router.post("/")
async def create_user(request: Request) -> User:
    """
    Creates a new user in the database.
    """
    try:
        _id = ObjectId()
        user: User = {
            "user_id": request.state.uid,
            "current_trip": _id,
            "trips": [{
                "_id": _id,
                "name": "My First Trip",
                "places": [],
            }],
        }
        _user = await users_db.create_user(user)
        return _user
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/me")
async def get_user(request: Request) -> User:
    """
    Gets a user from the database.
    """
    try:
        user = await users_db.get_user(request.state.uid)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/me/trips")
async def get_trips(request: Request) -> List[Trip]:
    """
    Gets all trips for a user.
    """
    try:
        user = await users_db.get_user(request.state.uid)
        return user["trips"]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/me/trips")
async def save_trip(trip_name: str, request: Request) -> Trip:
    """
    Saves a trip for a user.
    """
    try:
        user = await users_db.add_trip(request.state.uid, trip_name)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/me/trips/{trip_id}")
async def update_trip(request: Request, trip_id: str, trip_name: str = None, places: List[str] = None) -> Trip:
    """
    Updates a trip for a user.
    """
    if not trip_name and not places:
        raise HTTPException(
            status_code=400,
            detail="You must change something!",
        )

    try:
        trip = await users_db.edit_trip(request.state.uid, trip_id, trip_name, places)
        return trip
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
