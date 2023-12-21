from typing import List, Union
from pydantic import BaseModel
from bson import ObjectId

from .trip import Trip


class User(BaseModel):
    _id: Union[str, ObjectId]
    user_id: str
    current_trip: Union[str, ObjectId]
    trips: List[Trip]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
