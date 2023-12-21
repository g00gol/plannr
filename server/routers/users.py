from typing import List
from pydantic import ValidationError
from fastapi import APIRouter, HTTPException, Request, Depends
from bson import ObjectId

from db import users_db
from models import User, Trip
from dependencies import firebase_auth


router = APIRouter(
    prefix="/user",
    tags=["users"],
    dependencies=[Depends(firebase_auth.authenticate)],
)


@router.get("/")
async def get_user(request: Request) -> User:
    """
    Gets a user from the database.
    """
    try:
        user = await users_db.get_user(request.state.uid)
        return user
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/")
async def create_user(request: Request) -> User:
    """
    Creates a new user in the database.
    """
    try:
        trip_id = ObjectId()
        user: User = {
            "user_id": request.state.uid,
            "current_trip": trip_id,
            "trips": [{
                "trip_id": trip_id,
                "name": "My First Trip",
                "places": [],
            }],
        }
        _user = await users_db.create_user(user)
        return _user
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/trips")
async def get_trips(request: Request) -> List[Trip]:
    """
    Gets all trips for a user.
    """
    try:
        user = await users_db.get_user(request.state.uid)
        return user["trips"]
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/trips")
async def save_trip(trip_name: str, request: Request) -> Trip:
    """
    Saves a trip for a user.
    """
    try:
        user = await users_db.add_trip(request.state.uid, trip_name)
        return user
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/trips/{trip_id}")
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
        existing_trip = await users_db.get_trip(request.state.uid, trip_id)
        trip_data = Trip(trip_id=trip_id, name=trip_name or existing_trip.get('name'), places=places or existing_trip.get('places'))
        trip = await users_db.edit_trip(request.state.uid, trip_data.trip_id, trip_data.name, trip_data.places)
        return trip
    except HTTPException as http_e:
        raise http_e
    except ValidationError as validation_e:
        raise HTTPException(
            status_code=400,
            detail=str(validation_e.errors()),
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
