from typing import List
from pydantic import BaseModel
from bson import ObjectId


class Trip(BaseModel):
    _id: str | ObjectId
    name: str
    places: List[str]
