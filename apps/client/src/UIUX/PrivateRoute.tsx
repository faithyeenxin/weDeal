import React, { FC } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import differenceInMilliseconds from "date-fns/differenceInMilliseconds";
import parseJwt from "../UIUX/parseJwt";

interface IPrivateRouteProps {
  outlet: JSX.Element;
}
const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
  const token: any = sessionStorage.getItem("token");
  if (token !== null) {
    const payload = parseJwt(token);
    const today = new Date();
    const expiryDate = new Date(payload.exp * 1000);
    const diffInMilliseconds = differenceInMilliseconds(expiryDate, today);
    if (diffInMilliseconds < 0) {
      return <Navigate to="/login-redirect" />;
    } else {
      return outlet;
    }
  } else {
    return <Navigate to="/register-redirect" />;
  }
};
export default PrivateRoute;
