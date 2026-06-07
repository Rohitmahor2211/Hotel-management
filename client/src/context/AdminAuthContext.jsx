import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axios";
import { clearAccessToken, setAccessToken as saveAccessToken } from "../api/tokenStore";

export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

    const applyAccessToken = useCallback((token) => {
        saveAccessToken(token);
        setAccessToken(token);
        setIsAdminAuthenticated(Boolean(token));
    }, []);

    const clearAdminSession = useCallback(() => {
        clearAccessToken();
        setAccessToken(null);
        setIsAdminAuthenticated(false);
    }, []);

    const adminLogin = async (email, password) => {
        const res = await axiosClient.post("/adminlogin", { email, password });
        return res.data;
    };

    const verifyOtp = async (otp) => {
        const res = await axiosClient.post("/verify-otp", { otp });
        const token = res.data?.accessToken || res.data?.accesstoken;

        if (token) {
            applyAccessToken(token);
        }

        return res.data;
    };

    const refreshAccessToken = useCallback(async () => {
        const res = await axiosClient.post("/refresh-token");
        const token = res.data?.accessToken;

        if (token) {
            applyAccessToken(token);
        }

        return token;
    }, [applyAccessToken]);

    const checkAdminSession = useCallback(async () => {
        try {
            await refreshAccessToken();
        } catch (error) {
            clearAdminSession();
        } finally {
            setAuthLoading(false);
        }
    }, [clearAdminSession, refreshAccessToken]);

    const checkOtpSession = async () => {
        const res = await axiosClient.get("/otp-session");
        return res.data?.success === true;
    };

    const logout = async () => {
        try {
            await axiosClient.post("/adminlogout");
        } finally {
            clearAdminSession();
        }
    };

    useEffect(() => {
        checkAdminSession();

        const handleLogout = () => clearAdminSession();
        window.addEventListener("admin:logout", handleLogout);

        return () => window.removeEventListener("admin:logout", handleLogout);
    }, [checkAdminSession, clearAdminSession]);

    const value = useMemo(() => ({
        accessToken,
        authLoading,
        isAdminAuthenticated,
        adminLogin,
        verifyOtp,
        refreshAccessToken,
        checkAdminSession,
        checkOtpSession,
        logout,
        clearAdminSession,
    }), [
        accessToken,
        authLoading,
        isAdminAuthenticated,
        refreshAccessToken,
        checkAdminSession,
        clearAdminSession,
    ]);

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthProvider;
