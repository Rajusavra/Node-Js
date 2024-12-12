const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exsubcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exsubcategory'
    },
    product: {
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
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'deactive'
    }
})
const product = mongoose.model('product', productSchema);
module.exports = product;