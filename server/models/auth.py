from pydantic import BaseModel


class AuthPayload(BaseModel):
    user_id: str

    class Config:
        extra = "forbid"
