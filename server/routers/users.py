from fastapi import APIRouter, Body
from db import get_users
from models import User


router = APIRouter()


@router.get("/users")
async def get_users() -> list[User]:
    """
    Gets all users from the database.
    """
    users = await get_users()
    return users


@router.get("/users/{user_id}")
async def get_users(user_id: str) -> User:
    """
    Gets a user from the database.
    """
    user = await get_users(user_id)
    return user
