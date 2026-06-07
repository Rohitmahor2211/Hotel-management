import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const ProtectedAdminRoute = () => {
    const { authLoading, isAdminAuthenticated } = useContext(AdminAuthContext);
    const location = useLocation();

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAdminAuthenticated) {
        return <Navigate to="/adminlogin" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
