import axios from 'axios';
import { getidtoken } from './auth';
import { UserData } from '../dataObjects/UserData';

const baseUrl = import.meta.env.VITE_BASE_API_URL

export const createUserData = async (): Promise<void> => {
    console.log('createUserData')
    const idToken = await getidtoken();
    
    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.post(`${baseUrl}/users`, { headers });

    // verify res
    console.log(`create ${res}`);
};

export const getUserData = async (): Promise<UserData> => {
    console.log('getUserData')
    const idToken = await getidtoken();

    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.get(`${baseUrl}/users/me`, { headers });

    // verify res
    console.log(`get ${res}`);

    const userData = new UserData(res.data.currentTrip, res.data.trips);
    return userData;
};