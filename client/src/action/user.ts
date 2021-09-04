import * as USER_API from 'src/api/user';

export const get = async (id: string) => {
    try {
        const { data } = await USER_API.get(id);
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
