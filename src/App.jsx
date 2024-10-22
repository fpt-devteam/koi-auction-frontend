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
import Register from "./pages/register-page";
import PrivateRoute from "./components/private-route"; // Import component PrivateRoute
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CreateAuctionPage from "./pages/create-auction-page";
import AuctionList from "./pages/auction-list-page";
import Login from "./pages/login-page";
import AuctionDetailPage from "./pages/auction-detail-page";
import UpdateAuctionPage from "./pages/update-auction-page";
import AuctionManagementPage from "./pages/auction-management-page";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi app load
    dispatch({ type: "auth/checkAuth" });
  }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/auction-detail", element: <AuctionDetailPage /> },
        { path: "/auction-list", element: <AuctionList /> },
      ],
    },
    {
      path: "/management",
      element: (
        <PrivateRoute allowedRoles={[2, 3, 4]}>
          <MngLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/management/lots", element: <LotManagementPage /> },
        { path: "/management", element: <LotManagementPage /> },
        {
          path: "/management/create-lot-request",
          element: <CreateLotPage />,
        },
        {
          path: "/management/create-auction-request",
          element: <CreateAuctionPage />,
        },
        {
          path: "/management/update-auction-request",
          element: <UpdateAuctionPage />,
        },
        {
          path: "/management/auction",
          element: <AuctionManagementPage />,
        },
      ],
    },
    {
      path: "/unauthorized",
      element: (
        <h1>Unauthorized: You do not have permission to access this page.</h1>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
