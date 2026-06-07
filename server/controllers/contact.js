const notificationService = require('../services/notificationService');

const contact_admin = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Send email to admin
        await notificationService.sendContactQuery({ name, email, subject, message });

        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully. We will get back to you soon!"
        });
    } catch (error) {
        console.error("Contact Controller Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message.",
            error_message: error.message
        });
    }
};

module.exports = { contact_admin };
