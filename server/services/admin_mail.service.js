const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
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


