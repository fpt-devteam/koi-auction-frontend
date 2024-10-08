import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  // Store user data (like userId or profile)
  isAuthenticated: false,  // Track whether the user is authenticated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('User logged in:', action.payload.user);
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
