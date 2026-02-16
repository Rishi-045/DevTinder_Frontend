import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchConnections = createAsyncThunk(
  "/fetch/connections",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("user/connections");
      return res.data?.connections || [];
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err.message);
    }
  },
);

const connectionsSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [],
    loading: false,
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConnections.fulfilled, (state,action) => {
        state.loading = false;
        state.connections = action.payload;
      })
      .addCase(fetchConnections.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default connectionsSlice.reducer;