import { apiSlice } from "@/app/api/apiSlice";
import userReducer from '@/features/userSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: userReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), apiSlice.middleware],
})

export default store