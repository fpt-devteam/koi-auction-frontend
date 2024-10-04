import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import AppLayout from "./components/app-layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import React from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
