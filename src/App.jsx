import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import AuctionLotDetailPage from "./pages/auction-lot-detail-age";
import UserList from "./pages/user-list-page";
import UserDetail from "./pages/user-detail-page";
import AuctionManagementPage from "./pages/auction-management-page";
import UpdateAuctionPage from "./pages/update-auction-page";
import ProfileFormPage from "./pages/profile-form-page";
import PaymentCallBackPage from "./pages/payment-callback-page";
import WalletPage from "./pages/wallet-page";
import OrderStatusPage from "./pages/order-status-page";
import AboutPage from "./pages/about-page";
import UnauthorizedPage from "./pages/unauthorized-page";
import PolicyPage from "./pages/policy-page";
import TermPage from "./pages/term-page";
import DashBoardPage from "./pages/admin-dashboard-page";
import BreederPage from "./pages/breeder-page";
import BreederDetailPage from "./pages/breeder-detail-page";
import Roles from "./helpers/role";
import UserOrderStatusPage from "./pages/user-order-status-page";
import StaffWithdrawStatusPage from "./pages/staff-withdraw-page";
import StaffOrderStatusPage from "./pages/staff-delivery-lot-page";
import NotFoundPage from "./pages/not-found-page";
import AdminDashboardPage from "./pages/admin-dashboard-page";
import BreederDashboardPage from "./pages/breeder-dashboard-page";
import BreederRegister from "./pages/breeder-register-page";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi app load
    dispatch({ type: "auth/checkAuth" });
  }, [dispatch]);
  const router = createBrowserRouter([
    //public pages
    {
      path: "/login",
      element: <AppLayout />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/register",
      element: <AppLayout />,
      children: [{ path: "", element: <Register /> }],
    },
    {
      path: "/unauthorized",
      element: <UnauthorizedPage />,
    },
    {
      path: "/breeder-register",
      element: <AppLayout />,
      children: [{ path: "", element: <BreederRegister /> }]
    },

    {
      path: "/",
      element: (
        <PrivateRoute allowedRoles={[Roles.GUEST, Roles.MEMBER]}>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [
        //guest and member
        {
          path: "",
          element: <HomePage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "auction-list",
          element: <AuctionList />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "auction-detail/:auctionId",
          element: <AuctionDetailPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "auction-lot-detail/:auctionLotId",
          element: <AuctionLotDetailPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "breeder",
          element: <BreederPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "breeder-detail/:breederId",
          element: <BreederDetailPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "policy",
          element: <PolicyPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "term",
          element: <TermPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
        {
          path: "about",
          element: <AboutPage />,
          allowedRoles: [Roles.GUEST, Roles.MEMBER],
        },
      ],
    },
    //member
    {
      path: "/order",
      element: (
        <PrivateRoute allowedRoles={[Roles.MEMBER]}>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [{ path: "", element: <UserOrderStatusPage /> }],
    },

    //member
    {
      path: "/wallet",
      element: (
        <PrivateRoute allowedRoles={[Roles.MEMBER, Roles.BREEDER]}>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [{ path: "", element: <WalletPage /> }],
    },

    {
      path: "/payment-callback",
      element: (
        <PrivateRoute allowedRoles={[Roles.MEMBER, Roles.BREEDER]}>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [{ path: "", element: <PaymentCallBackPage /> }],
    },

    //member
    {
      path: "/profile",
      element: (
        <PrivateRoute allowedRoles={[Roles.MEMBER]}>
          <AppLayout />
          <AppLayout />
        </PrivateRoute>
      ),
      children: [{ path: "", element: <ProfileFormPage /> }],
    },

    //breeder
    {
      path: "/management/wallet",
      element: (
        <PrivateRoute allowedRoles={[Roles.BREEDER]}>
          <MngLayout />
        </PrivateRoute>
      ),
      children: [{ path: "", element: <WalletPage /> }],
    },

    {
      path: "/management",
      element: (
        <PrivateRoute allowedRoles={[Roles.BREEDER, Roles.STAFF, Roles.ADMIN]}>
          <MngLayout />
        </PrivateRoute>
      ),
      children: [
        //test only
        {
          path: "",
          element: <LotManagementPage />,
          allowedRoles: [Roles.BREEDER, Roles.STAFF],
        },

        //breeder
        {
          path: "create-lot-request",
          element: <CreateLotPage />,
          allowedRoles: [Roles.BREEDER],
        },
        {
          path: "breeder-dashboard",
          element: <BreederDashboardPage />,
          allowedRoles: [Roles.BREEDER],
        },

        //breeder and staff
        {
          path: "lots",
          element: <LotManagementPage />,
          allowedRoles: [Roles.BREEDER, Roles.STAFF],
        },

        //staff and admin
        {
          path: "create-auction-request",
          element: <CreateAuctionPage />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },
        {
          path: "update-auction-request",
          element: <UpdateAuctionPage />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },
        {
          path: "auction",
          element: <AuctionManagementPage />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },
        {
          path: "withdraw",
          element: <StaffWithdrawStatusPage />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },
        {
          path: "order",
          element: <StaffOrderStatusPage />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },
        {
          path: "user-detail",
          element: <UserDetail />,
          allowedRoles: [Roles.STAFF, Roles.ADMIN],
        },

        //admin
        {
          path: "user-list",
          element: <UserList number={Roles.MEMBER} />,
          allowedRoles: [Roles.ADMIN],
        },
        {
          path: "breeder-list",
          element: <UserList number={Roles.BREEDER} />,
          allowedRoles: [Roles.ADMIN],
        },
        {
          path: "staff-list",
          element: <UserList number={Roles.STAFF} />,
          allowedRoles: [Roles.ADMIN],
        },
        {
          path: "admin-dashboard",
          element: <AdminDashboardPage />,
          allowedRoles: [Roles.ADMIN],
        },

        //breeder and staff and admin
        { path: "profile", element: <ProfileFormPage /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
