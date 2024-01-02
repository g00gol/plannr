from pymongo import MongoClient
from typing import Optional, cast
import os


client: Optional[MongoClient] = None

async def startup():
    global client
    try:
        MONGO_URI = cast(str, os.getenv("MONGO_URI"))
        client = MongoClient(MONGO_URI)
    except Exception as e:
        raise Exception(e)


async def shutdown():
    global client
    if client:
        client.close()


async def get_db_async(db_name: str) -> MongoClient:
    MONGO_URI = cast(str, os.getenv("MONGO_URI"))
    client = MongoClient(MONGO_URI)
    if client is None:
        raise Exception("Database client not initialized.", client)
    return client[db_name]
