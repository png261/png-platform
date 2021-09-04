import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: User;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        _id: '',
        email: '',
        username: '',
        createdAt: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        },
        restAuth() {
            return initialState;
        },
    },
});

export const { setUser, restAuth } = authSlice.actions;
export default authSlice.reducer;
