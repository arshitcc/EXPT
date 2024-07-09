import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";

export const myStore = configureStore({
    reducer : {
        auth : authSlice,
    }
})