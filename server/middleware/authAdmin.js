const jwt = require('jsonwebtoken')
const adminSchema = require('../models/adminModel')

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access token missing' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        const admin = await adminSchema.findById(decoded.id).select('-password -otp')

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found' })
        }

        req.admin = admin
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired access token' })
    }
}

module.exports = authAdmin
