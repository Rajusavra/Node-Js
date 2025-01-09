const mongoose = require('mongoose');

const userSchrema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    con_password:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('User',userSchrema);

module.exports = User;