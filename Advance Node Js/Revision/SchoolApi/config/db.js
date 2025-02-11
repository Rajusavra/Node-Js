const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            `${process.env.DB_URL}`
        );
        console.log('Connected To MOngoDB');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = connectDB;