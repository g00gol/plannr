import axios from 'axios';
import { getidtoken } from './auth';
import { UserData } from '../dataObjects/UserData';

export const createUserData = async (): Promise<void> => {
    const idToken = await getidtoken();
    
    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.post('/api/user', { headers });

    // verify res
    console.log(`create ${res}`);
};

export const getUserData = async (): Promise<UserData> => {
    const idToken = await getidtoken();

    const headers = { 'Authorization': `Bearer ${idToken}` };
    const res = await axios.get('/api/user', { headers });

    // verify res
    console.log(`get ${res}`);

    const userData = new UserData(res.data.currentTrip, res.data.trips);
    return userData;
};