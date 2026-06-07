const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
        },

        images: {
            type: [String], // multiple image URLs
            default: [],
        },
        room_no: {
            type: String,
            trim: true,
            required: true
        },
        capacity: {
            type: Number,
            default: 2,
        },

        status: {
            type: String,
            enum: ["available", "booked", "maintenance"],
            default: "available",
        },
        bookingMode: {
            type: String,
            enum: ["online", "offline", null],
            default: null,
        },
        currentBookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
