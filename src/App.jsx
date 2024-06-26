import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddPin from "./Pages/addPin";
import ConfirmPin from "./Pages/confirmPin";
import ProfileUser from "./Pages/profileUser";
import HomePage from "./Pages/HomePage";
import ResultSearch from "./Pages/searchResult";
import Notification from "./Pages/Notification";
import History from "./Pages/History";
import DetailTiket from "./Pages/DetailTiket";
import Payment from "./Pages/Payment";
import Glogin from "./Pages/gLogin2";
import Slicing_1 from "./assets/components/SlicingHomePage/Slicing_1";
import Slicing_2 from "./assets/components/SlicingHomePage/Slicing_2";

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
      path: "/profileUser",
      element: <ProfileUser />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/resultSearch",
      element: <ResultSearch />,
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
      path: "/DetailTiket",
      element: <DetailTiket />,
    },
    {
      path: "/Payment",
      element: <Payment />,
    },
    {
      path: "/g-login",
      element: <Glogin />,
    },
  ]);
  return <RouterProvider router={router} />;
}