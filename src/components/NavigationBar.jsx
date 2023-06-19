import { AuthState } from "@/constants/state";
import { logout } from "@/store/features/auth";
import { selectAdmin } from "@/store/features/auth/selector";
import { clearCompanies } from "@/store/features/company";
import { clearRegistrations } from "@/store/features/registration";
import { clearReports } from "@/store/features/report";
import { clearRoutes } from "@/store/features/route";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { SkeletonText } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const nav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Registration",
      path: "/registration",
    },
    {
      name: "Report",
      path: "/report",
    },
    {
      name: "Route management",
      path: "/route",
    },
    {
      name: "Company management",
      path: "/company",
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { status } = useAppSelector(selectAdmin);

  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearCompanies());
    dispatch(clearRegistrations());
    dispatch(clearReports());
    dispatch(clearRoutes());
    navigate("/");
  };

  const isActived = (path) =>
    pathname === path ? "bg-sky-800" : "hover:bg-sky-800";

  return (
    <>
      <div>
        {nav.map((item) => (
          <div
            role="button"
            key={item.name}
            className={`cursor-pointer text-white ${isActived(
              item.path
            )} px-2 py-4 rounded-tr-md`}
            onClick={() => navigate(item.path)}
          >
            <SkeletonText
              noOfLines={1}
              isLoaded={status === AuthState.AUTHORIZED}
            >
              {item.name}
            </SkeletonText>
          </div>
        ))}
      </div>
      <div
        onClick={handleLogOut}
        className="cursor-pointer bg-red-600 py-4 text-center text-white px-2"
      >
        <SkeletonText noOfLines={1} isLoaded={status === AuthState.AUTHORIZED}>
          Logout
        </SkeletonText>
      </div>
    </>
  );
};

export default NavigationBar;
