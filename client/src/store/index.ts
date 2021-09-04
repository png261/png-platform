import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import loading from './loading';

const store = configureStore({
    reducer: {
        auth,
        loading,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
