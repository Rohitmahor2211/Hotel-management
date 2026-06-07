const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        trim: true
    },
    otpExpiry: {
        type: Date
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)