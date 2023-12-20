from typing import List
from pydantic import BaseModel
from bson import ObjectId

from .trip import Trip


class User(BaseModel):
    _id: str | ObjectId
    user_id: str
    current_trip: str | ObjectId
    trips: List[Trip]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
