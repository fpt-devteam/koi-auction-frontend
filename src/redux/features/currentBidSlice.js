import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBid: null,
};

const currentBidSlice = createSlice({
  name: "currentBid",
  initialState,
  reducers: {
    bidSuccess: (state, action) => {
      state.currentBid = action.payload.currentBid;
    },
    clearBid: (state) => {
      state.currentBid = null;
    },
  },
});

export const { bidSuccess, clearBid } = currentBidSlice.actions;
export default currentBidSlice.reducer;
