import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statusId: 1,
  },
  reducers: {
    setStatusId: (state, action) => {
      state.statusId = action.payload;
    },
  },
});

export const { setStatusId } = statusSlice.actions;
export default statusSlice.reducer;
