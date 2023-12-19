from typing import List
from bson import ObjectId

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
        return all_users
    except Exception as e:
        raise Exception(e)


async def get_user(user_id: str) -> User:
    """
    Gets a user from the database.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]
        user = await users.find_one({"user_id": user_id}, {"_id": 0})

        # If user not found, raise exception
        if not user:
            raise Exception("User not found.")

        return user
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

        return user
    except Exception as e:
        raise Exception(e)


async def create_user(user: User) -> str:
    """
    Creates a new user in the database.
    """
    try:
        db = await get_db_async("plannr")
        res = await db.users.insert_one(user)
        return str(res.inserted_id)
    except Exception as e:
        raise Exception(e)


async def add_trip(user_id: str, trip_name: str) -> User:
    """
    Adds a trip to a user's list of trips.
    """
    try:
        db = await get_db_async("plannr")
        users = db["users"]

        # If user not found, raise exception
        user = await users.find_one({"user_id": user_id})
        if not user:
            raise Exception("User not found.")

        # Find user by user_id and push trip to trips array
        trip: Trip = {
            "_id": ObjectId(),
            "name": trip_name,
            "routes": [],
        }
        await users.update_one({"user_id": user_id}, {"$push": {"trips": trip}})

        # Return the updated user
        user = await users.find_one({"user_id": user_id})
        user = oid_to_str(user)
        return user
    except Exception as e:
        raise Exception(e)
