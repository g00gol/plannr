from pydantic import BaseModel


class Trip(BaseModel):
    name: str
    places: list[str]
