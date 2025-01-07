const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    ratings: [{
        teacher: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Teacher' 
        },
        rating: { 
            type: Number, 
            required: true, 
            min: 1, 
            max: 5 
        }
    }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;