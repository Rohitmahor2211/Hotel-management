import React, { createContext, useState, useEffect, useMemo } from 'react'
import axiosClient from '../api/axios';
import toast from 'react-hot-toast';

export const RoomContext = createContext()

const RoomProvider = ({ children }) => {

    const [rooms, setRooms] = useState([])
    const [bookings, setBookings] = useState([])
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalBookings: 0,
        availableRooms: 0,
        totalRevenue: 0,
        recentActivity: [],
        roomsStatus: []
    })
    const [loading, setLoading] = useState(false)
    const [allowed, setAllowed] = useState(false)


    // send admin email , password
    const adminLogin = async (email, password) => {
        try {
            setLoading(true)
            const res = await axiosClient.post("/adminlogin", { email, password })
            if (res.data) {
                setAllowed(true)
                toast.success("Login successful!");
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response?.data?.message || "Login failed");
            setAllowed(false)
        } finally {
            setLoading(false)
        }

    }


    // GET ROOMS
    const fetchRooms = async () => {
        try {
            setLoading(true)
            const res = await axiosClient.get("/getrooms")
            setRooms(res.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // ADD ROOM
    const addRoom = async (roomData) => {
        try {
            setLoading(true)
            await axiosClient.post("/createrooms", roomData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Room added successfully!");
            await fetchRooms()
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to add room");
        } finally {
            setLoading(false)
        }
    };

    // UPDATE ROOM
    const updateRoom = async (id, formData) => {
        try {
            setLoading(true)
            await axiosClient.patch(`/updateroom/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Room updated successfully!");
            await fetchRooms();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update room");
        } finally {
            setLoading(false)
        }
    };

    // DELETE ROOM
    const deleteRoom = async (id) => {
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            setLoading(true)
            await axiosClient.delete(`/deleteroom/${id}`)
            setRooms((prev) => prev.filter((room) => room._id != id))
            toast.success("Room deleted successfully!");
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Failed to delete room");
        } finally {
            setLoading(false)
        }
    }

    // FETCH ALL BOOKINGS
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get("/getbookings");
            if (res.data.success) {
                setBookings(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH DASHBOARD STATS
    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get("/dashboard-stats");
            // console.log(res)
            if (res.data.success) {
                setDashboardStats(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateRoomStatus = async (roomId, status, bookingMode = "offline") => {
        try {
            const res = await axiosClient.patch(`/admin/rooms/${roomId}/status`, { status, bookingMode });
            await fetchRooms();
            await fetchDashboardStats();
            return res.data;
        } catch (error) {
            console.error("Room status update error:", error);
            if (error.response && error.response.data) return error.response.data;
            throw error;
        }
    };

    const createPaymentOrder = async (paymentData) => {
        try {
            const res = await axiosClient.post("/create-payment-order", paymentData);
            return res.data;
        } catch (error) {
            // console.error("Payment order error:", error);
            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response?.data);
            if (error.response && error.response.data) return error.response.data;
            throw error;
        }
    };


    // SUBMIT A BOOKING
    const submitBooking = async (bookingData) => {
        try {
            const res = await axiosClient.post("/bookroom", bookingData);
            if (res.data?.success) {
                fetchRooms();
            }
            return res.data;
        } catch (error) {
            console.error("Booking submission error:", error);
            if (error.response && error.response.data) return error.response.data;
            throw error;
        }
    };

    // CHECK SINGLE ROOM AVAILABILITY
    const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
        try {
            const res = await axiosClient.post("/check-availability", { roomId, checkIn, checkOut });
            return res.data;
        } catch (error) {
            console.error("Check availability error:", error);
            if (error.response && error.response.data) return error.response.data;
            throw error;
        }
    };

    // FETCH AVAILABLE ROOMS LIST (FOR FILTER)
    const fetchAvailableRoomsList = async (dateFilter) => {
        try {
            const res = await axiosClient.post("/available-rooms", dateFilter);
            return res.data;
        } catch (error) {
            console.error("Fetch available rooms error:", error);
            if (error.response && error.response.data) return error.response.data;
            throw error;
        }
    };

    useEffect(() => {
        fetchRooms()
    }, [])

    const roomCategories = useMemo(() => {
        const categorized = {};
        rooms.forEach((room) => {
            if (!categorized[room.title]) {
                categorized[room.title] = [];
            }
            categorized[room.title].push(room);
        });
        return categorized;
    }, [rooms]);

    return (
        <RoomContext.Provider value={{
            rooms, loading, roomCategories, bookings, dashboardStats,
            fetchRooms, addRoom, deleteRoom, updateRoom,
            fetchBookings, fetchDashboardStats, updateRoomStatus, createPaymentOrder, submitBooking,
            checkRoomAvailability, fetchAvailableRoomsList, adminLogin, allowed, setAllowed
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomProvider
