const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
const os = require('os')

// Force Nodemailer to use IPv4 only by filtering out IPv6 from network interfaces
const originalInterfaces = os.networkInterfaces;
os.networkInterfaces = function() {
    const interfaces = originalInterfaces();
    const filtered = {};
    for (const key in interfaces) {
        if (interfaces[key]) {
            filtered[key] = interfaces[key].filter(iface => iface.family !== 'IPv6' && iface.family !== 6);
        }
    }
    return filtered;
};

// Switch to Port 587 / secure: false if Port 465 is blocked on your network
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,         // Port 587 is standard SMTP submission with STARTTLS
    secure: false,     // false for port 587 (STARTTLS), true for port 465 (SSL/TLS)
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    logger: true,
    debug: true,
});


transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("SMTP Ready");
    }
});


const sendMail = async (admin, otp) => {
    const templatePath = path.join(__dirname, "../views/otp-template.ejs");
    const html = await ejs.renderFile(templatePath, { otp: otp });
    try {
        console.log("Before sendMail");

        const result = await transporter.sendMail({
            from: process.env.EMAIL,
            to: admin.email,
            subject: "OTP Verification",
            html,
        });

        console.log("Mail sent:", result.response);
        return result;

    } catch (err) {
        console.error("SENDMAIL ERROR:", err);
        throw err;
    }
};


module.exports = sendMail;


