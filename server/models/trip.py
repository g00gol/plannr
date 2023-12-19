from pydantic import BaseModel
from bson import ObjectId


class Trip(BaseModel):
    _id: ObjectId
    name: str
    places: list[str]
