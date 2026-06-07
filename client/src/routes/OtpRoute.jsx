import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const OtpRoute = () => {
    const { checkOtpSession, isAdminAuthenticated } = useContext(AdminAuthContext);
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        let mounted = true;

        const verifyOtpSession = async () => {
            if (isAdminAuthenticated) {
                setStatus("authenticated");
                return;
            }

            try {
                const isAllowed = await checkOtpSession();
                if (mounted) setStatus(isAllowed ? "allowed" : "blocked");
            } catch (error) {
                if (mounted) setStatus("blocked");
            }
        };

        verifyOtpSession();

        return () => {
            mounted = false;
        };
    }, [checkOtpSession, isAdminAuthenticated]);

    if (status === "checking") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (status === "authenticated") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (status === "blocked") {
        return <Navigate to="/adminlogin" replace />;
    }

    return <Outlet />;
};

export default OtpRoute;
