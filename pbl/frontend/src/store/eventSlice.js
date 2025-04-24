import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents } from "../api/eventApi";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  return await fetchEvents();
});

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default eventSlice.reducer;
