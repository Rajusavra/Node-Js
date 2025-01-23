const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    },
    image: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true
    },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Register' }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    }
})

const create = mongoose.model('Create', registerSchema);
module.exports = create;