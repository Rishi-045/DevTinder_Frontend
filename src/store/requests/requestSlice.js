import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchRequests = createAsyncThunk(
  "fetch/requests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/requests");
      return res?.data?.requests;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  },
);

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload,
      );
    },
    resetRequests: (state) => {
      state.requests = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      });
  },
});

export const { removeRequest, resetRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
