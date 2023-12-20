from typing import List
from pydantic import BaseModel, field_validator
from bson import ObjectId


class Trip(BaseModel):
    _id: str | ObjectId
    name: str
    places: List[str]

    @field_validator("name")
    def name_must_be_valid(cls, v):
        if not v:
            raise ValueError("Name cannot be empty.")
        if len(v) > 50:
            raise ValueError("Name cannot be longer than 50 characters.")
        if len(v) < 3:
            raise ValueError("Name cannot be shorter than 3 characters.")

        return v.strip()
