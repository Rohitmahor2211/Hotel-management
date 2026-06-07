const cloudinary = require('../config/cloudinary.config')
const fs = require('fs')


const uploadImagesToCloudinary = async (files) => {
    try {
        const imgUrls = []

        const uploadPromises = files.map(async (file) => {

            const result = await cloudinary.uploader.upload(
                file.path,
                {
                    folder: "Hotel-management",
                }
            );

            // delete local file
            fs.unlinkSync(file.path);

            return result.secure_url;
        });

        // PARALLEL UPLOAD
        const imageUrls = await Promise.all(uploadPromises);

        return imageUrls;

    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = uploadImagesToCloudinary;