import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logout } from "../../redux/features/userSlice";
import { message } from "antd";
import userApi from "../../config/userApi";

const PrivateRoute = ({ children, allowedRoles }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await userApi.get('/profile');
  //       if (response.status === 200) {
  //         dispatch(loginSuccess({user: response.data}));
  //       }
  //     } catch (error) {
  //       dispatch(logout());
  //       message.error('User is not authenticated or session expired', error);
  //     }
  //   };
  //   checkAuthStatus(); // Kiểm tra trạng thái khi reload trang
  // }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  // console.log(user);
  // console.log(isAuthenticated);

  // Thêm kiểm tra khi state vẫn đang tải hoặc user chưa có
  if (user === null || isAuthenticated === undefined) {
    return null; // Hoặc hiển thị component Loading
  }

  // Nếu không đăng nhập, chuyển hướng đến trang đăng nhập
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // Kiểm tra roleId của user
  if (!allowedRoles.includes(user.UserRoleId)) {
    return <Navigate to="/unauthorized" />; // Hoặc trang thông báo quyền truy cập bị từ chối
  }

  // Nếu tất cả điều kiện đều đạt, render component con (children)
  return children;
};

export default PrivateRoute;
