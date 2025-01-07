const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student'
    }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;