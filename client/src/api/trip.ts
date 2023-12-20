import { getidtoken } from './auth';

const baseUrl = import.meta.env.VITE_BASE_API_URL

// create trip (TBD)

// update trip name (TBD)

// update trip places
export const updateTripPlaces = async (tripId: string, placeIds: string[]) => {
    const idToken = await getidtoken();


    const headers = { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${idToken}`
    };
    const body = { places: placeIds };
	
    const res = await fetch(`${baseUrl}/user/trips/${tripId}`, {
		method: "POST",
        body: JSON.stringify(body),
		headers: headers,
    });

	if(res.status !== 200) throw res;

    // verify res
    // console.log(`update ${res}`);

    return res;
};