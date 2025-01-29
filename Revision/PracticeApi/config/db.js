const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            `${process.env.DB_URL}`
        );
        console.log('Connected to MongoDB');
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

module.exports = connectDB