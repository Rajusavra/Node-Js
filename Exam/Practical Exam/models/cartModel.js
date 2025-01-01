const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qt: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
const cart = mongoose.model('cart', cartSchema);
module.exports = cart;