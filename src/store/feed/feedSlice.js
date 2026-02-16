import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios"

export const fetchFeed = createAsyncThunk(
  "/feed/feedFetch",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/feed?page=${page}&limit=${limit}`);
      return res?.data?.feed;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data || "An error occurred while fetching the feed.",
      );
    }
  },
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    hasMore: true,
  },
  reducers: {
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    resetFeed: (state, action) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.meta.arg.page + 1;
        state.hasMore = action.payload.hasMore;
        state.users = [...state.users, ...action.payload];
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeUser, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
