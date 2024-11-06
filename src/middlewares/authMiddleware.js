import { message } from "antd";
import userApi from "../config/userApi";
import { loginSuccess, logout, loadStart, loadDone } from "../redux/features/userSlice";
import { useSelector } from "react-redux";

// List of public paths (no authentication required)
const publicPaths = [
  "/login",
  "/register",
  "/",
  "/auction-list",
  /^\/auction-detail\/\d+$/, // Regex to match /auction-detail/21 or /auction-detail/any-number
  /^\/auction-lot-detail\/\d+$/, // Regex to match /auction-lot-detail/any-number
];

const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === "auth/checkAuth") {
    try {
      store.dispatch(loadStart())
      console.log("tao dang fetch user")
      // Call the API to check user authentication
      const response = await userApi.get("/profile");
      store.dispatch(loginSuccess({ user: response.data }));
      console.log("tao fetch duoc user")
    } catch (error) {
      console.log("tao khong fetch duco user");
      store.dispatch(loadDone());
      console.log("error", error);
    }
  }
  // Pass the action to the next middleware/reducer
  return next(action);
};

export default authMiddleware;
