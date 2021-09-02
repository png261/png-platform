import * as POST_API from 'src/api/post';
import { setPosts } from 'src/store/post';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await POST_API.getPosts();
        if (data.success) {
            const action = setPosts(data.posts);
            dispatch(action);
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const addPost = (post: Post) => async (dispatch) => {
    try {
        const { data } = await POST_API.addPost(post);
        if (data.success) {
            const action = setPosts(data.posts);
            dispatch(action);
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};
