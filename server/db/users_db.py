from typing import List

from .base_db import get_db_async
from models import User


async def get_users() -> List[User]:
    """
    Gets all users from the database.
    """
    db = await get_db_async("users")
    users = await list(db.users.find({}))
    return users


async def get_users(user_id: str) -> User:
    """
    Gets a user from the database.
    """
    db = await get_db_async("users")
    user = await db.users.find_one({"_id": user_id})
    return user


async def create_user(user: User) -> str:
    db = await get_db_async("users")
    user_id = await db.users.insert_one(user)
    return user_id
