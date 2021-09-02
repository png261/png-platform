import * as POST_API from 'src/api/post';

export const getPosts = async (getCondititon: GetCondititon) => {
    try {
        const { data } = await POST_API.getPosts(getCondititon);
        if (data.success) {
            return data;
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const getPost = async (postId: string) => {
    try {
        const { data } = await POST_API.getPost(postId);
        if (data.success) {
            return data;
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const addPost = async (post: Post) => {
    try {
        const { data } = await POST_API.addPost(post);
        if (data.success) {
            return data;
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const getUserPosts = async (
    userId: string,
    getCondition: GetCondititon
) => {
    try {
        const { data } = await POST_API.getUserPosts(userId, getCondition);
        if (data.success) {
            return data;
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const votePost = async (postId: string) => {
    try {
        const { data } = await POST_API.votePost(postId);
        if (data.success) {
            return data;
        }
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};
