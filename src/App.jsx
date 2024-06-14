import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddPin from "./Pages/addPin";
import ConfirmPin from "./Pages/confirmPin";
import ProfileUser from "./Pages/profileUser";
import HomePage from "./Pages/HomePage";
import ResultSearchFilm from "./Pages/searchResult";
import Notification from "./Pages/Notification";
import History from "./Pages/History";
import DetailTiket from "./Pages/DetailTiket";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/asd",
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
      path: "/profileUser",
      element: <ProfileUser />,
    },
    {
      path: "/Home",
      element: <HomePage />,
    },
    {
      path: "/resultSearchFilm",
      element: <ResultSearchFilm />,
    },
    {
      path: "/notification",
      element: <Notification />,
    },
    {
      path: "/History",
      element: <History />,
    },
    {
      path: "/",
      element: <DetailTiket />,
    },
  ]);
  return <RouterProvider router={router} />;
}
