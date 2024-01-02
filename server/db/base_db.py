from pymongo import MongoClient
from typing import Optional, cast
import os


client: Optional[MongoClient] = None
MONGO_URI = cast(str, os.getenv("MONGO_URI"))

try:
    client = MongoClient(MONGO_URI)
except Exception as e:
    raise Exception(e)

async def get_db_async(db_name: str) -> MongoClient:
    if client is None:
        raise Exception("Database client not initialized.", client)
    return client[db_name]

async def shutdown():
    global client
    if client:
        client.close()


