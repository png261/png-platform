import { LOCAL_STORAGE_TOKEN_NAME } from 'src/constants/localStorage';

export const setLocalStorageToken = (token: string | null) => {
    if (!token) {
        return localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    }
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
};
