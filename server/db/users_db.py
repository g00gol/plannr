from typing import List
from bson import ObjectId
from fastapi import HTTPException

from db import get_db_async
from models import User, Trip
from utils import oid_to_str


async def get_users() -> List[User]:
    """
    Gets all users from the database.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]
        all_users: List[User] = await users.find({}).to_list(length=9999)
        return oid_to_str(all_users)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def get_user(user_id: str) -> User:
    """
    Gets a user from the database.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]
        user = await users.find_one({"user_id": user_id})

        # If user not found, raise exception
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found.",
            )

        return oid_to_str(user)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def get_user_by_value(key: str, value: str) -> User:
    """
    Gets a user from the database.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]
        user = await users.find_one({key: value})

        # If user not found, raise exception
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found.",
            )

        return oid_to_str(user)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def create_user(user: User) -> User:
    """
    Creates a new user in the database.
    """
    try:
        db = await get_db_async("plannr")

        # Check if user_id already exists in database
        _user = await db.users.find_one({"user_id": user["user_id"]})
        if _user:
            raise HTTPException(
                status_code=409,
                detail="User already exists.",
            )

        res = await db.users.insert_one(user)
        # Get the newly created user
        _user = await db.users.find_one({"_id": res.inserted_id})

        return oid_to_str(_user)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def get_trip(user_id: str, trip_id: str) -> Trip:
    """
    Gets a trip for a user.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]
        trip = await users.find_one({"user_id": user_id, "trips.trip_id": ObjectId(trip_id)}, {"trips.$": 1})

        # If trip not found, raise exception
        if not trip:
            raise HTTPException(
                status_code=404,
                detail="Trip not found.",
            )

        return oid_to_str(trip["trips"][0])
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def add_trip(user_id: str, trip_name: str) -> Trip:
    """
    Adds a trip to a user's list of trips.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]

        # If user not found, raise exception
        await get_user(user_id)

        # Find user by user_id and push trip to trips array
        trip: Trip = {
            "_id": ObjectId(),
            "name": trip_name,
            "places": [],
        }
        await users.update_one({"user_id": user_id}, {"$push": {"trips": trip}})

        return oid_to_str(trip)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)


async def edit_trip(user_id: str, trip_id: str, trip_name: str | None, places: List[str] | None) -> Trip:
    """
    Updates a trip for a user.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]

        # If user not found, raise exception
        await get_user(user_id)
        # Find trip by trip_id and update trip with all non-None values
        trip: Trip = {}
        if trip_name:
            trip["trips.$.name"] = trip_name
        if places:
            trip["trips.$.places"] = places
        await users.update_one({"user_id": user_id, "trips.trip_id": ObjectId(trip_id)}, {"$set": trip})

        # Get the updated trip
        _trip = await get_trip(user_id, trip_id)

        return oid_to_str(_trip)
    except HTTPException as http_e:
        raise http_e
    except Exception as e:
        raise Exception(e)
