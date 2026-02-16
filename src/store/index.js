import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import feedReducer from "./feed/feedSlice"
import connectionsReducer from "../store/connections/connectionsSlice"

const appStore = configureStore({
    reducer : {
        auth : authReducer,
        feed : feedReducer,
        connections : connectionsReducer,
    }
})

export default appStore