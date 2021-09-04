import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const authSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading() {
            return true;
        },
        endLoading() {
            return false;
        },
    },
});

export const { startLoading, endLoading } = authSlice.actions;
export default authSlice.reducer;
