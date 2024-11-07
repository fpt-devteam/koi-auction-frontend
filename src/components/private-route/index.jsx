import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../loading';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.user); 
  //get url path
  const location = useLocation();

  if (loading) {
    return <Loading />; // Hoặc hiển thị component Loading
  }

  if (!loading && user == null) {
    if (!allowedRoles.includes(0)) {
      return <Navigate to="/unauthorized" />;
    }
    return children;
  }

  // Kiểm tra roleId của user
  if (!loading && !allowedRoles.includes(user.UserRoleId)) {
    // Nếu user đã đăng nhập và có UserRoleId > 1, luôn chuyển đến /management
    // if (user.UserRoleId > 1 && location.pathname === '/') {
    //   return <Navigate to="/management" />;
    // }

    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' 
      || location.pathname === '/unauthorized') {
      switch (user.UserRoleId) {
        case 1:
          return <Navigate to="/" />;
        default:
          return <Navigate to="/management" />;
      }
    }
    return <Navigate to="/unauthorized" />;
  }

  // Nếu tất cả điều kiện đều đạt, render component con (children)
  return children;
};

export default PrivateRoute;
