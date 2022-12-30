import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDataContext } from "../../contexts/DataContext";

const PreventRoute = () => {
  const { currentUser } = useDataContext();
  return currentUser ? <Navigate to="Dashboard" /> : <Outlet />;
};

export default PreventRoute;
