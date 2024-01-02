from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional, cast
import os


client: Optional[AsyncIOMotorClient] = None

async def startup():
    global client
    try:
        MONGO_URI = cast(str, os.getenv("MONGO_URI"))
        print(client)
        client = AsyncIOMotorClient(MONGO_URI)
    except Exception as e:
        raise Exception(e)


async def shutdown():
    global client
    if client:
        client.close()


async def get_db_async(db_name: str) -> AsyncIOMotorDatabase:
    print(client)
    MONGO_URI = cast(str, os.getenv("MONGO_URI"))
    client = AsyncIOMotorClient(MONGO_URI)
    print(client)
    if client is None:
        raise Exception("Database client not initialized.")
    return client[db_name]
