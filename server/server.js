require('dotenv').config()
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const app = express()

const port = process.env.PORT
const db_connection = require('./config/mongo.db')
const router = require("./routes/routing")
const Razorpay = require('razorpay')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())


const allowedOrigins = [
    "http://localhost:5173",
    process.env.PRODUCTION_FRONTEND_URL,
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Postman ya same-origin requests
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use('/', router);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`[SERVER ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

db_connection()
app.listen(port, () => {
    console.log("server is running on PORT", port);
})




