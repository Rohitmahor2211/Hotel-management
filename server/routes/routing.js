const router = require('express').Router()
const { verifyOtp, adminLogin, admin_register, refreshToken, adminLogout, otpSession, adminProfile } = require('../controllers/admin')
const { create_room, get_room, update_room, delete_room, update_room_status } = require('../controllers/room')
const { create_payment_order, create_booking, create_offline_booking, check_availability, check_multiple_availability, get_bookings, get_dashboard_stats } = require('../controllers/booking')
const { contact_admin } = require('../controllers/contact')
const upload = require('../middleware/upload')
const authAdmin = require('../middleware/authAdmin')


router.post('/adminsignup', admin_register)
router.post('/adminlogin', adminLogin)
router.post('/verify-otp', verifyOtp)
router.post('/refresh-token', refreshToken)
router.post('/adminlogout', adminLogout)
router.get('/otp-session', otpSession)
router.get('/admin/me', authAdmin, adminProfile)


router.post('/createrooms', authAdmin, upload.array("images", 10), create_room)
router.get('/getrooms', get_room)
router.patch('/updateroom/:id', authAdmin, upload.array("images", 10), update_room)
router.delete('/deleteroom/:id', authAdmin, delete_room)
router.patch('/admin/rooms/:id/status', authAdmin, update_room_status)
router.post('/admin/offline-booking', authAdmin, create_offline_booking)
router.post('/create-payment-order', create_payment_order)
router.post('/bookroom', create_booking)
router.post('/check-availability', check_availability)
router.post('/available-rooms', check_multiple_availability)
router.get('/getbookings', authAdmin, get_bookings)
router.get('/dashboard-stats', authAdmin, get_dashboard_stats)
router.post('/api/contact', contact_admin)


module.exports = router;
