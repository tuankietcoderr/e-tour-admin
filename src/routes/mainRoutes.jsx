/* eslint-disable react-refresh/only-export-components */
import BasePage from "@/pages/base";
import CompanyPage from "@/pages/company";
import ErrorPage from "@/pages/erorr";
import HomePage from "@/pages/home";
import RegistrationPage from "@/pages/registration";
import ReportPage from "@/pages/report";
import RoutePage from "@/pages/route";
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
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/company",
        element: <CompanyPage />,
      },
      {
        path: "/route",
        element: <RoutePage />,
      },
      {
        path: "*",
        element: <HomePage />,
      },
    ],
  },
]);
