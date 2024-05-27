import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddPin from "./Pages/addPin";
import ConfirmPin from "./Pages/confirmPin";
import ProfileUser from "./Pages/profileUser";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/add-pin",
      element: <AddPin />,
    },
    {
      path: "/confirm-pin",
      element: <ConfirmPin />,
    },
    {
      path: "/",
      element: <ProfileUser />,
    },
  ]);
  return <RouterProvider router={router} />;
}
