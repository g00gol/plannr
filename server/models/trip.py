import os
from dotenv import load_dotenv
from typing import List, Union, Optional
from pydantic import BaseModel, validator
from bson import ObjectId
import requests


load_dotenv()
e = os.environ


class TripCreate(BaseModel):
    name: Optional[str] = None
    places: Optional[List[str]] = None

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

    @validator("places", each_item=True)
    def check_place_id_validity(cls, place_id):

        api_key = e.get("MAPS_API_KEY")
        url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={api_key}"
        response = requests.get(url)
        data = response.json()

        if data["status"] != 'OK':
            raise ValueError(f"Invalid place ID: {place_id}")

        return place_id


class Trip(TripCreate):
    trip_id: Union[str, ObjectId]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
