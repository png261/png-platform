import { createSlice } from '@reduxjs/toolkit';

interface PostState {
    isLoading: boolean;
    posts: [];
}

const initialState: PostState = {
    isLoading: true,
    posts: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchingPosts(state) {
            state.isLoading = true;
        },
        setPosts(state, action) {
            return {
                isLoading: false,
                posts: action.payload,
            };
        },
    },
});

export const { fetchingPosts, setPosts } = userSlice.actions;
export default userSlice.reducer;
