const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueName + path.extname(file.originalname))
    }
})


const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ]

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type"), false)
    }
}


const upload = multer({
    storage, fileFilter, limits: {
        files: 10,
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = upload;