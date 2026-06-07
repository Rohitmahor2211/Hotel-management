const roomModel = require('../models/roomsModel')
const Booking = require('../models/bookingModel')
const uploadImagesToCloudinary = require('../services/cloudinary.service')


const create_room = async (req, res) => {
    const cloudImageUrls = await uploadImagesToCloudinary(req.files)
    const { title, price, description, room_no, capacity, status } = req.body;

    try {
        await roomModel.create({ title, price, description, images: cloudImageUrls, capacity, status, room_no })
        res.status(201).json({
            message: "Room created successfully..!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internel server error..!",
            error_message: error.message
        })
    }
}


const get_room = async (req, res) => {
    try {
        const rooms = await roomModel.find().lean()
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const activeOrUpcomingBookings = await Booking.find({
            status: "confirmed",
            checkOut: { $gte: today }
        }).select('roomId checkIn checkOut paymentMethod')

        const bookingByRoomId = activeOrUpcomingBookings.reduce((acc, booking) => {
            const roomId = booking.roomId.toString()
            if (!acc[roomId]) acc[roomId] = booking
            return acc
        }, {})

        const roomsWithEffectiveStatus = rooms.map((room) => {
            const activeBooking = bookingByRoomId[room._id.toString()]
            const effectiveStatus = room.status === "maintenance"
                ? "maintenance"
                : room.status === "booked" || activeBooking
                    ? "booked"
                    : "available"

            return {
                ...room,
                effectiveStatus,
                activeBooking: activeBooking ? {
                    checkIn: activeBooking.checkIn,
                    checkOut: activeBooking.checkOut,
                    paymentMethod: activeBooking.paymentMethod
                } : null
            }
        })

        res.status(200).json({
            message: "data fetch successfully",
            data: roomsWithEffectiveStatus
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internel server error",
            error: error.message
        })
    }
}



const update_room = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, room_no, capacity, status, existingImages } = req.body;

        // Upload any new files to Cloudinary
        let newImageUrls = [];
        if (req.files && req.files.length > 0) {
            newImageUrls = await uploadImagesToCloudinary(req.files);
        }

        // Merge existing images the client wants to keep + new uploads
        const kept = existingImages
            ? (Array.isArray(existingImages) ? existingImages : [existingImages])
            : [];
        const finalImages = [...kept, ...newImageUrls];

        const updateData = { title, price, description, room_no, capacity, images: finalImages }
        if (status) {
            updateData.status = status
        }

        const updatedRoom = await roomModel.findByIdAndUpdate(
            id,
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedRoom) {
            return res
                .status(404)
                .json({ message: "Room not found" });
        }

        res.json({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const delete_room = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await roomModel.findById(id);

        if (!room) {
            return res
                .status(404)
                .json({ message: "Room not found" });
        }

        await roomModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Room deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const update_room_status = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, bookingMode } = req.body;

        if (!["available", "booked", "maintenance"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid room status"
            });
        }

        const update = {
            status,
            bookingMode: status === "booked" ? (bookingMode || "offline") : null,
        };

        if (status === "available") {
            update.currentBookingId = null;
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            await Booking.updateMany(
                {
                    roomId: id,
                    status: "confirmed",
                    checkOut: { $gte: today }
                },
                { status: "cancelled" }
            )
        }

        const room = await roomModel.findByIdAndUpdate(id, update, {
            returnDocument: "after",
            runValidators: true
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.json({
            success: true,
            message: "Room status updated",
            room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { create_room, get_room, update_room, delete_room, update_room_status }
