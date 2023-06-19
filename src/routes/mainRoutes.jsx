/* eslint-disable react-refresh/only-export-components */
import BasePage from "@/pages/base";
import ErrorPage from "@/pages/erorr";
import HomePage from "@/pages/home";
import RegistrationPage from "@/pages/registration";
import RegistrationDetail from "@/pages/registration/detail";
import ReportPage from "@/pages/report";
import ReportDetail from "@/pages/report/detail";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/report/{id}",
        element: <RegistrationDetail />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/report/{id}",
        element: <ReportDetail />,
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
]);
