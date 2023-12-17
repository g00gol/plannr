from typing import List
from fastapi import APIRouter, HTTPException, Request, Depends

from db import users_db
from models import User
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
    }

    user_id = await users_db.create_user(user)
    return user_id


@router.get("/{user_id}")
async def get_user(user_id: str, authorization=Depends(firebase_auth.authorize)) -> User:
    """
    Gets a user from the database.
    """

    user = await users_db.get_user(user_id)
    return user


@router.get("/{user_id}/saved-routes")
async def get_saved_routes(user_id: str, authorization=Depends(firebase_auth.authorize)) -> List[dict]:
    """
    Gets all saved routes for a user.
    """
    return


@router.post("/{user_id}/saved-routes")
async def save_route(user_id: str, route: dict) -> dict:
    """
    Saves a route for a user.
    """
    return
