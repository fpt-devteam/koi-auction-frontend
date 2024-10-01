import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import AppLayout from "./components/app-layout";
import Home from "./pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <Home /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
