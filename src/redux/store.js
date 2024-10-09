import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import statusReducer from "../redux/features/statusSlice";
import authMiddleware from "../middlewares/authMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
