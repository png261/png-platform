import axios from 'axios';
import { API_URL } from 'src/constants/api';

export const auth = async () => {
    return await axios.get(`${API_URL}/auth`);
};

export const loginUser = async (account: Account) => {
    return await axios.post(`${API_URL}/auth/login`, account);
};

export const registerUser = async (newAccount: NewAccount) => {
    return await axios.post(`${API_URL}/auth/register`, newAccount);
};

export const updateUser = async (updateAccount: UpdateAccount) => {
    return await axios.patch(`${API_URL}/auth`, updateAccount);
};
