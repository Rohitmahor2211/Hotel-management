const mongoose = require('mongoose')

const db_connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database connects ...!")
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db_connection;