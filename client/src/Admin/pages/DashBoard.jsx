import React, { useContext, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import DashboardCard from "../components/DashboardCard";
import { RoomContext } from "../../context/RoomContext";

const DashBoard = () => {
    const { dashboardStats, fetchDashboardStats, updateRoomStatus, loading } = useContext(RoomContext);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const handleStatusToggle = async (room) => {
        const nextStatus = (room.effectiveStatus || room.status) === "available" ? "booked" : "available";
        await updateRoomStatus(room._id, nextStatus, "offline");
    };

    return (
        <AdminLayout>
            {loading ? (
                <div className="p-10 text-center text-[#8c735d]">Loading dashboard data...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <DashboardCard title="Total Rooms" value={dashboardStats.totalRooms} />
                        <DashboardCard title="Bookings" value={dashboardStats.totalBookings} />
                        <DashboardCard title="Available Rooms" value={dashboardStats.availableRooms} />
                        {/* <DashboardCard title="Revenue" value={`Rs. ${dashboardStats.totalRevenue}`} /> */}
                    </div>

                    <div className="mt-8 bg-white rounded-3xl border border-[#eee7dc] shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-[#eee7dc]">
                            <h3 className="text-xl font-semibold text-[#4b3425]">Room Availability</h3>
                            <p className="text-sm text-[#8d7765] mt-1">
                                Mark rooms booked for offline guests or make them available again.
                            </p>
                        </div>

                        <div className="grid gap-4 p-4 md:hidden">
                            {(dashboardStats.roomsStatus || []).map((room) => {
                                const isAvailable = (room.effectiveStatus || room.status) === "available";

                                return (
                                    <div key={room._id} className="rounded-2xl border border-[#eee7dc] p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-semibold text-[#4b3425]">{room.title}</p>
                                                <p className="text-sm text-[#8d7765]">Room No. {room.room_no}</p>
                                                <p className="text-sm text-[#8d7765]">Rs. {room.price}</p>
                                            </div>

                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                                {isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                {isAvailable ? "Available" : "Booked"}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleStatusToggle(room)}
                                            className={`mt-4 w-full px-4 py-3 rounded-xl font-medium transition ${isAvailable ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                        >
                                            {isAvailable ? "Mark Offline Booked" : "Mark Available"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full min-w-[760px]">
                                <thead className="bg-[#f9f7f2] text-left text-[#6d4c35]">
                                    <tr>
                                        <th className="p-4 pl-6">Room No.</th>
                                        <th className="p-4">Room</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Mode</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(dashboardStats.roomsStatus || []).map((room) => {
                                        const isAvailable = (room.effectiveStatus || room.status) === "available";

                                        return (
                                            <tr key={room._id} className="border-t border-[#eee7dc]">
                                                <td className="p-4 pl-6 font-medium text-[#4b3425]">{room.room_no}</td>
                                                <td className="p-4 text-[#4b3425]">{room.title}</td>
                                                <td className="p-4 text-[#4b3425]">Rs. {room.price}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                                        {isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                                        {isAvailable ? "Available" : "Booked"}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-[#8d7765]">{room.bookingMode || "-"}</td>
                                                <td className="p-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStatusToggle(room)}
                                                        className={`px-4 py-2 rounded-xl font-medium transition ${isAvailable ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                                    >
                                                        {isAvailable ? "Mark Offline Booked" : "Mark Available"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 bg-white rounded-3xl p-6 border border-[#eee7dc] shadow-sm">
                        <h3 className="text-xl font-semibold text-[#4b3425] mb-4">Recent Activity</h3>

                        {dashboardStats.recentActivity.length === 0 ? (
                            <p className="text-[#8d7765]">No recent bookings.</p>
                        ) : (
                            <div className="space-y-4">
                                {dashboardStats.recentActivity.map((activity) => (
                                    <div key={activity.id} className="pb-3 border-b border-[#f4eee6] last:border-0 last:pb-0">
                                        <p className="text-[#4b3425] font-medium">
                                            {activity.guestName} <span className="text-[#8d7765] font-normal">booked the</span> {activity.roomName} <span>(Room No. {activity.room_no})</span>
                                        </p>
                                        <p className="text-xs text-[#8d7765] mt-1">
                                            {new Date(activity.time).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default DashBoard;
