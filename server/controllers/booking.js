const Booking = require('../models/bookingModel');
const Room = require('../models/roomsModel');
const notificationService = require('../services/notificationService');
const paymentService = require('../services/payment.service');

const hasDateCollision = async (roomId, checkIn, checkOut) => {
    return Booking.findOne({
        roomId,
        status: "confirmed",
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) }
    });
};

const create_payment_order = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        if (room.status === "maintenance" || (room.status === "booked" && room.bookingMode === "offline" && !room.currentBookingId)) {
            return res.status(409).json({ success: false, message: "Room is not available." });
        }

        const existingBooking = await hasDateCollision(roomId, checkIn, checkOut);
        if (existingBooking) {
            return res.status(409).json({ success: false, message: "Room is already booked for these dates." });
        }

        const order = await paymentService.createPaymentOrder({
            amount: room.price,
            receipt: `room_${room._id}_${Date.now()}`.slice(0, 40)
        });

        res.status(200).json({
            success: true,
            order,
            room: {
                title: room.title,
                price: room.price,
            }
        });
    } catch (error) {
        console.log("PAYMENT ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Unable to create payment order.",
            error_message: error.message
        });
    }
};

const create_booking = async (req, res) => {
    try {
        const {
            roomId,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            payment
        } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        if (room.status === "maintenance" || (room.status === "booked" && room.bookingMode === "offline" && !room.currentBookingId)) {
            return res.status(409).json({ success: false, message: "Room is not available." });
        }

        const existingBooking = await hasDateCollision(roomId, checkIn, checkOut);
        if (existingBooking) {
            return res.status(409).json({ success: false, message: "Room is already booked for these dates." });
        }

        const paymentVerified = paymentService.verifyPayment({
            orderId: payment?.orderId,
            paymentId: payment?.paymentId,
            signature: payment?.signature,
        });

        if (!paymentVerified) {
            return res.status(402).json({
                success: false,
                message: "Payment verification failed."
            });
        }

        const sanitizedTotalPrice = Number(String(totalPrice || room.price).replace(/[^0-9.]/g, ''));
        const sanitizedGuests = Number(guests) || 1;

        const booking = await Booking.create({
            roomId,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guests: sanitizedGuests,
            totalPrice: sanitizedTotalPrice,
            status: "confirmed",
            paymentStatus: "paid",
            paymentMethod: payment?.gateway === "mock" ? "mock" : "online",
            paymentDetails: {
                orderId: payment?.orderId,
                paymentId: payment?.paymentId,
                signature: payment?.signature,
                paymentTime: new Date()
            }
        });

        try {
            await notificationService.sendBookingConfirmation(booking, room);
        } catch (notificationError) {
            console.error("Notification Error:", notificationError.message);
        }

        res.status(201).json({
            success: true,
            message: "Room booked successfully! Confirmation email and SMS have been sent.",
            booking
        });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error_message: error.message
        });
    }
};

const create_offline_booking = async (req, res) => {
    try {
        const { roomId, guestName, guestEmail, guestPhone, checkIn, checkOut, guests, totalPrice } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found." });
        }

        if (room.status !== "available") {
            return res.status(409).json({ success: false, message: "Room is not available." });
        }

        const booking = await Booking.create({
            roomId,
            guestName: guestName || "Offline Guest",
            guestEmail: guestEmail || "offline@hotel.local",
            guestPhone: guestPhone || "N/A",
            checkIn: checkIn || new Date(),
            checkOut: checkOut || new Date(Date.now() + 24 * 60 * 60 * 1000),
            guests: guests || 1,
            totalPrice: totalPrice || room.price,
            status: "confirmed",
            paymentStatus: "paid",
            paymentMethod: "offline",
            paymentDetails: {
                paymentId: `OFFLINE_${Date.now()}`,
                paymentTime: new Date()
            }
        });

        await Room.findByIdAndUpdate(roomId, {
            status: "booked",
            bookingMode: "offline",
            currentBookingId: booking._id
        });

        res.status(201).json({
            success: true,
            message: "Offline booking created successfully.",
            booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error_message: error.message
        });
    }
};

const check_availability = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.body;
        if (!roomId || !checkIn || !checkOut) {
            return res.status(400).json({ message: "roomId, checkIn, and checkOut are required." });
        }

        const room = await Room.findById(roomId);
        if (!room || room.status === "maintenance" || (room.status === "booked" && room.bookingMode === "offline" && !room.currentBookingId)) {
            return res.json({ success: true, isAvailable: false });
        }

        const existingBooking = await hasDateCollision(roomId, checkIn, checkOut);

        res.json({ success: true, isAvailable: !existingBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const check_multiple_availability = async (req, res) => {
    try {
        const { checkIn, checkOut } = req.body;
        if (!checkIn || !checkOut) {
            return res.status(400).json({ message: "checkIn and checkOut are required." });
        }

        const overlappingBookings = await Booking.find({
            status: "confirmed",
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) }
        }).select('roomId');

        const bookedRoomIds = overlappingBookings.map(b => b.roomId);
        const availableRooms = await Room.find({
            _id: { $nin: bookedRoomIds },
            $or: [
                { status: "available" },
                { status: "booked", bookingMode: "online" }
            ]
        });

        res.json({ success: true, data: availableRooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const get_bookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('roomId').sort({ createdAt: -1 });
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const get_dashboard_stats = async (req, res) => {
    try {
        const totalRooms = await Room.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const activeOrUpcomingBookings = await Booking.find({
            status: "confirmed",
            checkOut: { $gte: today }
        }).select('roomId checkIn checkOut paymentMethod');

        const bookedRoomIds = new Set(activeOrUpcomingBookings.map((booking) => booking.roomId.toString()));
        const availableRooms = await Room.countDocuments({
            status: { $ne: "maintenance" },
            _id: { $nin: [...bookedRoomIds] }
        });

        const bookings = await Booking.find();
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

        const recentBookings = await Booking.find()
            .populate('roomId', 'title room_no')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentActivity = recentBookings.map(b => ({
            id: b._id,
            room_no: b.roomId?.room_no,
            guestName: b.guestName,
            roomName: b.roomId?.title || 'a room',
            time: b.createdAt
        }));

        const rooms = await Room.find()
            .select('room_no title price status bookingMode currentBookingId')
            .sort({ room_no: 1 })
            .lean();

        const bookingByRoomId = activeOrUpcomingBookings.reduce((acc, booking) => {
            const roomId = booking.roomId.toString();
            if (!acc[roomId]) acc[roomId] = booking;
            return acc;
        }, {});

        const roomsStatus = rooms.map((room) => {
            const activeBooking = bookingByRoomId[room._id.toString()];
            const effectiveStatus = room.status === "maintenance"
                ? "maintenance"
                : room.status === "booked" || activeBooking
                    ? "booked"
                    : "available";

            return {
                ...room,
                effectiveStatus,
                activeBooking: activeBooking ? {
                    checkIn: activeBooking.checkIn,
                    checkOut: activeBooking.checkOut,
                    paymentMethod: activeBooking.paymentMethod
                } : null
            };
        });

        res.json({
            success: true,
            data: {
                totalRooms,
                totalBookings,
                totalRevenue,
                availableRooms,
                recentActivity,
                roomsStatus
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    create_payment_order,
    create_booking,
    create_offline_booking,
    check_availability,
    check_multiple_availability,
    get_bookings,
    get_dashboard_stats
};
