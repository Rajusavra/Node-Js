const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    fees: { type: Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    ratings: [{
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
        rating: { type: Number, min: 1, max: 5 }
    }]
});

module.exports = mongoose.model('Student', studentSchema);