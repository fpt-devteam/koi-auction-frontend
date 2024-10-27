import { message } from "antd";
import userApi from "../config/userApi";
import { loginSuccess, logout } from "../redux/features/userSlice";

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
      // Call the API to check user authentication
      const response = await userApi.get("/profile");
      store.dispatch(loginSuccess({ user: response.data }));
    } catch (error) {
      const currentPath = window.location.pathname;

      // Check if the current path matches any of the public paths
      const isPublicPath = publicPaths.some((path) => {
        return typeof path === "string"
          ? currentPath === path
          : path.test(currentPath); // Test regex patterns for dynamic paths
      });

      if (isPublicPath) {
        // If the current path is public, no need for authentication
        return next(action);
      }

      // If authentication fails and the path is not public
      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
        message.error("User is not authenticated or session expired");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }

  // Pass the action to the next middleware/reducer
  return next(action);
};

export default authMiddleware;
