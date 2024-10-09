// authMiddleware.js
import { message } from "antd";
import userApi from "../config/userApi";
import { loginSuccess, logout } from "../redux/features/userSlice";

const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === "auth/checkAuth") {
    const currentPath = window.location.pathname;
    if (currentPath === "/login") {
      // Nếu người dùng đang ở trang login, không cần kiểm tra xác thực
      return next(action);
    }
    try {
      // Gọi API /me để kiểm tra người dùng đã đăng nhập hay chưa
      const response = await userApi.get("/profile");
      // Nếu thành công, cập nhật thông tin người dùng vào Redux store
      store.dispatch(loginSuccess({ user: response.data }));
    } catch (error) {
      // Kiểm tra mã lỗi trả về từ server
      if (error.response && error.response.status === 401) {
        // Nếu lỗi 401 (Unauthorized), thực hiện logout
        store.dispatch(logout());
        // Dispatch một hành động để chuyển hướng
        message.error("User is not authenticated or session expired");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }

  // Chuyển tiếp hành động cho reducer tiếp theo
  return next(action);
};

export default authMiddleware;
