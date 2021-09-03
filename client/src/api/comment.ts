import axios from 'axios';
import { API_URL } from 'src/constants/api';

export const getAll = async (postId: string, getCondition: GetCondition) => {
    return await axios.get(`${API_URL}/posts/${postId}/comment`, {
        params: {
            ...getCondition,
        },
    });
};

export const create = async (postId: string, content: string) => {
    return await axios.post(`${API_URL}/posts/${postId}/comment`, { content });
};
