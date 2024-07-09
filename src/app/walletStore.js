import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import paymentSlice from "../features/paymentSlice";

export const myStore = configureStore({
    reducer : {
        auth : authSlice,
        payment : paymentSlice,
    }
})