from typing import List
from pydantic import BaseModel
from bson import ObjectId

from .trip import Trip


class User(BaseModel):
    _id: str | ObjectId
    user_id: str
    trips: List[Trip]
