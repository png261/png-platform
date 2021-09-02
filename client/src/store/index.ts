import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import post from './post';

const store = configureStore({
    reducer: {
        auth,
        post,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
