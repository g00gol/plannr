from pydantic import BaseModel


class User(BaseModel):
    firebase_id: str

    class Config:
        extra = "forbid"
