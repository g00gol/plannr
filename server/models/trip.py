from typing import List, Union
from pydantic import BaseModel, validator
from bson import ObjectId


class Trip(BaseModel):
    _id: Union[str, ObjectId]
    name: str
    places: List[str]

    @validator("name", pre=True, always=True)
    def name_must_be_valid(cls, v):
        if v is None:
            return v

        if not v:
            raise ValueError("Name cannot be empty.")
        if len(v) > 50:
            raise ValueError("Name cannot be longer than 50 characters.")
        if len(v) < 3:
            raise ValueError("Name cannot be shorter than 3 characters.")

        return v.strip()
