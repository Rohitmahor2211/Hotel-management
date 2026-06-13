// const express = require('express')
const adminSchema = require('../models/adminModel')
const bcrypt = require('bcrypt')
const { access_token, refresh_token, temp_token } = require('../utils/jwttoken')
const sendMail = require('../services/admin_mail.service')
const otp = require('../utils/otp')
const jwt = require("jsonwebtoken")



const admin_register = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(409).json({
            message: "Email Not found..!"
        })
    }

    if (!password) {
        return res.status(409).json({
            message: "Password not Found"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const response = await adminSchema.create({ email, password: hashedPassword })

        res.status(200).json({
            message: "Admin created"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}


const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {

        if (!email) {
            return res.status(409).json({
                message: "Email Not found..!"
            })
        }

        if (!password) {
            return res.status(409).json({
                message: "Password not Found"
            })
        }

        const admin = await adminSchema.findOne({ email })

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }


        const isPasswordMatch = await bcrypt.compare(password, admin.password)

        if (!isPasswordMatch) {
            return res.status(404).json({
                message: "Password not matched..!"
            })
        }
        console.log("password matched..!")

        const generatedOtp = otp()
        console.log("otp generated..!")

        admin.otp = generatedOtp
        admin.otpExpiry = Date.now() + 5 * 60 * 1000
        await admin.save()
        console.log("otp saved successfully..!")
        await sendMail(admin, generatedOtp)
        console.log("otp sent successfully..!")


        const tempToken = temp_token(admin)

        const isProduction = process.env.NODE_ENV === "production";
        res.cookie(
            "tempToken", tempToken,
            {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 5 * 60 * 1000
            }
        )


        res.status(200).json({
            messahe: "Otp send successfully..!"
        })
    } catch (error) {
        console.log("error caught in admin login..!")
        console.log(error.message)
        res.status(500).json({
            message: "Internel server error",
            error: error.message,
        })
    }
}



const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    try {

        const tempToken = req.cookies.tempToken
        if (!tempToken) {
            return res.status(409).json({
                message: "Token Missing"
            })
        }

        const decodedToken = jwt.verify(tempToken, process.env.TEMP_TOKEN || process.env.TEPM_TOKEN)
        const id = decodedToken.id

        if (!decodedToken) {
            return res.status(409).json({
                message: "Invalid token"
            })
        }


        const admin = await adminSchema.findById(id)



        if (admin.otp != otp) {
            return res.status(404).json({
                message: "Invalid Otp"
            })
        }

        if (admin.otpExpiry < Date.now()) {
            return res.status(404).json({
                message: "Otp time expire"
            })
        }

        admin.otp = null
        admin.otpExpiry = null
        await admin.save()


        const accessToken = access_token(admin)
        const refreshToken = refresh_token(admin)


        const isProduction = process.env.NODE_ENV === "production";
        res.cookie(
            "refreshtoken", refreshToken,
            {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )

        res.clearCookie("tempToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(200).json({
            message: "Login Successfull",
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: "Internel server error",
            error: error.message
        })
    }

}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshtoken

        if (!token) {
            return res.status(401).json({ message: "Refresh token missing" })
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN || process.env.REEFRESH_TOKEN)
        const admin = await adminSchema.findById(decodedToken.id)

        if (!admin) {
            return res.status(401).json({ message: "Admin not found" })
        }

        const accessToken = access_token(admin)

        res.status(200).json({
            message: "Access token refreshed",
            accessToken
        })
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired refresh token"
        })
    }
}

const adminLogout = async (req, res) => {
    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({
        message: "Logged out successfully"
    })
}

const otpSession = async (req, res) => {
    try {
        const tempToken = req.cookies.tempToken

        if (!tempToken) {
            return res.status(401).json({ message: "OTP session missing" })
        }

        const decodedToken = jwt.verify(tempToken, process.env.TEMP_TOKEN || process.env.TEPM_TOKEN)
        const admin = await adminSchema.findById(decodedToken.id)

        if (!admin || !admin.otp || admin.otpExpiry < Date.now()) {
            return res.status(401).json({ message: "OTP session expired" })
        }

        res.status(200).json({
            success: true,
            message: "OTP session active"
        })
    } catch (error) {
        res.status(401).json({
            message: "Invalid OTP session"
        })
    }
}

const adminProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        admin: req.admin
    })
}

module.exports = { verifyOtp, adminLogin, admin_register, refreshToken, adminLogout, otpSession, adminProfile }
