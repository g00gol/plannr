from typing import List
from pydantic import BaseModel

from .trip import Trip


class User(BaseModel):
    user_id: str
    trips: List[Trip]

    class Config:
        extra = "forbid"
