from pydantic import BaseModel


class User(BaseModel):
    firebase_id: str

    class Config:
        extra = "forbid"


class Route(BaseModel):
    name: str
    route: list[list[float]]

    class Config:
        extra = "forbid"
