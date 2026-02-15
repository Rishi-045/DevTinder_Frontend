import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isAuthChecked : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
