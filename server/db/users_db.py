from .base_db import get_db_async


db = get_db_async("users")


async def get_users():
    users = await db.users.find().to_list(length=100)
    return users


async def get_user(user_id: str):
    user = await db.users.find_one({"_id": user_id})
    return user


async def create_user(user):
    user_id = await db.users.insert_one(user)
    return user_id
