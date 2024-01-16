import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../featuresUser/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})