import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Store user data (like userId or profile)
  isAuthenticated: false,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loadStart: (state) => {
      state.loading = true;
    },
    loadDone: (state) => {
      state.loading = false;
    }
  },
});

export const { loginSuccess, logout, loadStart, loadDone } = userSlice.actions;
export default userSlice.reducer;
