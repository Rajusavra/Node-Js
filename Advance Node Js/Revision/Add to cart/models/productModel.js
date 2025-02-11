const mongoose = require('mongoose');

const productSchrema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
});

const Product = mongoose.model('Product',productSchrema);

module.exports = Product;