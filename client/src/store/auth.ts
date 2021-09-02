import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: { email: string; username: string; createdAt?: string };
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: { email: '', username: '' },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            return {
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        },
        restAuth() {
            return { ...initialState, isLoading: false };
        },
    },
});

export const { setUser, restAuth } = authSlice.actions;
export default authSlice.reducer;
