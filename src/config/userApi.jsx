import axios from "axios";
const baseUrl = "http://localhost:3000/user-service";

const config = {
  baseURL: baseUrl,
  withCredentials: true,
};

const userApi = axios.create(config);

userApi.defaults.baseURL = baseUrl;

// userApi.interceptors.response.use(
//   (response) => {
//     // Trả về response nếu thành công
//     return response;
//   },
//   (error) => {
//     // Kiểm tra mã lỗi trả về từ server
//     if (error.response && error.response.status === 401) {
//       // Nếu lỗi 401 (Unauthorized), thực hiện logout
//       store.dispatch(logout());
//       message.error("User is not authenticated or session expired");
//       // Chuyển hướng đến trang đăng nhập
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 2000); // Trì hoãn 2 giây trước khi chuyển hướng để hiển thị thông báo
//     }
//     // Trả về Promise bị từ chối để tiếp tục xử lý lỗi
//     return Promise.reject(error);
//   }
// );
export default userApi;
