import { getidtoken } from './auth';
import { UserData } from '../dataObjects/UserData';

const baseUrl = import.meta.env.VITE_BASE_API_URL

export const createUserData = async (): Promise<void> => {
    const idToken = await getidtoken();
    
    const headers = { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${idToken}`
    };
	
    const res = await fetch(`${baseUrl}/user/`, {
		method: "POST",
		headers: headers,
    });

	if(res.status !== 200) throw res;

	// const data = await res.json();

    // verify res
    // console.log(`create ${JSON.stringify(data)}`);
};

export const getUserData = async (): Promise<UserData> => {
    const idToken = await getidtoken();
    
    const headers = { 
		"Content-Type": "application/json",
		'Authorization': `Bearer ${idToken}`
	};
	const res = await fetch(`${baseUrl}/user/`, {
		method: "GET",
		headers: headers,
    });

	if(res.status !== 200) throw res;

	const data = await res.json();

    // verify res
    // console.log(`get ${JSON.stringify(data)}`);

    const userData = new UserData(data.current_trip, data.trips);
    return userData;
};