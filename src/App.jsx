import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/app-layout";
import MngLayout from "./components/mng-layout";
import LotManagementPage from "./pages/lot-management-page";
import CreateLotPage from "./pages/create-lot-page";
import HomePage from "./pages/home-page";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./components/private-route";  // Import component PrivateRoute

function App() {

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
      element: (
        <PrivateRoute allowedRoles={[2, 3]}> 
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
      ],
    },
    {
      path: "/unauthorized",
      element: <h1>Unauthorized: You do not have permission to access this page.</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
