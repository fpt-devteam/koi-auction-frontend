import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import statusReducer from "../redux/features/statusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    status: statusReducer,
  },
});
