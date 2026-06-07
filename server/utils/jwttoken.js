const jwt = require('jsonwebtoken')

const temp_token = (res) => {
    return jwt.sign(
        {
            id: res._id
        },
        process.env.TEMP_TOKEN || process.env.TEPM_TOKEN,
        { expiresIn: "5m" }
    )
}




const access_token = (res) => {
    return jwt.sign(
        {
            id: res._id,
            email: res.email
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "15m"
        }
    )
}


const refresh_token = (res) => {
    return jwt.sign(
        {
            id: res._id
        },
        process.env.REFRESH_TOKEN || process.env.REEFRESH_TOKEN,
        {
            expiresIn: "7d"
        }
    )
}


module.exports = { access_token, refresh_token, temp_token }
