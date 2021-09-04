import axios from 'axios';
import { API_URL } from 'src/constants/api';

export const get = async (id: string) => {
    return await axios.get(`${API_URL}/user/${id}`);
};
