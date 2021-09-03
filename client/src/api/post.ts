import axios from 'axios';
import { API_URL } from 'src/constants/api';

export const getPosts = async (getCondition: GetCondition) => {
    return await axios.get(`${API_URL}/posts`, {
        params: {
            ...getCondition,
        },
    });
};

export const getUserPosts = async (
    userId: string,
    getCondition: GetCondition
) => {
    return await axios.get(`${API_URL}/posts/user/${userId}`, {
        params: {
            ...getCondition,
        },
    });
};

export const getPost = async (postId: string) => {
    return await axios.get(`${API_URL}/posts/${postId}`);
};

export const addPost = async (post: Post) => {
    return await axios.post(`${API_URL}/posts`, post);
};

export const updatePost = async (postId: string, updatedPost: Post) => {
    return await axios.put(`${API_URL}/posts/${postId}`, updatedPost);
};

export const deletePost = async (postId: string) => {
    return await axios.delete(`${API_URL}/posts/${postId}`);
};

export const votePost = async (postId: string) => {
    return await axios.post(`${API_URL}/posts/${postId}/vote`);
};
