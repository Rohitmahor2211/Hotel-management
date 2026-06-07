const crypto = require('crypto')

let Razorpay = null

try {
    Razorpay = require('razorpay')
} catch (error) {
    Razorpay = null
}

const hasRazorpayConfig = () => Boolean(
    Razorpay &&
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET
)
console.log(hasRazorpayConfig())
const createPaymentOrder = async ({ amount, receipt }) => {
    const sanitizedAmount = String(amount || 0).replace(/[^0-9.]/g, '')
    const amountInPaise = Math.round(Number(sanitizedAmount) * 100)
    try {

        if (hasRazorpayConfig()) {
            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            })

            const order = await razorpay.orders.create({
                amount: amountInPaise,
                currency: 'INR',
                receipt,
            })
            console.log("ORDER CREATED:", order);
            return {
                gateway: 'razorpay',
                keyId: process.env.RAZORPAY_KEY_ID,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
            }
        }

        return {
            gateway: 'mock',
            keyId: null,
            orderId: `MOCK_ORDER_${Date.now()}`,
            amount: amountInPaise,
            currency: 'INR',
        }
    } catch (error) {
        console.log("RAZORPAY ERROR:", err);
    }
}

const verifyPayment = ({ orderId, paymentId, signature }) => {
    if (!orderId || !paymentId) {
        return false
    }

    // Only allow mock orders in non-production environments
    if (orderId.startsWith('MOCK_ORDER_')) {
        return process.env.NODE_ENV !== 'production'
    }

    if (!process.env.RAZORPAY_KEY_SECRET || !signature) {
        return false
    }

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex')

    return expectedSignature === signature
}

module.exports = {
    createPaymentOrder,
    verifyPayment,
}
