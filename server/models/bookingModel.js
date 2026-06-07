const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        guestName: {
            type: String,
            required: true,
        },
        guestEmail: {
            type: String,
            required: true,
        },
        guestPhone: {
            type: String,
            required: true,
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "confirmed",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["online", "offline", "mock"],
            default: "online",
        },
        paymentDetails: {
            orderId: {
                type: String,
                default: null,
            },
            paymentId: {
                type: String,
                default: null,
            },
            signature: {
                type: String,
                default: null,
            },
            paymentTime: {
                type: Date,
                default: null,
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
