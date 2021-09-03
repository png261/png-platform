import * as COMMENT_API from 'src/api/comment';

export const getAll = async (postId: string, getCondition: GetCondition) => {
    try {
        const { data } = await COMMENT_API.getAll(postId, getCondition);
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

export const create = async (postId: string, content: string) => {
    try {
        const { data } = await COMMENT_API.create(postId, content);
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
