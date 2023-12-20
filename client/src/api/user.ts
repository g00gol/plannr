import axios from 'axios';
import { getidtoken } from './auth';
import { UserData } from '../dataObjects/UserData';

const baseUrl = import.meta.env.VITE_BASE_API_URL

export const createUserData = async (): Promise<void> => {
    const idToken = await getidtoken();
    console.log(idToken)
    
    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.post(`${baseUrl}/user`, { headers });
    
    // verify res
    console.log(`create ${JSON.stringify(res)}`);
};

export const getUserData = async (): Promise<UserData> => {
    const idToken = await getidtoken();
    
    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.get(`${baseUrl}/user/`, { headers });

    // verify res
    console.log(`get ${JSON.stringify(res)}`);

    const userData = new UserData(res.data.currentTrip, res.data.trips);
    return userData;
};