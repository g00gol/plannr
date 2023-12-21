import { TripData } from "../dataObjects/TripData";
import { getidtoken } from "./auth";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

// create trip (TBD)

// update trip name (TBD)

// update trip places
export const updateTripPlaces = async (tripId: string, placeIds: string[]) => {
  const idToken = await getidtoken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };

  // need to send req body with fields to specify name and placeid instead of just array (so we could potentially change them both)
  const res = await fetch(`${baseUrl}/user/trips/${tripId}`, {
    method: "PUT",
    body: JSON.stringify(placeIds),
    headers: headers,
  });

  if (res.status !== 200) throw res;

  const data = await res.json();

  // verify res
  // console.log(`update ${JSON.stringify(data)}`);

  const tripData = new TripData(data.trip_id, data.name, data.places);
  return tripData;
};
