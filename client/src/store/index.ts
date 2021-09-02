import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';

const store = configureStore({
    reducer: {
        auth,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
