import * as AUTH_API from 'src/api/auth';
import { LOCAL_STORAGE_TOKEN_NAME } from 'src/constants/localStorage';
import { restAuth, setUser } from 'src/store/auth';
import { endLoading, startLoading } from 'src/store/loading';
import { setAuthorization } from 'src/utils/api';
import { setLocalStorageToken } from 'src/utils/auth';

export const loadUser = () => async (dispatch) => {
    dispatch(startLoading());
    const token = localStorage[LOCAL_STORAGE_TOKEN_NAME];
    if (token) {
        setAuthorization(token);
    }

    try {
        const { data } = await AUTH_API.auth();
        if (data.success) {
            dispatch(endLoading());
            dispatch(setUser(data.user));
        }
    } catch (error) {
        setLocalStorageToken(null);
        setAuthorization(null);
        dispatch(restAuth());
        dispatch(endLoading());
        return { success: false, message: error.message };
    }
};

export const loginUser = (account: Account) => async (dispatch) => {
    try {
        const { data } = await AUTH_API.loginUser(account);
        if (data.success) {
            setLocalStorageToken(data.accessToken);
        }

        dispatch(loadUser());
        return data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const registerUser = (account: NewAccount) => async (dispatch) => {
    try {
        const { data } = await AUTH_API.registerUser(account);
        if (data.success) {
            setLocalStorageToken(data.accessToken);
        }

        dispatch(loadUser());
        return data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};

export const logoutUser = () => (dispatch) => {
    setLocalStorageToken(null);
    dispatch(restAuth());
};

export const updateUser = async (updateAccount: UpdateAccount) => {
    try {
        const { data } = await AUTH_API.updateUser(updateAccount);
        return data;
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        }
        return { success: false, message: error.message };
    }
};
