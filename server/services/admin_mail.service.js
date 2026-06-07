const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});





const sendMail = async (admin, otp) => {
    // console.log(admin)

    const templatePath = path.join(
        __dirname,
        "../views/otp-template.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
        otp: otp
    });
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: admin.email,
        subject: "OTP Verification",
        html
    });
}


module.exports = sendMail;


