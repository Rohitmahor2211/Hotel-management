const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
const { Resend } = require('resend')


const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (admin, otp) => {
    const templatePath = path.join(__dirname, "../views/otp-template.ejs");
    const html = await ejs.renderFile(templatePath, { otp: otp });
    try {
        console.log("Before sendMail");

        const result = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: admin.email,
            subject: "OTP Verification",
            html: html,
        });

        console.log("Mail sent:", result.response);

    } catch (err) {
        console.error("SENDMAIL ERROR:", err);
        throw err;
    }
};


module.exports = sendMail;


