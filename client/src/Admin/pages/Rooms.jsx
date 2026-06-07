import React, { useContext, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { RoomContext } from "../../context/RoomContext";
import AddRoomModal from "../components/AddRoomModal";

const Rooms = () => {
    const { rooms, loading, deleteRoom } = useContext(RoomContext);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");

    const getRoomDisplayStatus = (room) => {
        const status = (room.effectiveStatus || room.status || "available").toLowerCase();

        if (status === "booked" || room.activeBooking) {
            return "booked";
        }

        if (status === "maintenance") {
            return "maintenance";
        }

        return "available";
    };

    // Calculate filtered rooms
    const filteredRooms = rooms.filter((room) => {
        // Robust status matching
        const roomStatus = getRoomDisplayStatus(room);
        const price = Number(room.price) || 0;

        const statusMatches = statusFilter === "all" || roomStatus === statusFilter;
        const priceMatches =
            priceFilter === "all" ||
            (priceFilter === "budget" && price < 2000) ||
            (priceFilter === "mid" && price >= 2000 && price <= 4000) ||
            (priceFilter === "luxury" && price > 4000);

        return statusMatches && priceMatches;
    });

    const handleEdit = (room) => {
        setEditData(room);
        setOpen(true);
    };

    const openAddRoom = () => {
        setOpen(true);
        setEditData(null);
    };

    return (
        <AdminLayout>
            {/* Custom CSS for animations and sticky layout */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spin-slow {
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(0.98); }
                }
                .loading-overlay {
                    backdrop-filter: blur(4px);
                    animation: pulse-soft 2s ease-in-out infinite;
                }
                .sticky-header {
                    position: sticky;
                    top: -1.5rem; /* Adjusted for main padding */
                    z-index: 20;
                    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
                    padding: 1.5rem;
                    background: #f9f7f2;
                }
            `}} />

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 loading-overlay">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-[#eee7dc]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[#f7efe5] rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-t-[#6d4c35] rounded-full absolute top-0 animate-spin"></div>
                        </div>
                        <p className="text-[#6d4c35] font-semibold text-lg">Processing...</p>
                    </div>
                </div>
            )}

            <div className="sticky-header">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#4b3425]">
                            Rooms Management
                        </h1>
                        <p className="text-sm text-[#8c735d] mt-1">
                            Manage all hotel rooms, prices and availability
                        </p>
                    </div>

                    <button
                        className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#2563eb] text-white font-medium hover:bg-[#1d4ed8] transition shadow-lg"
                        onClick={openAddRoom}
                    >
                        + Add Room
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_auto] gap-3 bg-white border border-[#eee7dc] rounded-2xl p-4 shadow-md">
                    <div>
                        <label className="block text-sm font-medium text-[#5c4332] mb-2">
                            Room status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full p-3 rounded-xl border border-[#eadfce] bg-[#fffaf4] text-[#4b3425] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]"
                        >
                            <option value="all">All rooms</option>
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#5c4332] mb-2">
                            Price range
                        </label>
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="w-full p-3 rounded-xl border border-[#eadfce] bg-[#fffaf4] text-[#4b3425] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]"
                        >
                            <option value="all">All prices</option>
                            <option value="budget">Budget (Under 2000)</option>
                            <option value="mid">Mid-Range (2000 - 4000)</option>
                            <option value="luxury">Luxury (Above 4000)</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setStatusFilter("all");
                            setPriceFilter("all");
                        }}
                        className="w-full xl:w-auto self-end px-5 py-3 rounded-xl bg-[#f7efe5] text-[#6d4c35] font-medium hover:bg-[#eadbc8] transition"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:hidden">
                {loading && (
                    <div className="bg-white rounded-2xl border border-[#eee7dc] p-6 text-center text-[#8c735d] shadow-sm">
                        Loading rooms...
                    </div>
                )}

                {!loading && filteredRooms.length === 0 && (
                    <div className="bg-white rounded-2xl border border-[#eee7dc] p-10 text-center text-[#8c735d] shadow-sm">
                        <div className="mb-3 flex justify-center">
                            <div className="p-3 rounded-full bg-[#f7efe5] text-[#6d4c35]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                            </div>
                        </div>
                        <p className="font-semibold text-lg">No rooms found</p>
                        <p className="text-sm">Try adjusting your filters or add a new room.</p>
                    </div>
                )}

                {filteredRooms.map((room) => (
                    <div key={room._id} className="bg-white rounded-2xl border border-[#eee7dc] p-4 shadow-sm">
                        <div className="flex gap-3">
                            <img
                                src={room.images?.[0] || "https://via.placeholder.com/80"}
                                alt="room"
                                className="w-20 h-20 rounded-xl object-cover border border-[#eee7dc] shrink-0"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-[#4b3425] wrap-break-word">{room.title}</p>
                                <p className="text-xs text-[#8c735d] mt-1">Room No. {room.room_no}</p>
                                <p className="text-sm font-medium text-[#4b3425] mt-2">Rs. {room.price}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoomDisplayStatus(room) === "available"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {getRoomDisplayStatus(room)}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(room)}
                                    className="px-3 py-2 rounded-xl bg-[#f7efe5] text-[#6d4c35] hover:bg-[#eadbc8] transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteRoom(room._id)}
                                    className="px-3 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block w-full max-w-full bg-white rounded-2xl sm:rounded-3xl border border-[#eee7dc] overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[720px]">
                        <thead className="bg-[#f9f7f2]">
                            <tr className="text-left text-[#6d4c35]">
                                <th className="p-4 pl-6">Room No.</th>
                                <th className="p-4">Room</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-[#8c735d]">
                                        Loading rooms...
                                    </td>
                                </tr>
                            )}

                            {!loading && filteredRooms.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-[#8c735d]">
                                        No rooms match this filter.
                                    </td>
                                </tr>
                            )}

                            {filteredRooms.map((room) => (
                                <tr
                                    key={room._id}
                                    className="border-t border-[#eee7dc] hover:bg-[#faf7f2] transition"
                                >
                                    <td className="p-4 font-medium text-[#4b3425]">
                                        {room.room_no}
                                    </td>

                                    <td className="p-4 flex items-center gap-3">
                                        <img
                                            src={room.images?.[0] || "https://via.placeholder.com/80"}
                                            alt="room"
                                            className="w-14 h-14 rounded-xl object-cover border border-[#eee7dc]"
                                        />

                                        <div>
                                            <p className="font-semibold text-[#4b3425]">
                                                {room.title}
                                            </p>
                                            <p className="text-xs text-[#8c735d]">
                                                {room.capacity || 2} Guests
                                            </p>
                                        </div>
                                    </td>

                                    <td className="p-4 font-medium text-[#4b3425]">
                                        Rs. {room.price}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoomDisplayStatus(room) === "available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {getRoomDisplayStatus(room)}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(room)}
                                                className="px-4 py-2 rounded-xl bg-[#f7efe5] text-[#6d4c35] hover:bg-[#eadbc8] transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteRoom(room._id)}
                                                className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddRoomModal isOpen={open} onClose={() => setOpen(false)} editData={editData} />
        </AdminLayout>
    );
};

export default Rooms;
