from typing import List

from db import get_db_async
from models import User


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
