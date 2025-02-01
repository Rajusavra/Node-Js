// models/teacherModel.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    fees: {
        type: Number,
        required: true
    },
    ratings: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
        },
    ],
});

module.exports = mongoose.model('Teacher', teacherSchema);