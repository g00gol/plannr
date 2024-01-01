from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional, cast
import os


client: Optional[AsyncIOMotorClient] = None
MONGO_URI = cast(str, os.getenv("ATLAS_URI"))
print(MONGO_URI)

async def startup():
    global client
    try:
        client = AsyncIOMotorClient(MONGO_URI)
    except Exception as e:
        raise Exception(e)


async def shutdown():
    global client
    if client:
        client.close()


async def get_db_async(db_name: str) -> AsyncIOMotorDatabase:
    if client is None:
        raise Exception("Database client not initialized.")
    return client[db_name]
