import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "./tokenStore";

const isDev = import.meta.env.DEV;

const API_URL = isDev
    ? `http://${window.location.hostname}:5000`
    : import.meta.env.VITE_API_URL;


const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosClient.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            originalRequest.url !== "/refresh-token" &&
            originalRequest.url !== "/adminlogin" &&
            originalRequest.url !== "/verify-otp" &&
            originalRequest.url !== "/otp-session"
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(`${API_URL}/refresh-token`, {}, {
                    withCredentials: true,
                });

                const token = res.data?.accessToken;
                setAccessToken(token);
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return axiosClient(originalRequest);
            } catch (refreshError) {
                clearAccessToken();
                window.dispatchEvent(new Event("admin:logout"));
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
