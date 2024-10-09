import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user: null, // Store user data (like userId or profile)
  // isAuthenticated: false, // Track whether the user is authenticated
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
