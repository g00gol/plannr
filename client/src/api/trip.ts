import axios from 'axios';
import { getidtoken } from './auth';

// create trip (TBD)

// update trip name (TBD)

// update trip places
export const updateTripPlaces = async (tripId: string, placeIds: string[]) => {
    const idToken = await getidtoken();

    const headers = { 'Authorization': `Bearer ${idToken}` };

    const res = await axios.put(`/api/trip/${tripId}`, { 
        data: { places: placeIds },
        headers: headers
    });

    // verify res
    console.log(`update ${res}`);

    return res;
};