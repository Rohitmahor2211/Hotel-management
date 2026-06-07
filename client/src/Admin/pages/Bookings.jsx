import React, { useEffect, useContext } from "react";
import AdminLayout from "../layout/AdminLayout";
import { RoomContext } from "../../context/RoomContext";

const Bookings = () => {
    const { bookings, fetchBookings, loading } = useContext(RoomContext);

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <AdminLayout>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#4b3425]">
                        Bookings Ledger
                    </h1>
                    <p className="text-sm text-[#8c735d] mt-1">
                        View and manage all guest reservations
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:hidden">
                {loading && (
                    <div className="bg-white rounded-2xl border border-[#eee7dc] p-6 text-center text-[#8c735d] shadow-sm">
                        Loading reservations...
                    </div>
                )}

                {!loading && bookings.length === 0 && (
                    <div className="bg-white rounded-2xl border border-[#eee7dc] p-6 text-center text-[#8c735d] shadow-sm">
                        No bookings found.
                    </div>
                )}

                {bookings.map((b) => (
                    <div key={b._id} className="bg-white rounded-2xl border border-[#eee7dc] p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="font-semibold text-[#4b3425] break-words">{b.guestName}</p>
                                <p className="text-xs text-[#8c735d] break-words">{b.guestEmail}</p>
                                <p className="text-xs text-[#8c735d]">{b.guestPhone}</p>
                            </div>

                            <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${b.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                {b.status}
                            </span>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm">
                            <p className="text-[#4b3425]">
                                <span className="text-[#8c735d]">Room:</span> {b.roomId?.title || "Unknown Room"} ({b.roomId?.room_no})
                            </p>
                            <p className="text-[#4b3425]">
                                <span className="text-[#8c735d]">Guests:</span> {b.guests}
                            </p>
                            <p className="text-[#4b3425]">
                                <span className="text-[#8c735d]">Stay:</span> {new Date(b.checkIn).toLocaleDateString()} to {new Date(b.checkOut).toLocaleDateString()}
                            </p>
                            <p className="font-semibold text-[#4b3425]">
                                â‚¹{b.totalPrice}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block w-full max-w-full bg-white rounded-2xl sm:rounded-3xl border border-[#eee7dc] overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[820px] whitespace-nowrap">
                        <thead className="bg-[#f9f7f2]">
                            <tr className="text-left text-[#6d4c35]">
                                <th className="p-4 pl-6">Guest Info</th>
                                <th className="p-4">Room</th>
                                <th className="p-4">Check-In / Out</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-[#8c735d]">
                                        Loading reservations...
                                    </td>
                                </tr>
                            )}
                            {!loading && bookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-10 text-center text-[#8c735d]">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                            {bookings.map((b) => (
                                <tr key={b._id} className="border-t border-[#eee7dc] hover:bg-[#faf7f2] transition">
                                    <td className="p-4 pl-6">
                                        <p className="font-semibold text-[#4b3425]">{b.guestName}</p>
                                        <p className="text-xs text-[#8c735d]">{b.guestEmail} | {b.guestPhone}</p>
                                    </td>
                                    <td className="p-4 text-[#4b3425]">
                                        {b.roomId?.title || "Unknown Room"} ({b.roomId?.room_no})
                                        <p className="text-xs text-[#8c735d]">{b.guests} Guests</p>
                                    </td>
                                    <td className="p-4 text-[#4b3425]">
                                        {new Date(b.checkIn).toLocaleDateString()} <br />
                                        <span className="text-xs text-[#8c735d]">to</span> {new Date(b.checkOut).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-medium text-[#4b3425]">
                                        ₹{b.totalPrice}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {b.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Bookings;
