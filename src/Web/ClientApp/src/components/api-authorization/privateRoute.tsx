import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/userDataProvider";
import toast from "react-hot-toast";

type PrivateRouteProps = {
  redirectPath?: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = "/login",
}) => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserDataProvider");
  }

  const { userData } = context;
  if (!userData) {
    toast.error("You must be logged in to access this page", {
      className: "text-center text-capitalize small-font",
    });
    return <Navigate to={redirectPath} replace />;
  }

  return userData ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
