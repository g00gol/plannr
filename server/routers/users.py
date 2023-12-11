from fastapi import APIRouter, Body
from db import get_users
from models import User


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get("/")
async def get_users() -> list[User]:
    """
    Gets all users from the database.
    """
    users = await get_users()
    return users


@router.get("/{user_id}")
async def get_users(user_id: str) -> User:
    """
    Gets a user from the database.
    """
    user = await get_users(user_id)
    return user


@router.get("/history")
async def get_history(user_id: str) -> list[User]:
    """
    Gets all history for a user.
    """
    return


@router.get("/saved-routes")
async def get_saved_routes(user_id: str) -> list[User]:
    """
    Gets all saved routes for a user.
    """
    return
