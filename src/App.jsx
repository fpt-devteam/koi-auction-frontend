import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./components/app-layout";
import MngLayout from "./components/mng-layout";
import LotManagementPage from "./pages/lot-management-page";
import CreateLotPage from "./pages/create-lot-page";
import HomePage from "./pages/home-page";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Biến trạng thái để kiểm tra việc khôi phục

  useEffect(() => {
    // Lấy user từ localStorage
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      // Cập nhật Redux với user từ localStorage
      const userObj = JSON.parse(savedUser);
      dispatch(loginSuccess({ user: userObj }));
      setIsUserLoaded(true);
    }
  }, [dispatch]);
  const user = useSelector((store) => store.user.user?.user);

  if (!isUserLoaded) {
    return null;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/management",
      element:
        user?.userRoleId > 1 ? (
          <MngLayout />
        ) : (
          <Navigate to="/login" replace /> // Điều hướng đến trang login nếu userRoleId không phải là 2
        ),
      children: [
        { path: "/management/lots", element: <LotManagementPage /> },
        { path: "/management", element: <LotManagementPage /> },
        {
          path: "/management/create-lot-request",
          element: <CreateLotPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
