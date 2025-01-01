const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
const product = mongoose.model('product', productSchema);
module.exports = product;