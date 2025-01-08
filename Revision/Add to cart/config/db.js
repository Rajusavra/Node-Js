const mongoose = require('mongoose');

const db = async () => {
    try {
        const connect = await mongoose.connect(
            `mongodb+srv://savraraju:It4chi@cluster0.lxd5n.mongodb.net/Revision`
        );
        console.log('Connected to MongoDB');
        
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = db;