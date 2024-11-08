import userApi from "../config/userApi";
import { loginSuccess, loadStart, loadDone } from "../redux/features/userSlice";

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
  return next(action);
};

export default authMiddleware;
