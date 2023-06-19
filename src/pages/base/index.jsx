import React from "react";
import { Grid, GridItem, Image, Skeleton } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import NavigationBar from "@/components/NavigationBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Authentication from "@/components/Authentication";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectAdmin } from "@/store/features/auth/selector";
import { AuthState } from "@/constants/state";
import { setAuth } from "@/store/features/auth";
import { getAllRegistrationsThunk } from "@/store/features/registration/thunk";
import {
  getApplicationReportsThunk,
  getCompanyReportsThunk,
  getRouteReportsThunk,
} from "@/store/features/report/thunk";
import useAuthenticationState from "@/auth/useAuthenticationState";

const BasePage = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector(selectAdmin);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const authState = useAuthenticationState();
  React.useEffect(() => {
    if (authState === AuthState.AUTHORIZED) {
      dispatch(setAuth());
    }
  }, [pathname, authState]);

  React.useEffect(() => {
    if (status === AuthState.AUTHORIZED) {
      Promise.all([
        dispatch(getAllRegistrationsThunk()),
        dispatch(getCompanyReportsThunk()),
        dispatch(getApplicationReportsThunk()),
        dispatch(getRouteReportsThunk()),
      ]);
    }
  }, [status]);

  return (
    <div className="relative">
      {status === AuthState.UNAUTHORIZED && <Authentication />}
      <Grid
        templateAreas={`"header header"
            "nav main"
            "nav footer"`}
        gridTemplateRows={"5rem 1fr 30px"}
        gridTemplateColumns={"240px 1fr"}
        h="100vh"
        position={"relative"}
      >
        <div className="inset-0 fixed max-w-[240px]">
          <GridItem pl="2" area={"header"}>
            <Image
              src={Logo}
              alt="logo"
              className="w-20 h-20 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </GridItem>
          <GridItem pl="2" area={"nav"} className="!p-0">
            <div className="bg-sky-700 h-[calc(100vh-80px)] rounded-tr-md flex flex-col justify-between">
              <NavigationBar />
            </div>
          </GridItem>
        </div>
        <GridItem pl="2" area={"main"}>
          <Outlet />
        </GridItem>
        <GridItem pl="2" area={"footer"}></GridItem>
      </Grid>
    </div>
  );
};

export default BasePage;
