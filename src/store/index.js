import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"

const appStore = configureStore({
    reducer : {
        auth : authReducer,
    }
})

export default appStore