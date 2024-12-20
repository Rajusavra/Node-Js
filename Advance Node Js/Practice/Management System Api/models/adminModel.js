
const mongoose=require('mongoose');

const adminSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true
    },
    createdDate:{
        type:String,
        require:true
    },
    updatedDate:{
        type:String,
        require:true
    },
});
const admin = mongoose.model('admin',adminSchema);
module.exports = admin;