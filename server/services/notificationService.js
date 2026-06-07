const nodemailer = require('nodemailer')

const buildBookingMessage = (bookingData, roomData) => `
Hello ${bookingData.guestName},

Your stay at Luxury Hotel has been confirmed! We are excited to welcome you.

Reservation Details:
-----------------------------------
Room: ${roomData.title} (Room No: ${roomData.room_no || 'TBD'})
Check-In: ${new Date(bookingData.checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Check-Out: ${new Date(bookingData.checkOut).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Stay Duration: ${Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))} Night(s)
Guests: ${bookingData.guests}
Total Amount Paid: ₹${bookingData.totalPrice || roomData.price}
Payment ID: ${bookingData.paymentDetails?.paymentId || 'N/A'}
-----------------------------------

Location: 123 Resort Lane, Paradise City
Check-in Time: after 3:00 PM
Check-out Time: before 11:00 AM

If you have any questions, feel free to reply to this email or call us at +91 9111111111.

Best regards,
The Luxury Hotel Team
`.trim()

const sendEmail = async (bookingData, roomData, message) => {
    if (!process.env.EMAIL || !process.env.APP_PASSWORD) {
        console.log("[EMAIL SERVICE] SMTP env not configured. Skipping email.");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">LUXURY HOTEL</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6; color: #333;">
                <h2 style="color: #1a1a1a;">Booking Confirmed!</h2>
                <p>Dear ${bookingData.guestName},</p>
                <p>Thank you for choosing Luxury Hotel. Your reservation is successfully confirmed.</p>
                
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 5px 0;"><strong>Room:</strong></td><td>${roomData.title}</td></tr>
                        <tr><td style="padding: 5px 0;"><strong>Room No:</strong></td><td>${roomData.room_no || 'TBD'}</td></tr>
                        <tr><td style="padding: 5px 0;"><strong>Check-In:</strong></td><td>${new Date(bookingData.checkIn).toLocaleDateString()}</td></tr>
                        <tr><td style="padding: 5px 0;"><strong>Check-Out:</strong></td><td>${new Date(bookingData.checkOut).toLocaleDateString()}</td></tr>
                        <tr><td style="padding: 5px 0;"><strong>Amount:</strong></td><td>₹${bookingData.totalPrice || roomData.price}</td></tr>
                    </table>
                </div>
                
                <p>We look forward to hosting you soon!</p>
            </div>
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                &copy; ${new Date().getFullYear()} Luxury Hotel. All rights reserved.
            </div>
        </div>
    `;

    await transporter.sendMail({
        from: `"Luxury Hotel" <${process.env.EMAIL}>`,
        to: bookingData.guestEmail,
        subject: `Booking Confirmed: ${roomData.title}`,
        text: message,
        html: htmlContent,
    });
}

const sendSms = async (bookingData, roomData) => {
    // Sanitize phone number (remove any non-digit characters)
    const phoneNumber = String(bookingData.guestPhone).replace(/\D/g, '');
    
    // Fast2SMS expects 10 digits for Indian numbers, or full number for international
    // If it starts with 91 and has 12 digits, we might want to trim the 91 if using 'q' route
    const targetNumber = phoneNumber.length > 10 && phoneNumber.startsWith('91') ? phoneNumber.slice(2) : phoneNumber;

    const smsText = `LuxuryHotel: Booking Confirmed! Room: ${roomData.title}. Check-in: ${new Date(bookingData.checkIn).toLocaleDateString()}. See you soon!`;

    if (!process.env.FAST2SMS_API_KEY) {
        console.log("[SMS SERVICE] FAST2SMS_API_KEY not configured. Skipping SMS.");
        return;
    }

    try {
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                authorization: process.env.FAST2SMS_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                route: "q",
                message: smsText,
                language: "english",
                flash: 0,
                numbers: targetNumber,
            }),
        });
        const result = await response.json();
        if (!result.return) {
            console.error("[SMS SERVICE] Fast2SMS Error:", result.message);
        }
    } catch (error) {
        console.error("[SMS SERVICE] Error sending SMS:", error.message);
    }
}

const sendBookingConfirmation = async (bookingData, roomData) => {
    const message = buildBookingMessage(bookingData, roomData)

    // Using Promise.allSettled to ensure that one failure doesn't block the other
    const results = await Promise.allSettled([
        sendEmail(bookingData, roomData, message),
        sendSms(bookingData, roomData),
    ])

    results.forEach((res, index) => {
        if (res.status === 'rejected') {
            console.error(`Notification ${index === 0 ? 'Email' : 'SMS'} failed:`, res.reason);
        }
    });
}

const sendContactQuery = async ({ name, email, subject, message }) => {
    if (!process.env.EMAIL || !process.env.APP_PASSWORD) {
        console.log("[CONTACT SERVICE] SMTP env not configured. Skipping email.");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f4f4f4; padding: 20px; border-bottom: 1px solid #ddd;">
                <h2 style="margin: 0; color: #333;">New Contact Inquiry</h2>
            </div>
            <div style="padding: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email/Phone:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: #fafafa; padding: 15px; border-left: 4px solid #333; font-style: italic;">
                    ${message}
                </div>
            </div>
            <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                Received via Luxury Hotel Contact Form
            </div>
        </div>
    `;

    await transporter.sendMail({
        from: `"Luxury Hotel Website" <${process.env.EMAIL}>`,
        to: process.env.EMAIL, // Send to admin
        replyTo: email,
        subject: `[CONTACT] ${subject}`,
        html: htmlContent,
    });
}

module.exports = {
    sendBookingConfirmation,
    sendContactQuery
};
