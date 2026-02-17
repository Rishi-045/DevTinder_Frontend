import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import feedReducer from "./feed/feedSlice";
import connectionsReducer from "./connections/connectionsSlice";
import requestsReducer from "./requests/requestSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
